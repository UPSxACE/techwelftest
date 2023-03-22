import { removeAccessToken } from '@/api';
import { useRouter } from 'next/router';

export default function useHandle403() {
  const router = useRouter();

  return () => {
    removeAccessToken();
    router.push('/login');
  };
}
