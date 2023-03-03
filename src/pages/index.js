import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import TNavBar from '@/components/tnavbar';
import { Box, Button, Typography } from '@mui/material';
import ColoredBox from '@/components/colored-box';
import FeatureCard from '@/components/feature-card';
import TFooter from '@/components/tfooter';
import ScreenshotCarousel from '@/components/screenshot-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import appConfig from '@/app-config';
import themeConfig from '@/theme-config';
import MainLayout from '@/layouts/main-layout';
import Image from 'next/image';
import { styled } from '@mui/system';
import ScreenshotDiv from '@/components/screenshot-div';

const inter = Inter({ subsets: ['latin'] });

// Full Width NextJS Image
const FwImage = styled(Image)((props) => {
  return {
    //objectFit: 'cover',

    height: 'auto',
    width: '100%',
    /*[props.theme.breakpoints.up('md')]: {
      width: '50%',
      paddingRight: 20,
    },*/

    //boxShadow: '2px 2px 5px grey',
  };
});

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Techwelf Sample 1</title>
        <meta name='description' content='Techwelf sample' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* Landing */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          height: 'calc(100vh)',
          backgroundColor: 'primary.background1',
          background: `linear-gradient(${themeConfig.palette.primary.gradientAngle}deg, ${themeConfig.palette.primary.special1} 0%, ${themeConfig.palette.primary.special2} 100%)`,
        }}
      >
        <Box
          sx={{
            top: 0,
            left: 0,
            width: '100vw',
            maxWidth: '100%',
            height: '100vh',
            position: 'absolute',
            backgroundImage: `url(${appConfig.backgroundImage.src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 0.1,
          }}
        ></Box>
        <Box
          component={motion.div}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            paddingY: 4,
            paddingX: 4,
            maxWidth: { md: '1200px' },
            zIndex: 1,
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
              color='text.primary'
              variant='h2'
              component='h1'
              sx={{ paddingBottom: 1 }}
              dangerouslySetInnerHTML={{
                __html: t('ProductName', {
                  interpolation: { escapeValue: false },
                }),
              }}
            ></Typography>
            <Typography
              color='text.primary'
              variant='body1'
              sx={{ paddingBottom: 2 }}
            >
              {t('ProductDesc1')}
            </Typography>
            <Box sx={{ paddingTop: 4 /* marginTop:"auto" */ }}>
              <Button
                variant='outlined'
                sx={{
                  width: 'fit-content',
                  paddingX: 4,
                  paddingY: 1.5,
                  //backgroundColor: 'white',
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.special3',
                    borderColor: 'primary.special3',
                  },
                  /*
                  backgroundColor: 'primary.special3',
                  borderColor: 'primary.special3',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    borderColor: 'white',
                  },*/
                }}
                //variant='contained'
                href={appConfig.mainButtonTarget}
              >
                Click Me
              </Button>
            </Box>
          </Box>
          {/*<Box
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
            </Box>*/}
        </Box>
      </Box>
      {/* Screenshots / Product Presentation */}
      <a style={{ position: 'relative', top: -67 }} id='product' />
      {appConfig.screenshotsMode === 'scroll' && (
        <Box
          component={motion.div}
          sx={{
            paddingX: 4,
            paddingY: { xs: 5, sm: 6, md: 9, lg: 12 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            minHeight: 'calc(100vh)',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              color='text.secondary'
              variant='h4'
              component={'h2'}
              sx={{ textAlign: 'center', fontWeight: 500 }}
              mb={3}
            >
              {t('made_easier')}
            </Typography>
            <Typography
              color='text.secondary'
              variant='h6'
              component={'p'}
              sx={{
                textAlign: 'center',
                fontWeight: 500,
                mb: { xs: 5, sm: 6, md: 9, lg: 12 },
                maxWidth: 1200,
              }}
            >
              {t('ProductDesc3')}
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {appConfig.screenshots.map((screenshot, index) => {
              return (
                <ScreenshotDiv
                  key={index}
                  title={screenshot.title}
                  desc={screenshot.desc}
                  imgPath={screenshot.imgPath}
                  reverse={index % 2 !== 0}
                />
              );
            })}
          </Box>
        </Box>
      )}
      {/* WGYB */}
      {appConfig.wgyb && (
        <ColoredBox
          sx={{
            paddingX: 4,
            paddingY: { xs: 5, sm: 6, md: 9, lg: 12 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'primary.special2',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 1200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              color={'text.primary'}
              variant='h4'
              component='h2'
              mb={2}
            >
              {t('wgyb1')}
            </Typography>
            <Typography
              color={'text.primary'}
              variant='h5'
              component='p'
              textAlign={'center'}
            >
              {t('wgyb2')}
            </Typography>
          </Box>
        </ColoredBox>
      )}
      {/* Features */}
      <a style={{ position: 'relative', top: -67 }} id='features' />
      <Box
        component={motion.div}
        sx={{
          paddingX: 4,
          paddingY: 9,
          display: 'flex',
          justifyContent: 'center',
          minHeight: 'calc(100vh)',
          alignItems: 'center',
        }}
      >
        <Box sx={{ maxWidth: 1200 }}>
          <Typography
            color='text.secondary'
            variant='h6'
            component={'p'}
            sx={{ textAlign: 'center', fontWeight: 500 }}
          >
            {t('FeaturesText')}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', paddingTop: 4 }}>
            {appConfig.features.map((feature) => {
              return (
                <FeatureCard
                  key={feature.name}
                  title={t(feature.name)}
                  desc={t(feature.desc)}
                  width={{
                    xs: '100%',
                    md: 'calc(100% / 2)',
                    lg: 'calc(100% / 3)',
                  }}
                  icon={
                    <Typography
                      variant='inherit'
                      sx={{ color: 'text.special', fontSize: '40px' }}
                    >
                      <FontAwesomeIcon icon={feature.icon} />
                    </Typography>
                  }
                  sx={{
                    marginBottom: { xs: 4, md: 0 },
                    display: { xs: 'flex', md: 'block' },
                    alignItems: { xs: 'center' },
                    paddingX: { xs: 1, sm: 2, md: 5 },
                    ':nth-of-type(3n)': {
                      lg: { alignItems: 'flex-end' },
                    },
                    ':nth-of-type(3n-2)': {
                      lg: { alignItems: 'flex-start' },
                    },
                    ':nth-of-type(3n-1)': {
                      lg: { alignItems: 'center' },
                    },
                  }}
                  containerStyle={{}}
                />
              );
            })}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <FwImage src='/pc.png' height={0} width={600} />
            </Box>
            {/* PC Section */}
            {appConfig.userAccess && (
              <Box
                sx={{
                  width: {
                    xs: '100%',
                    md: '50%',
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: { xs: 'flex-start', md: 'center' },
                  pt: { xs: 9, md: 0 },
                }}
              >
                <Typography
                  color='text.secondary'
                  variant='h4'
                  component={'h3'}
                  sx={{ textAlign: 'center', fontWeight: 500, mb: 2 }}
                >
                  {t('IndexPcTitle')}
                </Typography>
                <Typography
                  color='text.secondary'
                  variant='body1'
                  component={'p'}
                  sx={{ textAlign: 'center', mb: 2 }}
                >
                  {t('IndexPcText')}
                </Typography>
                <Box
                  sx={{ display: 'flex', justifyContent: 'center', mt: 0.75 }}
                >
                  <Button
                    variant='contained'
                    sx={{
                      width: 'fit-content',
                      paddingX: 4,
                      paddingY: 1.5,
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.special3',
                        borderColor: 'primary.special3',
                      },
                    }}
                    href={appConfig.pcButtonTarget}
                  >
                    {t('IndexPcButton')}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {appConfig.screenshotsMode === 'carousel' && (
        <Box
          component={motion.div}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            height: { md: 'calc(100vh - 68px)' },
            scrollSnapAlign: { md: 'start' },
            backgroundColor: 'grey',
            width: '100vw',
            maxWidth: '100%',
            '& .slider-wrapper': {
              width: '100vw',
              maxWidth: '100%',
              height: 'calc(100vh - 68px)',
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
              top: { xs: '0%', md: '50%!important' },
              bottom: { md: '50%!important' },
              backgroundColor: 'rgba(0,0,0,0.5)!important',
              width: '50px',
              backgroundColor:
                themeConfig.palette.primary.special + '!important',
            },

            '& .control-prev': {
              paddingRight: '8px!important',
            },
            '& .control-next': {
              paddingLeft: '8px!important',
            },
            '& .control-prev:hover': {
              backgroundColor:
                themeConfig.palette.primary.special + '!important',
            },
            '& .control-next:hover': {
              backgroundColor:
                themeConfig.palette.primary.special + '!important',
            },
            '& .dot.selected': {
              backgroundColor:
                themeConfig.palette.primary.special + '!important',
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100vw',
              maxWidth: '100%',
              height: 'calc(100vh - 68px)',
              maxWidth: '100%',
              fontSize: 0,
            }}
          >
            <a style={{ position: 'relative', top: -67 }} id='screenshots' />
            <ScreenshotCarousel />
          </Box>
        </Box>
      )}
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <MainLayout transparentBar>{page}</MainLayout>;
};
