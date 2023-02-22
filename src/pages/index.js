import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import TNavBar from '@/components/tnavbar';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/system';
import ColoredBox from '@/components/colored-box';
import FeatureCard from '@/components/feature-card';
import LockIcon from '@mui/icons-material/Lock';
import { Memory, OfflineBoltOutlined } from '@mui/icons-material';
import TFooter from '@/components/tfooter';
import { useRef } from 'react';
import ScreenshotCarousel from '@/components/screenshot-carousel';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { t } = useTranslation();
  const featuresMainText = useRef();
  const { scrollYProgress, scrollY } = useScroll({
    target: featuresMainText,
    offset: ['start end', 'end end'],
  });

  console.log(scrollY);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    console.log('a', latest);
  });

  // Full Height NextJS Image
  const FhImage = styled(Image)((props) => {
    return {
      height: 'auto',
      objectFit: 'cover',
      width: '100%',
      height: '100%',
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
      <motion.div
        id='body'
        style={{
          height: '100vh',
          overscrollBehaviorY: 'contain',
          scrollSnapType: 'y mandatory',
          overflowY: 'auto',
          width: '100vw',
          maxWidth: '100%',
        }}
      >
        <TNavBar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: {
              md: 'calc(100vh - 68px)',
            },

            scrollSnapAlign: 'end',
          }}
        >
          <Box
            component={motion.div}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              paddingY: 4,
              paddingX: 4,
              maxWidth: { md: '1200px' },
            }}
          >
            <Box
              component={motion.div}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: {
                  xs: '100%',
                  md: '50%',
                },
                paddingRight: 4,
                marginBottom: { xs: 4, md: 0 },
                justifyContent: 'space-between',
              }}
            >
              <Typography
                color='text.secondary'
                variant='h2'
                component='h1'
                sx={{ paddingBottom: 1 }}
              >
                {t('Product Name')}
              </Typography>
              <Typography
                color='text.secondary'
                variant='body1'
                sx={{ paddingBottom: 2 }}
              >
                {t('ProductDesc1')}
              </Typography>
              <Typography color='text.secondary' variant='body1'>
                {t('ProductDesc2')}
              </Typography>
              <Box sx={{ paddingTop: 4 /* marginTop:"auto" */ }}>
                <Button
                  sx={{
                    width: 'fit-content',
                    paddingX: 4,
                    paddingY: 1.5,
                  }}
                  variant='contained'
                >
                  Click Me
                </Button>
              </Box>
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
              <FhImage
                alt='Software Main Picture'
                src='/software-pic-1.jpg'
                width='0'
                height='0'
                sizes='100vw'
              />
            </Box>
          </Box>
        </Box>
        <ColoredBox
          component={motion.div}
          sx={{
            paddingX: 4,
            paddingY: 6,
            scrollSnapAlign: 'end',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ maxWidth: 1200 }}>
            <Typography
              color='text.primary'
              variant='h6'
              component={'p'}
              sx={{ textAlign: 'center', fontWeight: 500 }}
            >
              {t('ProductDesc3')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', paddingTop: 4 }}>
              <FeatureCard
                title={t('feature1')}
                desc={t('feature1desc')}
                width={{ xs: '100%', md: 'calc(100% / 3)' }}
                icon={
                  <LockIcon sx={{ fontSize: 132, color: 'text.primary' }} />
                }
                sx={{ marginBottom: { xs: 4, md: 0 } }}
              />
              <FeatureCard
                title={t('feature2')}
                desc={t('feature2desc')}
                width={{ xs: '100%', md: 'calc(100% / 3)' }}
                sx={{ marginBottom: { xs: 4, md: 0 } }}
                icon={<Memory sx={{ fontSize: 132, color: 'text.primary' }} />}
              />
              <FeatureCard
                title={t('feature3')}
                desc={t('feature3desc')}
                width={{ xs: '100%', md: 'calc(100% / 3)' }}
                icon={
                  <OfflineBoltOutlined
                    sx={{ fontSize: 132, color: 'text.primary' }}
                  />
                }
              />
            </Box>
          </Box>
        </ColoredBox>
        <Box
          component={motion.div}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            height: { md: '100vh' },
            scrollSnapAlign: 'start',
            backgroundColor: 'grey',
            width: '100vw',
            maxWidth: '100%',
            '& .slider-wrapper': {
              width: '100vw',
              height: '100vh',
            },
            '& .control-dots': {
              bottom: '15px!important',
            },
            '& .control-arrow': {
              display: {
                xs: 'none',
                md: 'block',
              },
              height: '50px',
              top: '50%!important',
              bottom: '50%!important',
              backgroundColor: 'rgba(0,0,0,0.5)!important',
              width: '50px',
            },
            '& .control-prev': {
              paddingRight: '8px!important',
            },
            '& .control-next': {
              paddingLeft: '8px!important',
            },
          }}
          ref={featuresMainText}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100vw',
              height: '100vh',
              maxWidth: '100%',
              fontSize: 0,
            }}
          >
            <ScreenshotCarousel />
          </Box>
        </Box>
        <TFooter />
      </motion.div>
    </>
  );
}
