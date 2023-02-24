import TFooter from '@/components/tfooter';
import TNavBar from '@/components/tnavbar';
import { motion } from 'framer-motion';

export default function MainLayout({ transparentBar = false, children }) {
  return (
    <>
      {transparentBar ? (
        <TNavBar key={0} transparentBar={true} />
      ) : (
        <TNavBar key={1} />
      )}
      <a style={{ position: 'relative', top: -67 }} id='page-start' />
      <motion.div
        id='body'
        style={{
          marginTop: transparentBar ? '-68px' : 0,
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
