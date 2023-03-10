import BootstrapSingleInput from '@/components/bootstrap-form/bootstrap-single-input';
import ConfirmModal from '@/components/confirm-modal';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AdvancedSettings({ ipList }) {
  const { t } = useTranslation();
  const [confirmModal, setConfirmModal] = useState(false);
  const [ipToDelete, setIpToDelete] = useState('');

  function deleteIp(ip) {
    // send request to delete IP
    // Debug:
    console.log('IP ' + ipToDelete + ' deleted!');
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', padding: 4 }}>
      <ConfirmModal
        state={{ open: confirmModal, setOpen: setConfirmModal }}
        onConfirm={() => {
          deleteIp(ipToDelete);
        }}
      />
      <List>
        <ListItem sx={{ bgcolor: '#f0f0f0' }} disablePadding disableRipple>
          <ListItemButton
            disableRipple
            sx={{
              borderBottom: '1px solid #0000001f',
              cursor: 'default',
            }}
          >
            <ListItemText primary={t('allowed_ips')} />
            <ListItemIcon>
              <AddCircleOutline
                sx={{ marginLeft: 'auto', cursor: 'pointer' }}
                color='success'
                onClick={() => {
                  console.log('SUCCESS');
                }}
              />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderBottom: '1px solid #0000001f',
              cursor: 'default',
            }}
          >
            <ListItemText primary='127.0.0.1' />
            <ListItemIcon>
              <RemoveCircleOutline
                sx={{ marginLeft: 'auto', cursor: 'pointer' }}
                color='error'
                onClick={() => {
                  setIpToDelete('12000');
                  setConfirmModal(true);
                }}
              />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
