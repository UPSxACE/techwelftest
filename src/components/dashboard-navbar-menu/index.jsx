import { Box } from '@mui/material';
import ColoredBox from '../colored-box';
import appConfig from '@/app-config';
import Image from 'next/image';
import MenuCategory from './menu-category';
import { Home } from '@mui/icons-material';
import {
  faGear,
  faHouse,
  faReceipt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function DashboardNavbarMenu({ state }) {
  const { open, setOpen } = state;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setOpen((open) => !open);
  };

  return (
    <Box>
      <MenuCategory.Control
        state={{ open, setOpen }}
        handleDrawerToggle={handleDrawerToggle}
      >
        <MenuCategory.Group title='Group Example'>
          <MenuCategory.Item faIcon={faHouse} route='/dashboard' title='Home' />
          <MenuCategory.Item faIcon={faUsers} title='Users' />
          <MenuCategory.Item faIcon={faReceipt} title='Invoicing' />
          <MenuCategory.Item
            faIcon={faGear}
            route='/dashboard/settings'
            title='Settings'
          />
        </MenuCategory.Group>
        <MenuCategory.Group title='Group Example'>
          <MenuCategory.Item faIcon={faHouse} title='Item Example' />
          <MenuCategory.Item faIcon={faHouse} title='Item Example' />
        </MenuCategory.Group>
        <MenuCategory.Group title='Group Example'>
          <MenuCategory.Item faIcon={faHouse} title='Item Example' />
          <MenuCategory.Item faIcon={faHouse} title='Item Example' />
          <MenuCategory.Item faIcon={faHouse} title='Item Example' />
        </MenuCategory.Group>
      </MenuCategory.Control>
    </Box>
  );
}
