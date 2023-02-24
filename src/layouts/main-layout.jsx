import TFooter from '@/components/tfooter';
import TNavBar from '@/components/tnavbar';
import { motion } from 'framer-motion';

export default function MainLayout({ children }) {
  return (
    <>
      <TNavBar />
      <a style={{ position: 'relative', top: -67 }} id='page-start' />
      <motion.div
        id='body'
        style={{
          marginTop: '-68px',
          overscrollBehaviorY: 'contain',
          //overflowY: 'auto',
          width: '100vw',
          maxWidth: '100%',
        }}
      >
        {children}
        <TFooter />
      </motion.div>
    </>
  );
}
