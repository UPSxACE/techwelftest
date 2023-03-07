import { Box } from '@mui/material';
import ColoredBox from '../colored-box';
import appConfig from '@/app-config';
import Image from 'next/image';
import MenuCategory from './menu-category';
import { Home } from '@mui/icons-material';
import { faGear, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DashboardNavbarMenu() {
  return (
    <ColoredBox sx={{ width: 300 }}>
      <Box
        sx={{
          display: 'flex',
          boxShadow: '0px 1px 3px #00000040;',
          height: 70,
          alignItems: 'center',
          paddingLeft: 1,
        }}
      >
        <Image
          width={125}
          height={52}
          alt='Company Logo'
          src={appConfig.logo}
        />
      </Box>
      <MenuCategory.Control>
        <MenuCategory.Group title='Group Example'>
          <MenuCategory.Item faIcon={faHouse} route='/dashboard' title='Home' />
          <MenuCategory.Item
            faIcon={faGear}
            route='/dashboard/settings'
            title='Settings'
          />
          <MenuCategory.Item faIcon={faHouse} title='Item Example' />
          <MenuCategory.Item faIcon={faHouse} title='Item Example' />
          <MenuCategory.Item faIcon={faHouse} title='Item Example' />
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
    </ColoredBox>
  );
}
