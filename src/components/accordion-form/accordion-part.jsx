import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export default function Part({ title, id, switchState }) {
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
        backgroundColor: '#f2f2f2',
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
      <AccordionDetails
        sx={{ borderTop: 1, borderColor: 'primary.darkBorder' }}
      >
        asfasfaspigjapsogpaoskgpoasgkpsgao
      </AccordionDetails>
    </Accordion>
  );
}
