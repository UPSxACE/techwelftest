import { Box, Button, Modal } from '@mui/material';
import LoaderPrimary from '@/components/loader-primary';
import BootstrapForm from '@/components/bootstrap-form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Joi from 'joi';
import axios from 'axios';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 1000,
  minHeight: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 3,
};

export default function NewUserFormModal({
  open,
  handleClose = () => {},
  closeable,
  setCloseable,
}) {
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();

  const defaultValues = {};

  const validators = {
    name: Joi.string(),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().min(9),
    passwordConfirm: Joi.string(),
    role: Joi.string(),
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        if (closeable) handleClose();
      }}
    >
      <Box sx={modalStyle}>
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
          renderLoading={<LoaderPrimary />}
          onErrorConfirm={() => {
            setCloseable(true);
          }}
        >
          <BootstrapForm.Control label={t('name')} field='name'>
            <BootstrapForm.Label />
            <BootstrapForm.Input
              JOIValidator={validators.name}
              tooltip={{
                tip: t('adduserform_tooltip_tip_name'),
                example: t('adduserform_tooltip_example_name'),
              }}
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>
          <BootstrapForm.Control
            label={t('EmailAddress')}
            field='email'
            required
          >
            <BootstrapForm.Label />
            <BootstrapForm.Input
              JOIValidator={validators.email}
              tooltip={{
                tip: t('adduserform_tooltip_tip_email'),
                example: t('adduserform_tooltip_example_email'),
              }}
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>
          <BootstrapForm.Control
            label={t('password')}
            field='password'
            required
          >
            <BootstrapForm.Label />
            <BootstrapForm.Input
              tooltip={{
                tip: t('tooltip_tip_password'),
                example: 'VerySafeP4ssw0rd##',
              }}
              JOIValidator={validators.password}
              inputProps={{ type: 'password' }}
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>
          <BootstrapForm.Control
            label={t('confirmPassword')}
            field='passwordConfirm'
            matchesPassword={'password'}
            required
          >
            <BootstrapForm.Label />
            <BootstrapForm.Input
              JOIValidator={validators.passwordConfirm}
              inputProps={{ type: 'password' }}
              tooltip={{
                tip: t('adduserform_tooltip_tip_confirmpassword'),
                example: t('adduserform_tooltip_example_confirmpassword'),
              }}
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>

          <BootstrapForm.Control label={t('role')} field='role' required>
            <BootstrapForm.Label />
            <BootstrapForm.Input
              JOIValidator={validators.role}
              tooltip={{
                tip: t('adduserform_tooltip_tip_role'),
                example: t('adduserform_tooltip_example_role'),
              }}
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>
          <BootstrapForm.Submit
            title={t('settings_accordionform_save')}
            validators={validators}
            onSubmit={async (formData) => {
              setCloseable(false);

              // Test endpoint
              await axios.post(
                'http://localhost:9000/test/formdata',
                formData,
                {
                  headers: { 'Content-Type': 'multipart/form-data' },
                }
              );
            }}
            onSuccess={() => {
              setCloseable(true);
            }}
          />
        </BootstrapForm.Form>
      </Box>
    </Modal>
  );
}
