import appConfig from '@/app-config';
import { Adb, LogoDev } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { motion, useMotionValueEvent } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PageLink from './page-link';
import { useScroll } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import LanguageContext from '@/contexts/language-context';
import Link from 'next/link';

export default function TNavBar({ children, ...props }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [color, setColor] = useState(false);
  const { t } = useTranslation();

  const { scrollYProgress } = useScroll();
  const { currentLanguage, setLanguage } = useContext(LanguageContext);

  useMotionValueEvent(scrollYProgress, 'change', (last) => {
    last > 0.01 ? setColor(true) : setColor(false);
  });

  const languagesEnabled = Boolean(appConfig.languages.length > 1);

  return (
    <AppBar
      position='sticky'
      sx={{
        fontSize: 0,
        backgroundColor: color
          ? 'primary.components'
          : 'rgba(0,0,0,0)' /*primary.components*/,
        boxShadow: 0,
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar sx={{ paddingY: 1 }} disableGutters>
          {/* Menu Options XS */}
          <Box
            sx={{
              flex: 1,
              display: {
                xs: 'flex',
                md: 'none',
              },
            }}
          >
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
              disableScrollLock={true}
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
            <a href='#page-start'>
              <LogoDev
                sx={{
                  marginLeft: 'auto',
                  marginRight:
                    languagesEnabled || appConfig.userAccess
                      ? 'auto'
                      : 'initial',
                  fontSize: 52,
                  textDecoration: 'none',
                  color: 'text.primary',
                }}
              />
            </a>
            {languagesEnabled && (
              <Tooltip title='Change Language'>
                <IconButton
                  onClick={handleOpenLanguageMenu}
                  sx={{ p: 0, height: 52, width: 52 }}
                >
                  <LanguageIcon
                    name={currentLanguage.id}
                    imgPath={currentLanguage.flagPath}
                  />
                </IconButton>
              </Tooltip>
            )}
            {appConfig.userAccess && (
              <Tooltip title='User Options'>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, height: 52, width: 52 }}
                >
                  <UserAvatar />
                </IconButton>
              </Tooltip>
            )}
            <Menu
              disableScrollLock={true}
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
              {appConfig.usersOptionsMenu.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Link style={{ textDecoration: 'none' }} href={setting.route}>
                    <Typography color='text.secondary' textAlign='center'>
                      {t(setting.name)}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Menu Options MD */}
          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', md: 'flex', alignItems: 'center' },
            }}
          >
            <a href='#page-start'>
              <LogoDev
                sx={{
                  mr: 2,
                  fontSize: 52,
                  textDecoration: 'none',
                  color: 'text.primary',
                }}
              />
            </a>
            {renderPages()}
            {languagesEnabled && (
              <Tooltip title='Change Language'>
                <IconButton
                  onClick={handleOpenLanguageMenu}
                  sx={{ p: 0, height: 52, width: 52, marginLeft: 'auto' }}
                >
                  <LanguageIcon
                    name={currentLanguage.id}
                    imgPath={currentLanguage.flagPath}
                  />
                </IconButton>
              </Tooltip>
            )}
            <Menu
              disableScrollLock={true}
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElLanguage}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElLanguage)}
              onClose={handleCloseLanguageMenu}
            >
              {appConfig.languages.map((language) => (
                <a
                  key={language.id}
                  onClick={() => {
                    setLanguage(language.id);
                  }}
                >
                  <MenuItem onClick={handleCloseLanguageMenu}>
                    <ListItemIcon>
                      <LanguageIcon
                        small
                        pressable
                        name='English'
                        imgPath={language.flagPath}
                      />
                    </ListItemIcon>
                    <Typography color='text.secondary' textAlign='center'>
                      {t(language.name)}
                    </Typography>
                  </MenuItem>
                </a>
              ))}
            </Menu>
            {/* User Icon/Avatar */}
            {appConfig.userAccess && (
              <Tooltip title='User Options'>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    height: 52,
                    width: 52,
                    marginLeft: !languagesEnabled ? 'auto' : 0,
                  }}
                >
                  <UserAvatar />
                </IconButton>
              </Tooltip>
            )}
            {/* User Options Menu */}
            <Menu
              disableScrollLock={true}
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
              {appConfig.usersOptionsMenu.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Link style={{ textDecoration: 'none' }} href={setting.route}>
                    <Typography color='text.secondary' textAlign='center'>
                      {t(setting.name)}
                    </Typography>
                  </Link>
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

  function handleOpenLanguageMenu(event) {
    setAnchorElLanguage(event.currentTarget);
  }

  function handleCloseLanguageMenu() {
    setAnchorElLanguage(null);
  }

  function renderPages() {
    return appConfig.pages.map((page, index) => (
      <PageLink route={page.route} pageName={page.name} key={index} />
    ));
  }

  function renderPagesMenu() {
    return appConfig.pages.map((page, index) => (
      <MenuItem key={index} onClick={handleCloseNavMenu}>
        <PageLink secondary route={page.route} pageName={page.name} />
      </MenuItem>
    ));
  }

  function UserAvatar() {
    return (
      <Avatar
        sx={{ color: 'text.primary' }}
        alt='User Avatar'
        src='/user_white.png'
      />
    );
  }

  function LanguageIcon({ name, imgPath, small = false }) {
    return (
      <Avatar
        sx={{
          color: 'text.primary',
          height: small ? 25 : 40,
          width: small ? 25 : 40,
        }}
        alt={name + ' flag'}
        src={imgPath}
      />
    );
  }
}
