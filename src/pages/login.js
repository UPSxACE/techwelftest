import OutlinedForm from '@/components/outlined-form';
import authenticationContext from '@/contexts/authentication-context';
import MainLayout from '@/layouts/main-layout';
import onlyGuest from '@/utils/onlyGuest';
import { Box, Typography } from '@mui/material';
import { Inter } from '@next/font/google';
import axios from 'axios';
import Joi from 'joi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';

const inter = Inter({ subsets: ['latin'] });

function Login() {
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();
  const router = useRouter();
  const { auth, setAuth } = useContext(authenticationContext);

  const validators = {
    username: Joi.string(),
    password: Joi.string(),
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 68px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: 2, sm: 8, md: 14 },
      }}
    >
      <OutlinedForm.Form formDataState={{ formData, setFormData }}>
        <OutlinedForm.Header>
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{ textAlign: 'center', mb: 2 }}
              variant='h3'
              component='h1'
            >
              {t('Login')}
            </Typography>
            <Box>
              <Typography variant='body1'>{t('login_with_account')}</Typography>
            </Box>
          </Box>
        </OutlinedForm.Header>

        <OutlinedForm.Control required label={t('Username')} field='username'>
          <OutlinedForm.Label />
          <OutlinedForm.Input JOIValidator={validators.username} />
          <OutlinedForm.HelperText />
        </OutlinedForm.Control>

        <OutlinedForm.Control required label={t('password')} field='password'>
          <OutlinedForm.Label />
          <OutlinedForm.Input
            JOIValidator={validators.password}
            tooltip={{
              tip: t('tooltip_tip_password'),
              example: 'VerySafeP4ssw0rd##',
            }}
            inputProps={{ type: 'password' }}
          />
          <OutlinedForm.HelperText />
          <Box sx={{ display: 'flex' }}></Box>
        </OutlinedForm.Control>

        <OutlinedForm.Submit
          title='submit'
          validators={validators}
          onSubmit={async (formData) => {
            // Test endpoint
            await axios.post('http://localhost:9000/test/formdata', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            setAuth({ ...auth, authenticated: true });
            //router.push('/');
          }}
          onError={async (error, setStatus) => {
            setStatus(error);
          }}
        />

        <OutlinedForm.Footer>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
            <Link
              className='noPurple'
              href='/register'
              style={{
                textDecoration: 'none',
                paddingRight: 12,
              }}
            >
              <Typography
                sx={{ color: 'primary.links' }}
                component='span'
                variant='body1'
              >
                {t('no_account_yet')}
              </Typography>
            </Link>

            <Link
              href='/register'
              className='noPurple'
              style={{
                textDecoration: 'none',
                marginLeft: 'auto',
                paddingLeft: 12,
              }}
            >
              <Typography
                sx={{ color: 'primary.links' }}
                component='span'
                variant='body1'
              >
                {t('forgot_password')}
              </Typography>
            </Link>
          </Box>
        </OutlinedForm.Footer>
      </OutlinedForm.Form>
    </Box>
  );
}

Login.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default onlyGuest(Login);
