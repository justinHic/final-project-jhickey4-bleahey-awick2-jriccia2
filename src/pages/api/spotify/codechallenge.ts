//TODO: think this goes in the backend or actual app implementation
//const digest = await window.crypto.subtle.digest("SHA-256", data);

function arrayFromBuffer(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer));
}

export async function generateCodeChallenge(codeVerifier: string) {
  function base64encode(string: ArrayBuffer) {
    return btoa(String.fromCharCode.apply(null, arrayFromBuffer(string)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}
