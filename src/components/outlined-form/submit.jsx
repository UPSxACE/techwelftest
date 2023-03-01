import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Submit = ({
  validators,
  extraValidation,
  title,
  formDataState,
  formStatusState,
  formLoadingState,
  onSubmit,
  onSuccess,
  onError,
  autoFinalize,
}) => {
  const { formData, setFormData } = formDataState;
  const { formStatus, setFormStatus } = formStatusState;
  const { formLoading, setFormLoading } = formLoadingState;
  const { t } = useTranslation();

  function getFormDataValues() {
    const MultiFormData = new FormData();
    Object.keys(formData).map((field) => {
      if (field[0] !== '_') MultiFormData.append(field, formData[field].value);
    });

    return MultiFormData;
  }

  function validate() {
    let valid = true;

    if (formData._filledFields) {
      Object.keys(formData._filledFields).map((field) => {
        if (valid) {
          let test_result = {};
          if (validators[field]) {
            test_result = formData[field].required
              ? validators[field].validate(formData[field]['value'])
              : validators[field]
                  .allow('')
                  .allow(null)
                  .validate(formData[field]['value']);
          } else {
          }

          if (test_result.error) {
            valid = false;
          }

          if (valid) {
            if (formData[field].matches) {
              if (
                !(
                  formData[field]['value'] ===
                  formData[formData[field].matches]['value']
                )
              )
                test_result.error = {
                  type: 'does_not_match',
                  context: { field1: field, field2: formData[field].matches },
                };
            }

            if (formData[field].matchesPassword) {
              if (
                !(
                  formData[field]['value'] ===
                  formData[formData[field].matchesPassword]['value']
                )
              )
                test_result.error = {
                  type: 'does_not_match_password',
                  message: 'does_not_match_password',
                  context: {
                    field1: field,
                    field2: formData[field].matchesPassword,
                  },
                };
            }

            if (extraValidation) {
            }
          }
        }
      });
    }

    return valid;
  }

  return (
    <Button
      disabled={!validate()}
      variant='contained'
      sx={{ height: 56, fontSize: '1rem' }}
      fullWidth
      onClick={() => {
        if (onSubmit) {
          async function handleSubmit() {
            await onSubmit(getFormDataValues());
          }

          setFormLoading(true);
          handleSubmit()
            .then((result) => {
              if (onSuccess) onSuccess(result, setFormStatus);
              if (autoFinalize) setFormStatus(true);
              setFormLoading(false);
            })
            .catch((error) => {
              if (onError) onError(error, setFormStatus);
              if (autoFinalize) setFormStatus(error);
              setFormLoading(false);
            });
        }
      }}
    >
      {t(title)}
    </Button>
  );
};

export default Submit;
