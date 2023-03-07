import DashboardPageHeader from '@/components/dashboard-page-header';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Box } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Settings() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        px: 4,
        py: 1.5,
        backgroundColor: 'primary.components4',
        flexDirection: 'column',
      }}
    >
      <DashboardPageHeader
        title='Settings'
        rightText={'Dashboard / Settings'}
      />
      Form
    </Box>
  );
}

Settings.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

//export default withAuth(Settings);

export async function getStaticProps({ locale }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
