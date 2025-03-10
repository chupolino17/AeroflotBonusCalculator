import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setIsLoggedIn, setUser, setIsProfileOpened } from "../slices/authSlice";
import { apiClient } from "../service/config";
import Profile from "./Profile";

const StyledBox = {
  alignSelf: "center",
  width: "100%",
  marginTop: 14,
};

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {

  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
      dispatch(setIsLoggedIn(true));
      dispatch(setUser(user));
    }
  }, []);

  const handleLogout = () => {
    apiClient.post("/user/logout");
    dispatch(setUser({}));
    dispatch(setIsLoggedIn(false));
    localStorage.removeItem("user");
  };
  console.log(isLoggedIn);

  const { isProfileOpened } = useSelector((state) => {
    return state.auth;
  });

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: "calc(var(--template-frame-height, 0px) + 28px)",
        }}
      >
        <Container maxWidth="lg">
          <StyledToolbar variant="dense" disableGutters>
            <Box
              sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
            >
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  onClick={() => navigate("/")}
                >
                  Главная
                </Button>
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  onClick={() => navigate("/top")}
                >
                  Топ-направления
                </Button>
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  onClick={() => navigate("/search")}
                >
                  Поиск
                </Button>
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  onClick={() => dispatch(setIsProfileOpened(true))}
                  style={{ display: !isLoggedIn ? "none" : "block" }}
                >
                  Профиль
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              <Button
                color="primary"
                variant="text"
                size="small"
                onClick={() => navigate("/sign-in")}
                style={{ display: isLoggedIn ? "none" : "block" }}
              >
                Войти
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={() => navigate("/sign-up")}
                style={{ display: isLoggedIn ? "none" : "block" }}
              >
                Регистрация
              </Button>
              <Button
                color="primary"
                variant="text"
                size="small"
                style={{ display: !isLoggedIn ? "none" : "block" }}
                onClick={handleLogout}
              >
                Выйти
              </Button>
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
      <Box sx={StyledBox} />
      <Profile />
    </React.Fragment>
  );
}
