import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-responsive-carousel';
import ScreenshotText from './screenshot-text';

export default function ScreenshotCarousel() {
  const { t } = useTranslation();

  return (
    <Carousel showStatus={false} autoPlay interval={3000} infiniteLoop>
      <ScreenshotText
        title={t('ScreenshotTitle1')}
        desc={t('ScreenshotDesc1')}
        imgPath={'/web1.jpg'}
      />
      <ScreenshotText
        title={t('ScreenshotTitle2')}
        desc={t('ScreenshotDesc2')}
        imgPath={'/web2.jpg'}
      />
      <ScreenshotText
        title={t('ScreenshotTitle3')}
        desc={t('ScreenshotDesc3')}
        imgPath={'/web3.jpg'}
      />
      <ScreenshotText
        title={t('ScreenshotTitle4')}
        desc={t('ScreenshotDesc4')}
        imgPath={'/web4.jpg'}
      />
    </Carousel>
  );
}
