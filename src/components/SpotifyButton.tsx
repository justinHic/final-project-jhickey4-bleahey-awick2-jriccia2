import { useRouter } from "next/router";

export enum SpotifyButtonAction {
  Login = "Login to Spotify",
  Logout = "Logout of Spotify",
}

interface SpotifyButtonProps {
  action: SpotifyButtonAction;
}

interface RedirectURL {
  url: string;
}

const router = useRouter();

function login(): void {
  fetch("/api/spotify/verify")
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((json: RedirectURL) => {
      console.log(json);
      window.location.assign(json.url);
    });
}

function logout() {
  localStorage.clear();
  sessionStorage.clear();
  router.push("/");
}

function handleClick(action: SpotifyButtonAction): void {
  switch (action) {
    case SpotifyButtonAction.Login:
      login();
      break;
    case SpotifyButtonAction.Logout:
      logout();
      break;
  }
}

export default function SpotifyButton(props: SpotifyButtonProps) {
  return (
    <button
      className="spotify-button"
      onClick={() => handleClick(props.action)}
    >
      {props.action}
    </button>
  );
}
