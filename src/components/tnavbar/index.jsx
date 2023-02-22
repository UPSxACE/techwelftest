import appConfig from '@/app-config';
import { Adb, LogoDev } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PageLink from './page-link';

export default function TNavBar({ children, ...props }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user_settings = ['setting_a', 'setting_b'];

  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar sx={{ paddingY: 1 }} disableGutters>
          <Box
            sx={{
              flex: 1,
              display: {
                xs: 'flex',
                md: 'none',
              },
            }}
          >
            {/* Menu Options XS */}
            <IconButton
              size='large'
              aria-label='menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
              sx={{ height: 52, width: 52 }}
            >
              <MenuIcon sx={{ color: 'text.primary' }} />
            </IconButton>
            <Menu
              id='menu-appbar'
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {renderPagesMenu()}
            </Menu>
            <LogoDev
              sx={{
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: 52,
                textDecoration: 'none',
                color: 'text.primary',
              }}
            />
            <Tooltip title='User Options'>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, height: 52, width: 52 }}
              >
                <UserAvatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
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
              {user_settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography color='text.secondary' textAlign='center'>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', md: 'flex', alignItems: 'center' },
            }}
          >
            <LogoDev
              sx={{
                mr: 2,
                fontSize: 52,
                textDecoration: 'none',
                color: 'text.primary',
              }}
            />
            {renderPages()}
            <Tooltip title='User Options'>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, height: 52, width: 52, marginLeft: 'auto' }}
              >
                <UserAvatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
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
              {user_settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography color='text.secondary' textAlign='center'>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );

  function handleOpenNavMenu(event) {
    setAnchorElNav(event.currentTarget);
  }

  function handleCloseNavMenu() {
    setAnchorElNav(null);
  }

  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  function renderPages() {
    return appConfig.pages.map((page, index) => (
      <PageLink route={page.route} pageName={page.name} key={index} />
    ));
  }

  function renderPagesMenu() {
    return appConfig.pages.map((page, index) => (
      <MenuItem key={index} onClick={handleCloseNavMenu}>
        <PageLink route={page.route} pageName={page.name} />
      </MenuItem>
    ));
  }

  function UserAvatar() {
    return (
      <Avatar
        sx={{ color: 'text.primary' }}
        alt='User Avatar'
        src='/user.png'
      />
    );
  }
}
