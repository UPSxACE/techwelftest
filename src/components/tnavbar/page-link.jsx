import { Typography } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';

export default function PageLink({ route, pageName, ...props }) {
  const { t } = useTranslation();

  return (
    <Link
      href={route}
      noWrap
      sx={{ mr: 2, color: 'black', textDecoration: 'none' }}
      {...props}
    >
      <Typography variant='body1' component='span'>
        {t(pageName)}
      </Typography>
    </Link>
  );
}
