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

export default function NewRoleFormModal({
  open,
  handleClose = () => {},
  closeable,
  setCloseable,
}) {
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();
  const [selectInitialized, setSelectInitialized] = useState(false);
  const [permissions, setPermissions] = useState([
    'Permission 1',
    'Permission 2',
    'Permission 3',
  ]); // Must be null while waiting for the backend, because of the Boostrap Form Checkbox List component loader

  const positionapprovation_options = [1, 2, 3, 4, 5];

  const defaultValues = {};

  useEffect(() => {
    console.log('fD', formData);
  }, [formData]);

  const validators = {
    name: Joi.string(),
    positionapprovation: Joi.number().min(1).max(5),
    //caneditforms: Joi.any(),
    permissions: Joi.any(),
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
            label={t('addroleform_label_name')}
            field='name'
          >
            <BootstrapForm.Label />
            <BootstrapForm.Input
              JOIValidator={validators.name}
              tooltip={{
                tip: t('addroleform_tooltip_tip_rolename'),
                example: t('addroleform_tooltip_example_rolename'),
              }}
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>

          <BootstrapForm.Control
            label={t('addroleform_label_positionapprovation')}
            field='positionapprovation'
          >
            <BootstrapForm.Label />

            <BootstrapForm.Select
              JOIValidator={validators.positionapprovation}
              tooltip={{
                tip: t('addroleform_tooltip_tip_positionapprovation'),
                example: t('addroleform_tooltip_example_positionapprovation'),
              }}
              //nestedProperty={'name.common'}
              options={positionapprovation_options}
              initialized={selectInitialized}
              //orderData
            />
            <BootstrapForm.HelperText />
          </BootstrapForm.Control>

          <BootstrapForm.Control
            //label={t('addroleform_label_permissions')}
            field='permissions'
          >
            <BootstrapForm.Label />

            <BootstrapForm.CheckboxList
              title='addroleform_label_permissions'
              JOIValidator={validators.permissions}
              tooltip={{
                tip: t('addroleform_tooltip_tip_permissions'),
                example: t('addroleform_tooltip_example_permissions'),
              }}
              //nestedProperty={'name.common'}
              options={permissions}
              initialized={selectInitialized}
              //orderData
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
