import { NextRouter } from "next/router";

/**
 * Represents the action that the SpotifyButton will take when clicked.
 */
export enum SpotifyButtonAction {
  /**
   * Represents the action to login to Spotify.
   */
  Login = "Login to Spotify",

  /**
   * Represents the action to logout of Spotify.
   */
  Logout = "Logout of Spotify",
}

/**
 * The props for the SpotifyButton component.
 * @property {SpotifyButtonAction} action The action that the SpotifyButton will take when clicked.
 * @property {NextRouter} router The router object.
 */
interface SpotifyButtonProps {
  action: SpotifyButtonAction;
  router: NextRouter;
}

/**
 * The interface for the response from the Spotify API.
 * @property {string} url The URL to redirect the user to.
 */
interface RedirectURL {
  url: string;
}

/**
 * A component that allows the user to login to Spotify.
 * @param {SpotifyButtonProps} props The props for the SpotifyButton.
 * @returns {JSX.Element} A SpotifyButton component.
 */
export default function SpotifyButton(props: SpotifyButtonProps): JSX.Element {
  /**
   * Redirects the user to the Spotify login and authorization page.
   * @returns {void}
   */
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

  /**
   * Logs the user out of Spotify.
   * @returns {void}
   */
  function logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    props.router.push("/");
  }

  /**
   * Handles the click event for the SpotifyButton.
   * @param {SpotifyButtonAction} action The action that the SpotifyButton will take when clicked.
   */
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
