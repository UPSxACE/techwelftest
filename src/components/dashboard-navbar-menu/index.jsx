import { Box } from '@mui/material';
import ColoredBox from '../colored-box';
import appConfig from '@/app-config';
import Image from 'next/image';

export default function DashboardNavbarMenu() {
  return (
    <ColoredBox sx={{ width: 250 }}>
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
    </ColoredBox>
  );
}
