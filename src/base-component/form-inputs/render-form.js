import { FormAvatar, FormControlledInput, FormDate, FormInput, FormRadioGroup, FormSelect, FormTextarea } from '.';

// Note: Until commit a9b9c8d, there's a README.md for this form-inputs components library
// Checkout there to see if needed
const renderForm = (formConfig, index, ref) => {
  const { type } = formConfig;

  let InputComponent;

  switch (type) {
    case 'date':
      InputComponent = FormDate;
      break;
    case 'radio':
      InputComponent = FormRadioGroup;
      break;
    case 'select':
      InputComponent = FormSelect;
      break;
    case 'textarea':
      InputComponent = FormTextarea;
      break;
    case 'avatar':
      InputComponent = FormAvatar;
      break;
    case 'controlled-input':
      InputComponent = FormControlledInput;
      break;
    default:
      InputComponent = FormInput;
  }

  return <InputComponent key={index} ref={ref} formConfig={formConfig} />;
};

export default renderForm;
