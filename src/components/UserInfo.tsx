import { SpotifyProfile } from "../types/SpotifyProfile";

interface UserInfoProps {
  profile: SpotifyProfile;
}

export default function UserInfo(props: UserInfoProps) {
  return (
    <p className="user-info">
      {props.profile.username === ""
        ? "Logged in"
        : "Logged in as " + props.profile.username}
    </p>
  );
}
