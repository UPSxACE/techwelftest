import { CheckCircle, Error, InfoOutlined } from '@mui/icons-material';
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { MaterialPicker } from 'react-color';
import { styled } from '@mui/system';
import ImageNext from 'next/image';
import { t } from 'i18next';
import Link from 'next/link';

const {
  FormControl,
  FormGroup,
  InputLabel,
  OutlinedInput,
  Tooltip,
  FormHelperText,
  Button,
  Box,
  Typography,
} = require('@mui/material');

const Header = ({ children }) => <>{children}</>;
const Footer = ({ children }) => <>{children}</>;

const Form = ({ formDataState, children }) => {
  const { formData, setFormData } = formDataState;
  const [initialized, setInitialized] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const formStyles = {
    maxWidth: 600,
    padding: 50,
    paddingTop: 35,
    paddingBottom: 35,
    border: '1px solid #dadce0',
    borderRadius: 10,
  };
  /* 
    Form status meanings:
    null = yet to be submited; 
    true = submited and success;
    other = submited and error(the error is set in the state);
  */

  useEffect(() => {
    if (!initialized) {
      let newFormData = { ...formData };

      // Initialize the "_filledFields" property if it didn't exist yet
      if (!newFormData['_filledFields']) newFormData['_filledFields'] = {};

      // Check if every field was initialized already
      Children.map(children, (formControl) => {
        // Check if children(that is supposed to be a Form Control component) has the prop field
        const field = formControl.props.field;

        // If it has the prop field defined, proceed to checking if its initialized
        if (field) {
          // If that field wasn't initialized yet, initialize it
          if (!formData[field]) {
            const newObject = {};
            newObject[field] = {
              value: null,
              error: null,
              required: formControl.props.required ? true : false,
              matches: formControl.props.matches
                ? formControl.props.matches
                : null,
              matchesPassword: formControl.props.matchesPassword
                ? formControl.props.matchesPassword
                : null,
            };

            newFormData = { ...newFormData, ...newObject };
          }

          // Check if that field is already in the _filledFields object
          if (!newFormData['_filledFields'][field])
            newFormData['_filledFields'][field] = newFormData[field]['value']
              ? true
              : null;
        }
      });

      setFormData(newFormData);
    }
    setInitialized(true);
  }, []);

  if (formLoading) {
    return <form style={formStyles}>LOADING...</form>;
  }

  if (initialized && formStatus === null) {
    return (
      <form
        style={{
          maxWidth: 600,
          padding: 50,
          paddingTop: 35,
          paddingBottom: 35,
          border: '1px solid #dadce0',
          borderRadius: 10,
        }}
      >
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              formDataState,
              formStatusState: { formStatus, setFormStatus },
              formLoadingState: { formLoading, setFormLoading },
            });
          }
          return child;
        })}
      </form>
    );
  }

  if (initialized && formStatus === true) {
    return (
      <form style={formStyles}>
        <Typography
          sx={{ textAlign: 'center', mb: 2 }}
          variant='h4'
          component='h1'
        >
          {t('register_submit_success_title')}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CheckCircle sx={{ fontSize: 150, color: 'success.main' }} />
        </Box>

        <Typography
          sx={{ textAlign: 'center', mb: 2 }}
          variant='body'
          component='p'
        >
          {t('register_submit_success')}
        </Typography>
      </form>
    );
  }

  if (initialized) {
    // Error submitting form
    return (
      <form style={formStyles}>
        <Typography
          sx={{ textAlign: 'center', mb: 2 }}
          variant='h4'
          component='h1'
        >
          {t('error_occurred')}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Error sx={{ fontSize: 150, color: 'error.main' }} />
        </Box>

        <Typography
          sx={{ textAlign: 'center', mb: 2 }}
          variant='body'
          component='p'
        >
          {t('register_submit_error')}
        </Typography>
        <Link
          href='#'
          onClick={() => {
            setFormStatus(null);
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          <Typography variant='body1' component={'span'}>
            {t('form_try_again')}
          </Typography>
        </Link>
      </form>
    );
  }
};

const Control = ({ field, label, required, formDataState, children }) => {
  const formData = formDataState.formData;

  return (
    <FormControl
      sx={{ width: '100%', marginBottom: 2 }}
      error={formData[field]['error'] ? true : false}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { field, formDataState, required, label });
        }
        return child;
      })}
    </FormControl>
  );
};

const Group = ({ children }) => <FormGroup>{children}</FormGroup>;

const Label = ({ field, label, required, children }) => (
  <InputLabel color='info' htmlFor={field}>
    {required ? label + ' *' : label}
  </InputLabel>
);

const HelperText = ({ field, formDataState, children }) => {
  const { formData, setFormData } = formDataState;
  const { t } = useTranslation();

  if (formData[field])
    if (formData[field]['error']) {
      return (
        <FormHelperText id={'helper-' + field}>
          {Object.prototype.toString.call(
            formData[field]['error']['message']
          ) === '[object Array]'
            ? t(
                formData[field]['error']['message'][0],
                formData[field]['error']['message'][1]
              )
            : t(formData[field]['error']['message'])}
        </FormHelperText>
      );
    }
};

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

const Submit = ({
  validators,
  extraValidation,
  title,
  field,
  formDataState,
  formStatusState,
  formLoadingState,
  onSubmit,
  onSuccess,
  onError,
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
              if (onSuccess) onSuccess(result);
              setFormStatus(true);
              setFormLoading(false);
            })
            .catch((error) => {
              if (onError) onError(error);
              setFormStatus(error);
              setFormLoading(false);
            });
        }
      }}
    >
      {t(title)}
    </Button>
  );
};

const StyledMP = styled(MaterialPicker)({
  width: '100%!important',
  height: '125px!important',
});

const ColorPicker = ({
  label,
  formDataState,
  field,
  defaultColor = '#000000',
  tooltip,
}) => {
  const [color, setColor] = useState(defaultColor);
  const { formData, setFormData } = formDataState;
  const { t } = useTranslation();

  return (
    <>
      {label && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <Typography variant='h6' component='h2' sx={{ mr: 1 }}>
            {label}
          </Typography>
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
            <Typography
              variant='h6'
              component='h2'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <InfoOutlined
                sx={{
                  color: 'primary.components3',
                  cursor: 'pointer',
                }}
              />
            </Typography>
          </Tooltip>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          border: '1px solid #dadce0',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ width: '50%', '& div': { boxShadow: 'none!important' } }}>
          <StyledMP
            color={color}
            onChangeComplete={(color) => {
              const newColor = color.hex;
              const obj = { ...formData };
              obj[field]['value'] = newColor;
              setColor(newColor);
              setFormData(obj);
            }}
          />
        </Box>
        <Box sx={{ width: '50%', backgroundColor: color }} />
      </Box>
    </>
  );
};

// Full Height and Width NextJS Image
const LogoImage = styled(ImageNext)((props) => {
  return {
    height: 'auto',
    width: '80%',
  };
});

const ImageUploader = ({
  label,
  formDataState,
  defaultImage,
  field,
  tooltip,
  backgroundSwitcher,
  description,
}) => {
  const [image, setImage] = useState(defaultImage);
  const [file, setFile] = useState(null);
  const { formData, setFormData } = formDataState;
  const { t } = useTranslation();
  const [logoBackground, setLogoBackground] = useState('#ffffff');

  useEffect(() => {
    //
  }, [file]);

  return (
    <>
      {label && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <Typography variant='h6' component='h2' sx={{ mr: 1 }}>
            {label}
          </Typography>
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
            <Typography
              variant='h6'
              component='h2'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <InfoOutlined
                sx={{
                  color: 'primary.components3',
                  cursor: 'pointer',
                }}
              />
            </Typography>
          </Tooltip>
        </Box>
      )}
      {description && description}
      <Box
        sx={{
          display: 'flex',
          border: '1px solid #dadce0',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '50%',
            height: 125,
            borderRight: '1px solid #dadce0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <label
            htmlFor='fileInput'
            style={{
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ImageNext
              alt='Image upload icon'
              id='icon'
              width={62}
              height={62}
              src={'./cloud_upload-24px.svg'}
              style={{ opacity: 0.4 }}
            />
          </label>
          <input
            style={{ display: 'none' }}
            id='fileInput'
            type='file'
            onChange={(e) => {
              const file = e.target.files[0];
              const img = new Image();
              const url = URL.createObjectURL(file);
              img.onload = function () {
                if (this.width > 500 || this.height > 500) {
                  const obj = { ...formData };
                  obj[field]['error'] = {
                    type: 'image_too_big',
                    message: ['image_too_big', { limitH: 500, limitW: 500 }],
                  };
                  setFormData(obj);
                } else {
                  if (formData[field]['error']) {
                    const obj = { ...formData };
                    delete obj[field]['error'];
                    setFormData(obj);
                  }
                  const obj = { ...formData };
                  obj[field]['value'] = file;
                  setFormData(obj);
                  setFile(file);
                }

                URL.revokeObjectURL(url);
              };
              img.src = url;
            }}
          />
        </Box>
        <Box
          sx={{
            width: '50%',
            height: 125,
            borderLeft: '1px solid #dadce0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: backgroundSwitcher ? 'pointer' : 'default',
            backgroundColor: logoBackground,
          }}
          onClick={() => {
            if (backgroundSwitcher)
              logoBackground !== '#ffffff'
                ? setLogoBackground('#ffffff')
                : setLogoBackground('#444444');
          }}
        >
          <LogoImage
            width={500}
            height='0'
            alt='Your website logo'
            src={file ? URL.createObjectURL(file) : '/logo.png'}
          />
        </Box>
      </Box>
    </>
  );
};

const Text = ({ label, formDataState, field, children }) => {
  return (
    <Typography variant='body1' component='span' sx={{ mb: 1 }}>
      {children}
    </Typography>
  );
};

const OutlinedForm = {
  Form,
  Control,
  Group,
  Label,
  Input,
  HelperText,
  Submit,
  ColorPicker,
  ImageUploader,
  Header,
  Footer,
  Text,
};

export default OutlinedForm;

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
