import { Box } from '@mui/material';

export default function ColoredBox({ children, ...props }) {
  return (
    <Box
      {...props}
      sx={{ backgroundColor: 'primary.components2', ...props.sx }}
    >
      {children}
    </Box>
  );
}
