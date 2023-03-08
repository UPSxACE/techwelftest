import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export default function Part({ title, id, switchState, grey }) {
  const { currentAccordion, setAccordion } = switchState;
  const handleChange = (panel) => {
    return (event, isExpanded) => {
      setAccordion(isExpanded ? panel : false);
    };
  };

  return (
    <Accordion
      expanded={currentAccordion === id}
      onChange={handleChange(id)}
      sx={{
        color: 'black',
        backgroundColor: grey ? '#f2f2f2' : 'transparent',
        borderTop: 0,
        borderBottom: 0,
        margin: '0!important',
        boxShadow: 'none',
        borderBottom: '1px solid #0000001f',
        '&:before': {
          opacity: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={id + 'bh-content'}
        id={id + 'bh-header'}
      >
        <Typography
          variant='h6'
          component={'h2'}
          sx={{ fontWeight: 400 }}
          color='text.secondary'
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ borderTop: 1, borderColor: '#0000001f' }}>
        asfasfaspigjapsogpaoskgpoasgkpsgao
      </AccordionDetails>
    </Accordion>
  );
}
