import { useCallback, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as MuiLink } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MuiLink
        target="_blank"
        rel="noreferrer"
        href="https://edenysd.github.io/"
      >
        Edenys Denis
      </MuiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const [errors, setErrors] = useState({});

  // Used custom check in order to keep it simple
  const checkForm = useCallback((newData) => {
    setErrors({
      firstName: !newData.firstName,
      lastName: !newData.lastName,
    });

    return newData.firstName && newData.lastName;
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const objectData = Object.fromEntries(formData.entries());
      userStore.setCurrentUser(objectData);

      if (checkForm(objectData)) navigate("/app");
    },
    [navigate, userStore, checkForm]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={userStore.currentUser.firstName}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={errors.firstName}
                helperText={errors.firstName ? "Required field" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={userStore.currentUser.lastName}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                error={errors.lastName}
                helperText={errors.lastName ? "Required field" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={userStore.currentUser.email}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 2 }} />
    </Container>
  );
}
