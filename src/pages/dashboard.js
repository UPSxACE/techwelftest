import MainLayout from '@/layouts/main-layout';
import withAuth from '@/utils/withAuth';
import { Box } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 68px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: 2, sm: 8, md: 14 },
      }}
    >
      AAA
    </Box>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

//export default withAuth(Dashboard);

export async function getStaticProps({ locale }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
