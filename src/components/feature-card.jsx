import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function FeatureCard({ width, icon, title, desc, ...props }) {
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: width,
        ...props.sx,
      }}
    >
      {icon && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginBottom: 2,
          }}
        >
          {icon}
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          paddingX: 5,
        }}
      >
        <Typography variant='h5' color='text.primary' component={'h3'}>
          {title}
        </Typography>
        <Typography
          color='text.primary'
          variant='body2'
          component='p'
          sx={{ marginTop: 2, textAlign: 'center' }}
        >
          {desc}
        </Typography>
      </Box>
    </Box>
  );
}
