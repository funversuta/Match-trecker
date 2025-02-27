import { FC, useState } from 'react'
import { useNavigate } from 'react-router';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useAuth } from '../../Context/AuthContext/authUtils';
import Loader from '../../components/Loader/Loader';
import './Login.scss'
import { useTheme } from '../../Context/ThemeContext/ThemeUtils';

interface LoginProps {
  name?:string;
}

export const Login: FC<LoginProps> = () => {
  const navigate = useNavigate();
  const { error, loading, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {isDarkTheme} = useTheme();

  const authorize = async () => {
    const response = await login({ username, password });
    if (response) {
      navigate("/");
    }
  };

    return (
      <div className={`loginPage ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Loader visible={loading} />
      <Box>
        <Stack
          className={"loginPage__form"}
          direction={"column"}
          gap={4}
          padding={4}
          borderRadius={2}
        >
          <TextField
            label="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></TextField>

          <TextField
            label="Пароль"
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>

          {error && (
            <div className="err">Пользователь с такими данными не найден.<br/> Проверьте логин и пароль</div>
          )}

          <Button role="button" variant="contained" disabled={loading} onClick={authorize}>
            Войти
          </Button>
        </Stack>
      </Box>
    </div>
    )
}