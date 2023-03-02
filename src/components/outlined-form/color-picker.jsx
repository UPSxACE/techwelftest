import { InfoOutlined } from '@mui/icons-material';
import { Box, Tooltip, Typography } from '@mui/material';
import { MaterialPicker } from 'react-color';
import { styled } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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

export default ColorPicker;