const client_id = "d4f1fb65364d48f38e76c1d7c26da3ae";
const redirect_uri = "http://localhost:3000/loggedin"; // Your redirect uri

export default function handler(req, res) {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";

  res.status(200).json({
    url: generateUrlWithSearchParams("https://accounts.spotify.com/authorize", {
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    }),
  });
}

function generateUrlWithSearchParams(url, params) {
  const urlObject = new URL(url);
  urlObject.search = new URLSearchParams(params).toString();
  return urlObject.toString();
}

function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
