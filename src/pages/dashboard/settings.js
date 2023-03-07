import DashboardPageHeader from '@/components/dashboard-page-header';
import OutlinedForm from '@/components/outlined-form';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Box } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

export default function Settings() {
  const [formData, setFormData] = useState({});

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

      <Box
        sx={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 0,
          marginTop: 1,
          marginBottom: 1,
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            border: '1px solid #dadce0',
          }}
        >
          <OutlinedForm.Form
            formDataState={{ formData, setFormData }}
            fullWidth
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 0,
              overflow: 'hidden',
              border: 0,
            }}
          >
            <OutlinedForm.Control label='Name' field='one'>
              <OutlinedForm.Label />
              <OutlinedForm.Input />
            </OutlinedForm.Control>
            <OutlinedForm.Control label='Name' field='one'>
              <OutlinedForm.Label />
              <OutlinedForm.Input />
            </OutlinedForm.Control>
            <OutlinedForm.Control label='Name' field='one'>
              <OutlinedForm.Label />
              <OutlinedForm.Input />
            </OutlinedForm.Control>
            <OutlinedForm.Control label='Name' field='one'>
              <OutlinedForm.Label />
              <OutlinedForm.Input />
            </OutlinedForm.Control>
            <OutlinedForm.Control label='Name' field='one'>
              <OutlinedForm.Label />
              <OutlinedForm.Input />
            </OutlinedForm.Control>
            <OutlinedForm.Control label='Name' field='one'>
              <OutlinedForm.Label />
              <OutlinedForm.Input />
            </OutlinedForm.Control>
            <OutlinedForm.Control label='Name' field='one'>
              <OutlinedForm.Label />
              <OutlinedForm.Input />
            </OutlinedForm.Control>
            <OutlinedForm.Control label='Name' field='one'>
              <OutlinedForm.Label />
              <OutlinedForm.Input />
            </OutlinedForm.Control>
            <OutlinedForm.Control label='Name' field='one'>
              <OutlinedForm.Label />
              <OutlinedForm.Input />
            </OutlinedForm.Control>
            <OutlinedForm.Control label='Name' field='one'>
              <OutlinedForm.Label />
              <OutlinedForm.Input />
            </OutlinedForm.Control>
          </OutlinedForm.Form>
        </Box>
      </Box>
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
