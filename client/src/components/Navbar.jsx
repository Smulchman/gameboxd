import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth.js';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries.js';
export default function Navbar(currentPage, handlePageChange) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const me = Auth.getProfile();
  let myName;
  // nested two layers in is email
  const myEmail = me.data.email;
  // get user by email query
  const userQuery = useQuery(GET_USER, {
    variables: { email: myEmail },
  });
  if (userQuery.data && !userQuery.loading) {
    myName = userQuery.data.user.username;
  }

  console.log(myName);

  return (
    <AppBar position="static" sx={{ bgcolor: '#292827', borderBottom: 3 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {Auth.loggedIn() ? ( 
          <VideogameAssetIcon 
            sx={{  display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />) : (
          <VideogameAssetOffIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          )}
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.4rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GameBoxd
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/SearchResults">
                  <SearchIcon />
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          {Auth.loggedIn() ? (
          <VideogameAssetIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          /> ) : (
            <VideogameAssetOffIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />  
          )}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GameBoxed
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title="Search Games">
              <Link to="/SearchResults">
                <SearchIcon style={{ color: 'white', fontSize: '2em', marginLeft: '1em', marginTop: '0.25em' }} />
              </Link>
            </Tooltip>
          </Box>
          {/* make sure the user is logged in to display user menu  */}
          {Auth.loggedIn() && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={`${myName} options`}
            style={{}}
            >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}
              >
                {userQuery.data ? (
                  <Avatar alt={myName} src="" />
                ) : (
                  <Avatar alt="" src="" />
                )
              }
              </IconButton>
            </Tooltip> 
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
              <Link to='/Profile'
              onClick={handleCloseUserMenu}
              >
                Profile
              </Link>
              </MenuItem>
              <MenuItem onClick={Auth.logout}>Log Out</MenuItem>
            </Menu>
          </Box>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
