import { InfoOutlined } from '@mui/icons-material';
import { OutlinedInput, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

const Input = ({
  JOIValidator,
  field,
  label,
  formDataState,
  tooltip = {},
  inputProps,
  required = false,
}) => {
  const { formData, setFormData } = formDataState;
  const { t } = useTranslation();

  useEffect(() => {
    if (formData[field] && formData[field]['matches']) {
    }
    if (formData[field] && formData[field]['matchesPassword']) {
      if (!formData[field]['error']) {
        // If formData was updated, and it didn't have an error, re-check it
        if (
          !(
            formData[field]['value'] ===
            formData[formData[field].matchesPassword]['value']
          )
        ) {
          const obj = { ...formData };
          obj[field].error = {
            type: 'does_not_match_password',
            message: 'does_not_match_password',
            context: {
              field1: field,
              field2: obj[field].matchesPassword,
            },
          };
          setFormData(obj);
        }
      } else {
        if (
          formData[field]['value'] ===
            formData[formData[field].matchesPassword]['value'] &&
          formData[field]['error']['type'] === 'does_not_match_password'
        ) {
          const obj = { ...formData };
          delete obj[field]['error'];
          setFormData(obj);
        }
      }
    }
  }, [formData]);

  return (
    <OutlinedInput
      color='info'
      label={required ? label + ' *' : label}
      id={field}
      aria-describedby='my-helper-text'
      onChange={(event) => {
        const newValue = event.target.value;
        const obj = { ...formData };
        obj[field] = formData[field];
        obj[field]['value'] = newValue;
        if (JOIValidator) {
          const validateValue = required
            ? JOIValidator.required().validate(newValue)
            : JOIValidator.allow('').allow(null).validate(newValue);
          obj[field]['error'] = validateValue.error
            ? validateValue.error.details[0]
            : null;
          if (obj[field]['error']) {
            // Try to generate a message of an error that was already predicted
            const error_message = generateMessage(obj[field]['error']);
            // If that kind of error was already predicted, exchange the default error message by one that was manually set.
            if (error_message) {
              obj[field]['error']['message'] = error_message;
              console.log('erroooor', error_message);
            }
          }
        }

        if (formData[field] && formData[field]['matchesPassword']) {
          if (
            !(
              formData[field]['value'] ===
              formData[formData[field].matchesPassword]['value']
            )
          )
            obj[field].error = {
              type: 'does_not_match_password',
              message: 'does_not_match_password',
              context: {
                field1: field,
                field2: obj[field].matchesPassword,
              },
            };
        }

        if (formData[field] && formData[field]['matches']) {
        }
        if (formData[field] && formData[field]['extraValidation']) {
        }

        obj['_filledFields'][field] = newValue ? true : null;
        setFormData({ ...obj });
      }}
      sx={{
        color: 'black',
        '&:hover:not(:focus):not(:focus-visible):not(:focus-within) .MuiOutlinedInput-notchedOutline:not(:focus):not(:focus-visible)':
          {
            borderColor: 'black!important',
          },
        /*
      '& .MuiOutlinedInput-notchedOutline:hover': {
        borderColor: 'black!important',
      },*/
      }}
      required
      endAdornment={
        <Tooltip
          placement='right'
          title={
            <p>
              {label && t(label)}
              {tooltip.tip && (
                <>
                  <br />
                  <br />
                  {t(tooltip.tip)}
                </>
              )}
              {tooltip.example && (
                <>
                  <br />
                  <br />
                  {t('formExample') + t(tooltip.example)}
                </>
              )}
            </p>
          }
        >
          <InfoOutlined
            sx={{ color: 'primary.components3', cursor: 'pointer' }}
          />
        </Tooltip>
      }
      {...inputProps}
      defaultValue={
        formData[field] && formData[field]['value']
          ? formData[field]['value']
          : null
      }
    />
  );
};

// Functions
function generateMessage(error) {
  // Most useful: error.context, error.type

  switch (error.type) {
    case 'string.empty':
      return 'string_empty';
    case 'string.email':
      return 'string_email';
    case 'string.min':
      return ['err_string_min', { size: error.context.limit }];
    case 'number.base':
      return 'err_number_base';
    case 'does_not_match_password':
      return 'does_not_match_password';
    default:
      return null;
  }
}

export default Input;
