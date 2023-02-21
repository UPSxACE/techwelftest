import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import TNavBar from '@/components/tnavbar';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/system';
import ColoredBox from '@/components/colored-box';
import FeatureCard from '@/components/feature-card';
import LockIcon from '@mui/icons-material/Lock';
import { Memory, OfflineBoltOutlined } from '@mui/icons-material';
import ScreenshotText from '@/components/screenshot-text';
import TFooter from '@/components/tfooter';

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

  // Full Height NextJS Image
  const FhImage = styled(Image)((props) => {
    console.log(props.theme.breakpoints.up('md'));
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
      <motion.div id='body'>
        <TNavBar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: {
              md: 'calc(100vh - 68px)',
            },
          }}
        >
          <Box
            component={motion.div}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              paddingY: 4,
              paddingX: 4,
              maxHeight: { md: '480px' },
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
              <Typography variant='h2' component='h1' sx={{ paddingBottom: 1 }}>
                {t('Product Name')}
              </Typography>
              <Typography variant='body1' sx={{ paddingBottom: 2 }}>
                {t('ProductDesc1')}
              </Typography>
              <Typography variant='body1'>{t('ProductDesc2')}</Typography>
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
        <ColoredBox component={motion.div} sx={{ paddingX: 4, paddingY: 6 }}>
          <Typography
            variant='body1'
            component={'p'}
            sx={{ textAlign: 'center' }}
          >
            {t('ProductDesc3')}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', paddingTop: 4 }}>
            <FeatureCard
              title={t('feature1')}
              desc={t('feature1desc')}
              width={{ xs: '100%', md: 'calc(100% / 3)' }}
              icon={<LockIcon sx={{ fontSize: 132 }} />}
              sx={{ marginBottom: { xs: 4, md: 0 } }}
            />
            <FeatureCard
              title={t('feature2')}
              desc={t('feature2desc')}
              width={{ xs: '100%', md: 'calc(100% / 3)' }}
              sx={{ marginBottom: { xs: 4, md: 0 } }}
              icon={<Memory sx={{ fontSize: 132 }} />}
            />
            <FeatureCard
              title={t('feature3')}
              desc={t('feature3desc')}
              width={{ xs: '100%', md: 'calc(100% / 3)' }}
              icon={<OfflineBoltOutlined sx={{ fontSize: 132 }} />}
            />
          </Box>
        </ColoredBox>
        <Box
          component={motion.div}
          sx={{ padding: 4, display: 'flex', flexWrap: 'wrap' }}
        >
          <Box
            sx={{
              display: 'flex',
              width: {
                xs: '100%',
                md: '35%',
              },
              paddingRight: { md: 4 },
              overflow: 'hidden',
              flexDirection: 'column',
              minHeight: 0,
              position: 'relative',
            }}
          >
            <Box
              component={motion.div}
              sx={{
                position: { md: 'absolute' },
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                overflow: 'scroll',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                '-ms-overflow-style': 'none',
                scrollbarWidth: 'none',
                overscrollBehaviorY: 'contain',
                scrollSnapType: 'y mandatory',
              }}
            >
              <ScreenshotText
                title={t('ScreenshotTitle1')}
                desc={t('ScreenshotDesc1')}
              />
              <ScreenshotText
                title={t('ScreenshotTitle2')}
                desc={t('ScreenshotDesc2')}
              />
              <ScreenshotText
                title={t('ScreenshotTitle3')}
                desc={t('ScreenshotDesc3')}
              />
              <ScreenshotText
                title={t('ScreenshotTitle4')}
                desc={t('ScreenshotDesc4')}
              />
            </Box>
          </Box>
          <Box sx={{ width: { xs: '100%', md: '65%' }, fontSize: 0 }}>
            <FwImage
              alt='App Screenshot'
              src='/web1.jpg'
              width='0'
              height='0'
              sizes='100vw'
            />
          </Box>
        </Box>
        <TFooter />
      </motion.div>
    </>
  );
}
