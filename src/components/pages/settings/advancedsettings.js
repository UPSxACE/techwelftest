import BootstrapSingleInput from '@/components/bootstrap-form/bootstrap-single-input';
import ConfirmModal from '@/components/confirm-modal';
import LoaderPrimary from '@/components/loader-primary';
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
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NewIpFormModal from './forms/newipformmodal';

export default function AdvancedSettings({ ipState }) {
  const { t } = useTranslation();
  const [confirmModal, setConfirmModal] = useState(false);
  const [ipToDelete, setIpToDelete] = useState('');
  const { ipList, setIpList } = ipState;

  // New Ip Form
  const [open, setOpen] = useState(false);
  const [closeable, setCloseable] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function deleteIp(ip) {
    // send request to delete IP
    // Debug: console.log('IP ' + ipToDelete + ' will be deleted!');

    setIpList((ipList) => {
      const ipToDelete = ipList.indexOf(ip);
      if (ipToDelete !== -1) {
        const newIpList = [...ipList];
        newIpList.splice(ipToDelete, 1);
        return newIpList;
      }
    });
  }

  function addIp(ip) {
    setIpList((ipList) => [...ipList, ip]);
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', padding: '50px' }}>
      <NewIpFormModal
        open={open}
        handleClose={handleClose}
        closeable={closeable}
        setCloseable={setCloseable}
        addIp={addIp}
      />
      <ConfirmModal
        state={{ open: confirmModal, setOpen: setConfirmModal }}
        onConfirm={() => {
          deleteIp(ipToDelete);
        }}
      />
      <List>
        <ListItem sx={{ bgcolor: '#f0f0f0' }} disablePadding>
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
                  handleOpen();
                }}
              />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {ipList === null && (
          <ListItem
            sx={{ display: 'flex', justifyContent: 'center' }}
            disablePadding
          >
            <ListItemButton
              sx={{
                borderBottom: '1px solid #0000001f',
                cursor: 'default',
                display: 'flex',
                justifyContent: 'center',
                paddingY: 1,
              }}
            >
              <LoaderPrimary size={30} />
            </ListItemButton>
          </ListItem>
        )}
        {ipList !== null &&
          ipList.map((ip, index) => {
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  sx={{
                    borderBottom: '1px solid #0000001f',
                    cursor: 'default',
                  }}
                >
                  <ListItemText primary={ip} />
                  <ListItemIcon>
                    <RemoveCircleOutline
                      sx={{ marginLeft: 'auto', cursor: 'pointer' }}
                      color='error'
                      onClick={() => {
                        setIpToDelete(ip); // add decent logic here
                        setConfirmModal(true);
                      }}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
}
