import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function Item({ title, route = '#', faIcon, children }) {
  return (
    <Link style={{ textDecoration: 'none' }} href={route}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: 1,
          pl: 1,
          opacity: 0.85,
          '&:hover': {
            opacity: 1,
            cursor: 'pointer',
          },
        }}
      >
        <Typography
          sx={{ width: 20, display: 'flex', justifyContent: 'center' }}
          color={'text.primary'}
          variant={'h6'}
          component='i'
        >
          <FontAwesomeIcon icon={faIcon} />
        </Typography>

        <Typography
          color={'text.primary'}
          variant={'body1'}
          component='h2'
          ml={1}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Link>
  );
}
