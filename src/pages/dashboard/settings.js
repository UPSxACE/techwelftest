import DashboardWrapper from '@/components/dashboard-wrapper';
import DashboardLayout from '@/layouts/dashboard-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DashboardPageHeader from '@/components/dashboard-page-header';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import Joi from 'joi';
import AccordionForm from '@/components/accordion-form';
import CompanySettingsForm from '@/components/pages/settings/forms/companysettingsform';
import UsersTable from '@/components/pages/settings/tables/userstable';
import RolesTable from '@/components/pages/settings/tables/rolestable';
import InvoicingForm from '@/components/pages/settings/forms/invoicingform';
import AdvancedSettings from '@/components/pages/settings/advancedsettings';

export default function Settings() {
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();

  const defaultValues = {
    companyId: '000',
    companyName: 'Test',
    email: 'data_from@backend.com',
  };

  const validators = {
    email: Joi.string().email({ tlds: { allow: false } }),
    newPassword: Joi.string().min(9),
    newPasswordConfirm: Joi.string(),
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <DashboardWrapper notAligned>
      <Box
        sx={{
          flex: 1,
          flexDirection: 'column',
          display: 'flex',
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
            border: '1px solid #dadce0',
            borderRadius: 1,
            boxShadow:
              '0 0 5px 0 rgb(43 43 43 / 10%), 0 11px 6px -7px rgb(43 43 43 / 10%)',
            overflow: 'hidden',
            //padding: 5,
          }}
        >
          <AccordionForm.Form>
            <AccordionForm.Part title={t('CompanySettings')} id={1}>
              <CompanySettingsForm />
            </AccordionForm.Part>
            <AccordionForm.Part title={t('SettingsUsers')} id={2}>
              <UsersTable />
            </AccordionForm.Part>
            <AccordionForm.Part title={t('SettingsRoles')} id={3}>
              <RolesTable />
            </AccordionForm.Part>
            <AccordionForm.Part title={t('SettingsInvoicing')} id={4}>
              <InvoicingForm />
            </AccordionForm.Part>
            <AccordionForm.Part title={t('AdvancedSettings')} id={5}>
              <AdvancedSettings />
            </AccordionForm.Part>
          </AccordionForm.Form>
        </Box>
      </Box>
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
