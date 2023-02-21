import { Box, Typography } from '@mui/material';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export default function ScreenshotText({ title, desc }) {
  const { t } = useTranslation();

  return (
    <Box component={'div'} sx={{ scrollSnapAlign: 'start', height: '100%' }}>
      <Typography variant='h4' component='h2' sx={{ marginBottom: 2 }}>
        {title}
      </Typography>
      <Typography variant='body1' component='p' sx={{ marginBottom: 2 }}>
        {desc}
      </Typography>
    </Box>
  );
}
