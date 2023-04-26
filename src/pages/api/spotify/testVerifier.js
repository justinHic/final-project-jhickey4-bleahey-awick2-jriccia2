function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(codeVerifier)
  );

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function generateUrlWithSearchParams(url, params) {
  const urlObject = new URL(url);
  urlObject.search = new URLSearchParams(params).toString();

  return urlObject.toString();
}

export function redirectToVerification() {
  const codeVerifier = generateRandomString(64);

  generateCodeChallenge(codeVerifier).then((code_challenge) => {
    window.localStorage.setItem("code_verifier", codeVerifier);

    // Redirect to example:
    // GET https://accounts.spotify.com/authorize?response_type=code&client_id=77e602fc63fa4b96acff255ed33428d3&redirect_uri=http%3A%2F%2Flocalhost&scope=user-follow-modify&state=e21392da45dbf4&code_challenge=KADwyz1X~HIdcAG20lnXitK6k51xBP4pEMEZHmCneHD1JhrcHjE1P3yU_NjhBz4TdhV6acGo16PCd10xLwMJJ4uCutQZHw&code_challenge_method=S256

    window.location = generateUrlWithSearchParams(
      "https://accounts.spotify.com/authorize",
      {
        response_type: "code",
        client_id,
        scope: "user-read-private user-read-email",
        code_challenge_method: "S256",
        code_challenge,
        redirect_uri,
      }
    );

    // If the user accepts spotify will come back to your application with the code in the response query string
    // Example: http://127.0.0.1:8080/?code=NApCCg..BkWtQ&state=profile%2Factivity
  });
}

function exchangeToken(code) {
  const code_verifier = localStorage.getItem("code_verifier");

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams({
      client_id,
      grant_type: "authorization_code",
      code,
      redirect_uri,
      code_verifier,
    }),
  })
    .then(addThrowErrorToFetch)
    .then((data) => {
      processTokenResponse(data);

      // clear search query params in the url
      window.history.replaceState({}, document.title, "/");
    })
    .catch(handleError);
}

function refreshToken() {
  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams({
      client_id,
      grant_type: "refresh_token",
      refresh_token,
    }),
  })
    .then(addThrowErrorToFetch)
    .then(processTokenResponse)
    .catch(handleError);
}

function handleError(error) {
  console.error(error);
  mainPlaceholder.innerHTML = errorTemplate({
    status: error.response.status,
    message: error.error.error_description,
  });
}

async function addThrowErrorToFetch(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw { response, error: await response.json() };
  }
}

function logout() {
  localStorage.clear();
  window.location.reload();
}

function processTokenResponse(data) {
  console.log(data);

  access_token = data.access_token;
  refresh_token = data.refresh_token;

  const t = new Date();
  expires_at = t.setSeconds(t.getSeconds() + data.expires_in);

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("expires_at", expires_at);

  oauthPlaceholder.innerHTML = oAuthTemplate({
    access_token,
    refresh_token,
    expires_at,
  });

  // load data of logged in user
  getUserData();
}

function getUserData() {
  fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw await response.json();
      }
    })
    .then((data) => {
      console.log(data);
      document.getElementById("login").style.display = "none";
      document.getElementById("loggedin").style.display = "unset";
      mainPlaceholder.innerHTML = userProfileTemplate(data);
    })
    .catch((error) => {
      console.error(error);
      mainPlaceholder.innerHTML = errorTemplate(error.error);
    });
}

const client_id = "94e44d9212c746d0be764f24a8e61079";
//const redirect_uri = "https://localhost:3000/new"; // Your redirect uri
const redirect_uri = "https://www.google.com";

// Restore tokens from localStorage
// let access_token = localStorage.getItem("access_token") || null;
// let refresh_token = localStorage.getItem("refresh_token") || null;
// let expires_at = localStorage.getItem("expires_at") || null;
