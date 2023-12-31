import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserName } from '../../UserNameContext';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const Profile = () => {
  const { userName } = useUserName();
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    CodeForcesNotificationTime: 0,
    CodeChefNotificationTime: 0,
    LeetCodeNotificationTime: 0,
    HackerRankNotificationTime: 0,
    AtCoderNotificationTime: 0,
    HackerEarthNotificationTime: 0,
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/user/${userName}`);
      setUser(response.data[0]);
      if (!user) {
        console.log('User not found');
        return;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND}/api/user/${user._id}`, user);
      localStorage.setItem('isLoggedIn', user.userName.toString());
      window.location = '/contest-notifier/';
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
        <div className="container minH mt-1">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                User Name:
              </label>
              <TextField
                type="text"
                id="userName"
                name="userName"
                fullWidth
                value={user.userName}
                onChange={handleInputChange}
                variant="outlined"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <TextField
                type="text"
                id="email"
                name="email"
                fullWidth
                value={user.email}
                onChange={handleInputChange}
                variant="outlined"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <TextField
                type="text"
                id="password"
                name="password"
                fullWidth
                value={user.password}
                onChange={handleInputChange}
                variant="outlined"
              />
            </div>
            <h4>Notification Time (in minutes):</h4>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <label htmlFor="CodeForcesNotificationTime" className="form-label">
                  CodeForces:
                </label>
                <TextField
                  type="text"
                  id="CodeForcesNotificationTime"
                  name="CodeForcesNotificationTime"
                  fullWidth
                  value={user.CodeForcesNotificationTime}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="CodeChefNotificationTime" className="form-label">
                  CodeChef:
                </label>
                <TextField
                  type="text"
                  id="CodeChefNotificationTime"
                  name="CodeChefNotificationTime"
                  fullWidth
                  value={user.CodeChefNotificationTime}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="LeetCodeNotificationTime" className="form-label">
                  LeetCode:
                </label>
                <TextField
                  type="text"
                  id="LeetCodeNotificationTime"
                  name="LeetCodeNotificationTime"
                  fullWidth
                  value={user.LeetCodeNotificationTime}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="HackerRankNotificationTime" className="form-label">
                  HackerRank:
                </label>
                <TextField
                  type="text"
                  id="HackerRankNotificationTime"
                  name="HackerRankNotificationTime"
                  fullWidth
                  value={user.HackerRankNotificationTime}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="AtCoderNotificationTime" className="form-label">
                  AtCoder:
                </label>
                <TextField
                  type="text"
                  id="AtCoderNotificationTime"
                  name="AtCoderNotificationTime"
                  fullWidth
                  value={user.AtCoderNotificationTime}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="HackerEarthNotificationTime" className="form-label">
                  HackerEarth:
                </label>
                <TextField
                  type="text"
                  id="HackerEarthNotificationTime"
                  name="HackerEarthNotificationTime"
                  fullWidth
                  value={user.HackerEarthNotificationTime}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save Changes
            </Button>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};
