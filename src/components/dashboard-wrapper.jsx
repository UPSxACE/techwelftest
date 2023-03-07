import { Box } from '@mui/material';

export default function DashboardWrapper({ children }) {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 0,
          backgroundColor: 'primary.components4',
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Box sx={{ px: 4, pt: 1.5, pb: 4 }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
