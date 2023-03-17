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

export default function NewIpFormModal({
  open,
  handleClose = () => {},
  closeable,
  setCloseable,
  addIp,
}) {
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();

  const defaultValues = {};

  const validators = {
    newip: Joi.string(),
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
          <BootstrapForm.Control
            label={t('advancedsettings_newip_whitelist')}
            field='newip'
            required
          >
            <BootstrapForm.Label />
            <BootstrapForm.Input
              JOIValidator={validators.newip}
              tooltip={{
                tip: t('advancedsettings_tooltip_tip_newip_whitelist'),
                example: t('advancedsettings_tooltip_example_newip_whitelist'),
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
              addIp(formData.newip.value);
              setCloseable(true);
              handleClose();
            }}
          />
        </BootstrapForm.Form>
      </Box>
    </Modal>
  );
}
