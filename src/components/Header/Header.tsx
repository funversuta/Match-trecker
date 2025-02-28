import { FC } from "react";
import "./Header.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import background from "../../assets/images/background.jpg";
import { useAuth } from "../../Context/AuthContext/authUtils";
import { useTheme } from "../../Context/ThemeContext/ThemeUtils";
import { Button } from "@mui/material";
import OutIcon from "../../assets/icons/Icon.svg?react";
import "@theme-toggles/react/css/Classic.css";
import { Classic } from "@theme-toggles/react";
import { useNavigate } from "react-router";

interface HeaderProps {
  name?: string;
}

export const Header: FC<HeaderProps> = () => {
  const { logout } = useAuth();
  // const navigate = useNavigate();
  const { isDarkTheme, toggleTheme } = useTheme();
  const user = "Лаптев Никита Васильевич";
  const getInitials = () => {
    const fio = user.split(" ");
    return fio[0][0] + fio[1][0];
  };
  const userFILogo = getInitials();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
  };

  const showProfile = () =>{
    navigate('/');
  }

  return (
    <AppBar
      position="static"
      className={`Header ${isDarkTheme ? "dark-theme" : "light-theme"}`}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 0,
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
           
            <Tooltip title="Open settings">
              <IconButton
                className="userBtn"
                onClick={showProfile}
                sx={{ p: 0 }}
              >
                <Avatar alt="Remy Sharp" src={background} />{" "}
                <span className="initials">{userFILogo}</span>
              </IconButton>
            </Tooltip>



            <div className="Header__User">
              <span>{user}</span>
              <span className="Header__User-description">Доктор</span>
            </div>
            <Classic
              duration={750}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              toggle={toggleTheme}
              toggled={isDarkTheme}
            />
          </Box>
          <Box>
            <Button
              className="logout"
              variant="contained"
              onClick={logoutHandler}
            >
              <OutIcon /> Выйти
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
