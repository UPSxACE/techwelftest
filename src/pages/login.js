import MainLayout from '@/layouts/main-layout';
import { Box } from '@mui/material';
import { Inter } from '@next/font/google';
import { useTranslation } from 'react-i18next';

const inter = Inter({ subsets: ['latin'] });

export default function Login() {
  const { t } = useTranslation();

  return <Box>aaa</Box>;
}

Login.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
