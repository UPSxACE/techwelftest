import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';

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

    boxShadow: '2px 2px 5px grey',
  };
});

export default function ScreenshotDiv({ title, desc, imgPath, reverse }) {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        maxWidth: 1200,
        flexWrap: 'wrap',
        '&:not(:first-child)': {
          marginTop: { xs: 5, sm: 6, md: 9, lg: 6 },
        },
        '&:not(:last-child)': {
          marginBottom: { xs: 5, sm: 6, md: 9, lg: 7 },
        },
        flexDirection: reverse ? 'row-reverse' : 'row',
      }}
    >
      <Box
        sx={{
          paddingLeft: { md: reverse ? 5 : 0 },
          paddingRight: { md: reverse ? 0 : 5 },
          width: { xs: '100%', md: '50%' },
          backgroundCOlor: 'black',
        }}
      >
        <FwImage
          alt='Screenshot from the product'
          height={0}
          width={900}
          src={imgPath}
        />
      </Box>
      <Box
        sx={{
          width: { sm: '100%', md: '50%' },
          paddingLeft: { md: reverse ? 0 : 5 },
          paddingRight: { md: reverse ? 5 : 0 },
        }}
      >
        <Typography variant='h3' component={'h2'} sx={{ paddingBottom: 1.5 }}>
          {title}
        </Typography>
        <Typography variant='body1' component={'p'}>
          {desc}
        </Typography>
      </Box>
    </Box>
  );
}
