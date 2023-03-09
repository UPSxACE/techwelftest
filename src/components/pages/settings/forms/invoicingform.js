import BootstrapForm from '@/components/bootstrap-form';
import DashboardPageHeader from '@/components/dashboard-page-header';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import themeConfig from '@/theme-config';
import axios from 'axios';
import Joi from 'joi';

export default function InvoicingForm() {
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();

  const defaultValues = {};

  const validators = {
    vatNumber: Joi.number(),
    street1: Joi.string(),
    street2: Joi.string(),
    postalCode: Joi.string(),
    country: Joi.string(),
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <BootstrapForm.Form
      autoFinalize
      defaultValues={defaultValues}
      formDataState={{ formData, setFormData }}
      fullWidth
      style={{
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 0,
        border: 0,
      }}
    >
      <BootstrapForm.Control label={t('VatNumber')} field='vatNumber'>
        <BootstrapForm.Label />
        <BootstrapForm.Input JOIValidator={validators.vatNumber} />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Control label={t('Street1')} field='street1'>
        <BootstrapForm.Label />
        <BootstrapForm.Input />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Control label={t('Street2')} field='street2'>
        <BootstrapForm.Label />
        <BootstrapForm.Input />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Control label={t('PostalCode')} field='postalCode'>
        <BootstrapForm.Label />
        <BootstrapForm.Input />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Control label={t('country')} field='country'>
        <BootstrapForm.Label />
        <BootstrapForm.Input />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Submit
        alignRight
        title={t('settings_accordionform_save')}
        validators={validators}
        containerStyle={{ marginTop: 'auto' }}
        onSubmit={async (formData) => {
          // Test endpoint
          await axios.post('http://localhost:9000/test/formdata', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        }}
      />
    </BootstrapForm.Form>
  );
}
