import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import TNavBar from '@/components/tnavbar';
import { Box } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/system';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { t } = useTranslation();

  // Full Width NextJS Image
  const FwImage = styled(Image)((props) => {
    console.log(props.theme.breakpoints.up('md'));
    return {
      height: 'auto',
      objectFit: 'contain',
      width: '100%',
    };
  });

  return (
    <>
      <Head>
        <title>Techwelf Sample 1</title>
        <meta name='description' content='Techwelf sample' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <motion.div id='body'>
        <TNavBar />
        <Box component={motion.div} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Box
            component={motion.div}
            sx={{
              width: {
                xs: '100%',
                md: '50%',
              },
            }}
          >
            a
          </Box>
          <Box
            component={motion.div}
            sx={{
              width: {
                xs: '100%',
                md: '50%',
              },
            }}
          >
            <FwImage
              alt='Software Main Picture'
              src='/software-pic-1.jpg'
              width='0'
              height='0'
              sizes='100vw'
            />
          </Box>
        </Box>
      </motion.div>
    </>
  );
}
