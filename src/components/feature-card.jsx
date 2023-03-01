import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { faFaceAngry } from '@fortawesome/free-regular-svg-icons';

export default function FeatureCard({ width, icon, title, desc, ...props }) {
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: width,
        ...props.sx,
        ':nth-of-type(3n)': {
          lg: { alignItems: 'flex-end' },
        },
        ':nth-of-type(3n-2)': {
          lg: { alignItems: 'flex-start' },
        },
        ':nth-of-type(3n-1)': {
          lg: { alignItems: 'center' },
        },
      }}
    >
      <Box
        sx={{
          //backgroundColor: 'primary.components', //primary.components2
          //height: 300,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          borderRadius: 4,
          width: { sm: 500, md: 425 },
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        {icon && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              width: '100%',
              marginBottom: 2,
              paddingX: 5,
            }}
          >
            {icon}
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            width: '100%',
            paddingX: 5,
          }}
        >
          <Typography variant='h5' color='text.special' component={'h3'}>
            {title}
          </Typography>
          <Typography
            color='text.secondary'
            variant='body2'
            component='p'
            sx={{ marginTop: 2, textAlign: 'left' }}
          >
            {desc}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
