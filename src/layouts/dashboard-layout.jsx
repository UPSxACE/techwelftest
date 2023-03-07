import DashboardNavbarMenu from '@/components/dashboard-navbar-menu';
import DashboardNavbar from '@/components/dashboard-navbar-menu';
import DashboardNavbarUser from '@/components/dashboard-navbar-user';
import TFooter from '@/components/tfooter';
import TNavBar from '@/components/tnavbar';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function DashboardLayout({
  transparentBar = false,
  children,
  title,
}) {
  return (
    <>
      <Head>
        <title>{title ? 'Dashboard' + ' - ' + title : 'Dashboard'}</title>
        <meta
          name='description'
          content='OK1st Part Dashboard, powered by Techwelf'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <a style={{ position: 'relative', top: -67 }} id='page-start' />
      <motion.div
        id='body'
        style={{
          overscrollBehaviorY: 'contain',
          //overflowY: 'auto',
          width: '100vw',
          maxWidth: '100%',
        }}
      >
        <Box component={motion.div} sx={{ display: 'flex' }}>
          <DashboardNavbarMenu />
          <Box sx={{ width: '100%' }}>
            <DashboardNavbarUser />
            {children}
          </Box>
        </Box>
      </motion.div>
    </>
  );
}
