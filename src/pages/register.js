import MainLayout from '@/layouts/main-layout';
import { Box } from '@mui/material';
import { Inter } from '@next/font/google';
import { useTranslation } from 'react-i18next';

const inter = Inter({ subsets: ['latin'] });

export default function Register() {
  const { t } = useTranslation();

  return <Box>aaa</Box>;
}

Register.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
