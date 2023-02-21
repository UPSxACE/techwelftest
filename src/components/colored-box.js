import { Box } from '@mui/material';

export default function ColoredBox({ children, ...props }) {
  return (
    <Box {...props} sx={{ backgroundColor: 'primary.main', ...props.sx }}>
      {children}
    </Box>
  );
}
