import { generateCodeChallenge } from "./codechallenge";
import { generateRandomString } from "./codeverifier";

//think these constants and codeverifier are just needed later on
//this code is probably what we run for the actual endpoint

const clientId = "YOUR_CLIENT_ID";
const redirectUri = "http://localhost:8080";

let codeVerifier = generateRandomString(128);

generateCodeChallenge(codeVerifier).then((codeChallenge) => {
  let state = generateRandomString(16);
  let scope = "user-read-private user-read-email";

  localStorage.setItem("code_verifier", codeVerifier);

  let args = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  //add appropriate react implementation to get this to work
  window.location = "https://accounts.spotify.com/authorize?" + args;
});

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get("code");

//let codeVerifier = localStorage.getItem("code_verifier");

//added to get rid of error
export const d = 1;

let args = new URLSearchParams({
  response_type: "code",
  client_id: clientId,
  scope: scope,
  redirect_uri: redirectUri,
  state: state,
  code_challenge_method: "S256",
  code_challenge: codeChallenge,
});

const response = fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: body,
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    localStorage.setItem("access_token", data.access_token);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
