import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

function CategoryList({ children }) {
  return (
    <ul
      style={{
        paddingLeft: 0,
        listStyle: 'none',
        margin: 0,
      }}
    >
      {children}
    </ul>
  );
}

function CategoryTitle({ children }) {
  return (
    <Typography
      color='text.primary'
      variant='h6'
      component='h1'
      fontWeight={600}
      mb={1.5}
    >
      {children}
    </Typography>
  );
}

function CategoryItem({ children }) {
  return (
    <Typography
      color='text.primary'
      variant='body2'
      component='li'
      sx={{ paddingY: 0.25 }}
    >
      {children}
    </Typography>
  );
}

export default function Info() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        //'& > div:not(:first-child):not(:last-child)': { flexGrow: 1 },
        //'& > div': { display: 'flex', flexDirection: 'column' },
        '& > div': { width: '25%' },
      }}
    >
      <Box>
        <Image
          alt='Techwelf logo'
          width={150}
          height={62}
          src='/logowhite.png'
        />
      </Box>
      <Box>
        <CategoryTitle>{t('Product')}</CategoryTitle>
        <CategoryList
          style={{
            paddingLeft: 0,
            listStyle: 'none',
            margin: 0,
          }}
        >
          <CategoryItem>{t('Home')}</CategoryItem>
          <CategoryItem>{t('FeaturesTab')}</CategoryItem>
          <CategoryItem>{t('Printscreens')}</CategoryItem>
        </CategoryList>
      </Box>
      <Box>
        <CategoryTitle>{t('Company')}</CategoryTitle>
        <CategoryList
          style={{
            paddingLeft: 0,
            listStyle: 'none',
            margin: 0,
          }}
        >
          <CategoryItem>Brigantia Ecopark</CategoryItem>
          <CategoryItem>Avenida Cidade de Léon, 506</CategoryItem>
          <CategoryItem>5300-253 Bragança</CategoryItem>
          <CategoryItem>Portugal</CategoryItem>
          <CategoryItem>geral@techwelf.com</CategoryItem>
          <CategoryItem>(+351) 918 153 028</CategoryItem>
        </CategoryList>
      </Box>
      <Box>
        <CategoryTitle>{t('Social Media')}</CategoryTitle>
        <CategoryList>
          <CategoryItem>Facebook</CategoryItem>
          <CategoryItem>Twitter</CategoryItem>
          <CategoryItem>Instagram</CategoryItem>
          <CategoryItem>LinkedIn</CategoryItem>
        </CategoryList>
      </Box>
    </Box>
  );
}
