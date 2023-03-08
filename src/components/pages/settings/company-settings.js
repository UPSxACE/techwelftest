import BootstrapForm from '@/components/bootstrap-form';
import DashboardPageHeader from '@/components/dashboard-page-header';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import themeConfig from '@/theme-config';
import { Accordion, Box, Typography } from '@mui/material';
import axios from 'axios';
import Joi from 'joi';
import AccordionForm from '@/components/accordion-form';
import CompanySettingsForm from './forms/companysettingsform';

export default function CompanySettings() {
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
          <AccordionForm.Part title={t('SettingsRoles')} id={2} />
          <AccordionForm.Part title={t('SettingsUsers')} id={3} />
          <AccordionForm.Part title={t('SettingsInvoicing')} id={4} />
          <AccordionForm.Part title={t('AdvancedSettings')} id={5} />
        </AccordionForm.Form>
      </Box>
    </Box>
  );
}
