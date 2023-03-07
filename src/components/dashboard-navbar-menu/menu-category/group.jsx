import { Box, Typography } from '@mui/material';

export default function Group({ title, children }) {
  return (
    <Box
      sx={{
        p: 1.5,
        ':not(:first-of-type)': {
          paddingTop: 0,
        },
      }}
    >
      <Typography color={'text.primary'} variant={'h6'} component='h1'>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
