import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ColoredBox from '../colored-box';

const currentYear = new Date().getFullYear();

export default function TFooter() {
  return (
    <ColoredBox
      component={motion.div}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        paddingX: 4,
        paddingY: 2,
        scrollSnapAlign: { md: 'end' },
        backgroundColor: 'primary.components',
      }}
    >
      <Typography color='text.primary' variant='body2' component='span'>
        © TechWelf {currentYear}. Todos os Direitos Reservados
      </Typography>
      <Box sx={{ marginLeft: 'auto' }}>
        <Typography color='text.primary' variant='body2' component='span'>
          Logos
        </Typography>
      </Box>
    </ColoredBox>
  );
}
