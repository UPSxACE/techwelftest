import BootstrapForm from '@/components/bootstrap-form';
import DashboardPageHeader from '@/components/dashboard-page-header';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import themeConfig from '@/theme-config';
import axios from 'axios';
import Joi from 'joi';

export default function CompanySettingsForm() {
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
      <BootstrapForm.Control label={t('CompanyName')} field='companyName'>
        <BootstrapForm.Label />
        <BootstrapForm.Input readOnly />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>
      <BootstrapForm.Control label={t('CompanyID')} field='companyId'>
        <BootstrapForm.Label />
        <BootstrapForm.Input readOnly />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>
      <BootstrapForm.Control label={t('email')} field='email' required>
        <BootstrapForm.Label />
        <BootstrapForm.Input JOIValidator={validators.email} />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>
      <BootstrapForm.Control
        label={t('newPassword')}
        field='newPassword'
        tooltip={{
          tip: t('tooltip_tip_password'),
          example: 'VerySafeP4ssw0rd##',
        }}
      >
        <BootstrapForm.Label />
        <BootstrapForm.Input
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
        />
        <BootstrapForm.HelperText />
      </BootstrapForm.Control>

      <BootstrapForm.TwoHalfs>
        <BootstrapForm.Control
          half
          required
          label={t('websiteColor')}
          field='websiteColor'
        >
          <BootstrapForm.ColorPicker
            defaultColor={themeConfig.palette.primary.special1}
            tooltip={{
              tip: t('tooltip_tip_websiteColor'),
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
              tip: t('tooltip_tip_websiteLogo'),
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