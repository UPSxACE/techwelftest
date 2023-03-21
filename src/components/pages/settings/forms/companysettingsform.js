import BootstrapForm from '@/components/bootstrap-form';
import DashboardPageHeader from '@/components/dashboard-page-header';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import themeConfig from '@/theme-config';
import axios from 'axios';
import Joi from 'joi';
import useClientSide from '@/hooks/client-side';
import { Alert } from '@mui/material';
import api from '@/api';

export default function CompanySettingsForm() {
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(null);
  const { t } = useTranslation();

  const defaultValues = {
    companyId: '000',
    companyName: 'Test Company',
    email: 'data_from@backend.com',
    //websiteColor: '#E5E300',
  };

  const validators = {
    email: Joi.string().email({ tlds: { allow: false } }),
    newPassword: Joi.string().min(9),
    newPasswordConfirm: Joi.string(),
    domain: Joi.string().max(32),
    websiteColor: Joi.any(),
    websiteLogo: Joi.any(),
  };

  const { serverIsDone } = useClientSide();

  if (!serverIsDone) {
    return;
  }

  return (
    <BootstrapForm.Form
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
      <BootstrapForm.Header>
        {alert && (
          <Alert severity='success' sx={{ marginBottom: 2 }}>
            {alert}
          </Alert>
        )}
      </BootstrapForm.Header>
      <BootstrapForm.Control label={t('CompanyName')} field='companyName'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          readOnly
          tooltip={{
            tip: t('companysettings_tooltip_tip_companyname'),
            example: 'companysettings_tooltip_example_companyname',
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>
      <BootstrapForm.Control label={t('CompanyID')} field='companyId'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          readOnly
          tooltip={{
            tip: t('companysettings_tooltip_tip_companyid'),
            example: 'companysettings_tooltip_example_companyid',
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>
      <BootstrapForm.Control label={t('EmailAddress')} field='email' required>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          JOIValidator={validators.email}
          tooltip={{
            tip: t('companysettings_tooltip_tip_email'),
            example: 'companysettings_tooltip_example_email',
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>
      <BootstrapForm.Control label={t('newPassword')} field='newPassword'>
        <BootstrapForm.Label />
        <BootstrapForm.Input
          tooltip={{
            tip: t('tooltip_tip_newPassword'),
            example: t('tooltip_example_newPassword'),
          }}
          JOIValidator={validators.newPassword}
          inputProps={{ type: 'password' }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>
      <BootstrapForm.Control
        label={t('confirmNewPassword')}
        field='newPasswordConfirm'
        matchesPassword={'newPassword'}
      >
        <BootstrapForm.Label />
        <BootstrapForm.Input
          JOIValidator={validators.newPasswordConfirm}
          inputProps={{ type: 'password' }}
          tooltip={{
            tip: t('tooltip_tip_confirmNewPassword'),
            example: t('tooltip_example_confirmNewPassword'),
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.TwoHalfs fields={['websiteColor', 'websiteLogo']}>
        <BootstrapForm.Control
          half
          required
          label={t('websiteColor')}
          field='websiteColor'
        >
          <BootstrapForm.ColorPicker
            defaultColor={themeConfig.palette.primary.special1}
            tooltip={{
              tip: t('companysettings_tooltip_tip_websiteColor'),
            }}
            containerStyle={{ paddingRight: 2 }}
          />
        </BootstrapForm.Control>

        <BootstrapForm.Control
          half
          required
          label={t('websiteLogo')}
          field='websiteLogo'
        >
          <BootstrapForm.ImageUploader
            backgroundSwitcher
            defaultImage={true}
            tooltip={{
              tip: t('companysettings_tooltip_tip_websiteLogo'),
            }}
            description={
              <>
                {formData['websiteLogo'] &&
                  formData['websiteLogo']['value'] && (
                    <BootstrapForm.Text containerStyle={{ mt: 1 }}>
                      {t('register_if_image_white')}
                    </BootstrapForm.Text>
                  )}
              </>
            }
            containerStyle={{ paddingLeft: 2 }}
          />
          <BootstrapForm.HelperText />
        </BootstrapForm.Control>
      </BootstrapForm.TwoHalfs>
      <BootstrapForm.Control label={t('Domain')} field='domain' required>
        <BootstrapForm.Label />
        <BootstrapForm.BootstrapFillInput
          text={'.ok1st.com'}
          JOIValidator={validators.domain}
          tooltip={{
            tip: t('companysettings_tooltip_tip_domain'),
            example: t('companysettings_tooltip_example_domain'),
          }}
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>
      <BootstrapForm.Submit
        alignRight
        title={t('settings_accordionform_save')}
        validators={validators}
        containerStyle={{ marginTop: 'auto' }}
        onSubmit={async () => {
          // Test endpoint
          console.log('ZZZ');
          await api
            .updateCompanySettings({
              designation: formData.companyName.value,
              domain: formData.domain.value,
              color: formData.websiteColor.value,
              //password: formData.password.value,
              email: formData.email.value,
            })
            .then((response) => {
              console.log(response);
              setAlert(t('company_settings_updated'));
            })
            .catch((err) => console.log(err));
        }}
        onError={(err) => {
          console.log(err);
        }}
      />
    </BootstrapForm.Form>
  );
}
