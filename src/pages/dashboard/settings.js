import DashboardWrapper from '@/components/dashboard-wrapper';
import CompanySettings from '@/components/pages/settings/company-settings';
import DashboardLayout from '@/layouts/dashboard-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Settings() {
  return (
    <DashboardWrapper notAligned>
      <CompanySettings />
    </DashboardWrapper>
  );
}

Settings.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

//export default withAuth(Settings);

export async function getStaticProps({ locale }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
