import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUserName } from '../../UserNameContext';
import axios from 'axios';

const defaultTheme = createTheme();

export default function SignIn({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setUserName } = useUserName();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userName = data.get('userName');
    const password = data.get('password');

    try {
      const response = await axios.post('http://localhost:8000/api/user', {
        userName,
        password
      });

      const isLoggedIn = response.data !== 0;

      if (isLoggedIn) {
        setIsLoggedIn(true);
        setUserName(userName);
        localStorage.setItem('isLoggedIn', userName.toString());
        navigate('/');
      } else {
        setError('Incorrect userName or password');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="minH">
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (
            <Typography component="p" variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="userName"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}
