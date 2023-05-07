import { NextRouter } from "next/router";

export enum SpotifyButtonAction {
  Login = "Login to Spotify",
  Logout = "Logout of Spotify",
}

interface SpotifyButtonProps {
  action: SpotifyButtonAction;
  router: NextRouter;
}

interface RedirectURL {
  url: string;
}

export default function SpotifyButton(props: SpotifyButtonProps) {
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
    props.router.push("/");
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
  return (
    <button
      className="spotify-button hvr-grow"
      onClick={() => handleClick(props.action)}
    >
      {props.action}
    </button>
  );
}
