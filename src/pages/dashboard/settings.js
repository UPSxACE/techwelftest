import DashboardPageHeader from '@/components/dashboard-page-header';
import DashboardWrapper from '@/components/dashboard-wrapper';
import OutlinedForm from '@/components/outlined-form';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Box } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

export default function Settings() {
  const [formData, setFormData] = useState({});

  return (
    <DashboardWrapper>
      <DashboardPageHeader
        title='Settings'
        rightText={'Dashboard / Settings'}
      />

      <OutlinedForm.Form
        formDataState={{ formData, setFormData }}
        fullWidth
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 0,
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
    </DashboardWrapper>
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
