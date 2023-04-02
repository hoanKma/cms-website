import { memo, useEffect, useRef } from 'react';

import { Button, VStack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { renderForm } from 'base-component/form-inputs';
import useFormConfig from './sub/form-configs';
import useLogin from './sub/login-hook';

/**
 * Login input and buttons.
 * The main component & logic for all login shit
 * exported by the top level login-logout.
 */
const LoginForm = memo(() => {
  const methods = useForm();
  const navigate = useNavigate();

  const longin = useLogin(navigate, methods.setError);

  // Currently, methods.formState.isSubmitting does NOT work, as login is NOT async.
  // If needed, use mutateAsync throughout in useLogin().
  // https://github.com/react-hook-form/react-hook-form/issues/1363#issuecomment-610681167
  const formConfigs = useFormConfig(longin.isLoading);

  const firstFocusRef = useRef();
  useEffect(() => firstFocusRef.current?.focus(), []);

  return (
    <>
      <FormProvider {...methods}>
        <form id="login-form" onSubmit={methods.handleSubmit(longin.mutate)}>
          <VStack spacing={5} mb={{ xs: 10, xl: 5, '2xl': 10 }}>
            {formConfigs.map((formConfig, idx) => renderForm(formConfig, idx, idx === 0 ? firstFocusRef : undefined))}
          </VStack>
        </form>
      </FormProvider>

      <VStack spacing={5}>
        <Button
          type="submit"
          form="login-form"
          bg={'#F7941E'}
          color="#fff"
          variant="solidPrimary"
          h={{ xs: 10, '2xl': 12 }}
          alignSelf="stretch"
          fontSize="xl"
          isLoading={longin.isLoading}
          loadingText="Đang đăng nhập"
        >
          Đăng nhập
        </Button>
      </VStack>
    </>
  );
});

export default LoginForm;
