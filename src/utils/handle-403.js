import { removeAccessToken } from '@/api';
import { isCancel } from 'axios';
import { useRouter } from 'next/router';

export default function useHandle403() {
  const router = useRouter();

  return (err, throwBool) => {
    if (err?.response?.status === 403) {
      removeAccessToken();
      router.push('/login');
    } else {
      if (throwBool && !isCancel(err)) throw err;
    }
  };
}
