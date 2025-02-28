import { FC, } from "react";
import { Header } from "../../components/Header/Header";
import "./Profile.scss";
import { useTheme } from "../../Context/ThemeContext/ThemeUtils";

interface ProfileProps {
  name?: string;
}

export const Profile: FC<ProfileProps> = () => {
  const {isDarkTheme} =useTheme();

  return (
    <div className={`Profile ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Header />
      <div className="content">
        Profile
      </div>
    </div>
  );
};
