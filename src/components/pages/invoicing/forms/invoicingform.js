import BootstrapForm from '@/components/bootstrap-form';
import DashboardPageHeader from '@/components/dashboard-page-header';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import themeConfig from '@/theme-config';
import axios from 'axios';
import Joi from 'joi';

export default function InvoicingForm({ shadow }) {
  const [formData, setFormData] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectInitialized, setSelectInitialized] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get('https://restcountries.com/v3.1/all?fields=name', {
        cancelToken: source.token,
      })
      .then((response) => {
        setCountries(response.data);
        setSelectInitialized(true);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          // Request was cancelled
        } else {
          // Handle error
        }
      });

    return () => {
      source.cancel('Component unmounted');
    };
  }, []);

  const { t } = useTranslation();

  const defaultValues = {};

  const validators = {
    vatNumber: Joi.number(),
    street1: Joi.string(),
    street2: Joi.string(),
    postalCode: Joi.string(),
    country: Joi.string(),
  };

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
        boxShadow: shadow
          ? themeConfig.palette.primary.dashboardShadow
          : 'none',
      }}
    >
      <BootstrapForm.Control label={t('VatNumber')} field='vatNumber'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          JOIValidator={validators.vatNumber}
          tooltip={{
            tip: t('invoicing_tooltip_tip_vatnumber'),
            example: t('invoicing_tooltip_example_vatnumber'),
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Control label={t('Street1')} field='street1'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          tooltip={{
            tip: t('invoicing_tooltip_tip_street1'),
            example: t('invoicing_tooltip_example_street1'),
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Control label={t('Street2')} field='street2'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          tooltip={{
            tip: t('invoicing_tooltip_tip_street2'),
            example: t('invoicing_tooltip_example_street2'),
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Control label={t('PostalCode')} field='postalCode'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          tooltip={{
            tip: t('invoicing_tooltip_tip_postalcode'),
            example: t('invoicing_tooltip_example_postalcode'),
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.Control label={t('country')} field='country'>
        <BootstrapForm.Label />
        <BootstrapForm.Select
          tooltip={{
            tip: t('invoicing_tooltip_tip_country'),
            example: t('invoicing_tooltip_example_country'),
          }}
          nestedProperty={'name.common'}
          options={countries}
          initialized={selectInitialized}
          orderData
        />
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
