import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';
import GamepadIcon from '@mui/icons-material/Gamepad';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { borders } from '@mui/system';
import Auth from '../utils/auth.js';
// import '../assets/css'

const pages = [<GamepadIcon />, <SearchIcon />];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
// don't need an array for a couple dropdown options. easier to add onclick functions by putting them in the markup. -jr

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
            <Tooltip title="User Options"
            style={{}}
            >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}
              >
                <Avatar alt="bemy Sharp" src="" />
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
              <Link to='/Profile'>
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
