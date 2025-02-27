import { FC } from "react";
import "./Header.scss";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import background from "../../assets/images/background.jpg";
import { useAuth } from "../../Context/AuthContext/authUtils";
import { useTheme } from "../../Context/ThemeContext/ThemeUtils";
import { Button } from "@mui/material";
import OutIcon from "../../assets/icons/Icon.svg?react";
import "@theme-toggles/react/css/Classic.css";
import { Classic } from "@theme-toggles/react";

interface HeaderProps {
  name?: string;
}

export const Header: FC<HeaderProps> = () => {
  const { logout } = useAuth();
  // const navigate = useNavigate();
  const { isDarkTheme, toggleTheme } = useTheme();
  const user = "Лаптев Никита Васильевич";
  const menuUser = `${isDarkTheme ? "Светлая тема" : "Тёмная тема"}`;
  const getInitials = () => {
    const fio = user.split(" ");
    return fio[0][0] + fio[1][0];
  };
  const userFILogo = getInitials();

  const logoutHandler = () => {
    logout();
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar alt="Remy Sharp" src={background} />{" "}
                <span className="initials">{userFILogo}</span>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={menuUser} onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }} onClick={toggleTheme}>
                  {menuUser}
                </Typography>
              </MenuItem>
            </Menu>

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
