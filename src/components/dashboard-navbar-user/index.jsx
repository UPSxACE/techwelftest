import { Search } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import appConfig from '@/app-config';
import UserAvatar from '../user-avatar';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function DashboardNavbarUser() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        boxShadow: '0px 1px 3px #00000040;',
        height: 70,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingX: 1.5,
        backgroundColor: 'primary.components2',
        position: 'relative',
      }}
    >
      {appConfig.dashboardSearch && <Search sx={{ fontSize: 40 }} />}
      <Typography
        variant='h4'
        color='text.secondary'
        style={{ fontSize: 40 }}
        component={'span'}
      ></Typography>
      <Box sx={{ marginLeft: 'auto' }}>
        <Tooltip title='User Options'>
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0, height: 52, width: 52 }}
          >
            <UserAvatar dark />
          </IconButton>
        </Tooltip>
      </Box>
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
        {appConfig.userDashboardMenu.map((setting, index) => (
          <Link
            key={index}
            style={{ textDecoration: 'none' }}
            href={setting.route}
            onClick={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography color='text.secondary' textAlign='center'>
                {t(setting.name)}
              </Typography>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  );
}
