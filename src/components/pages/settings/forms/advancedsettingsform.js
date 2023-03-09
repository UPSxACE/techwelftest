import BootstrapSingleInput from '@/components/bootstrap-form/bootstrap-single-input';

export default function AdvancedSettingsForm() {
  return (
    <BootstrapSingleInput
      text={'.ok1st.com'}
      field={'domain'}
      label={'Domain'}
    />
  );
}
