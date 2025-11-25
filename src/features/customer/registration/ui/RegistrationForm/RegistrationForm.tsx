import { useEffect } from 'react';
import { Link } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client/react';
import {
  clearError,
  register as registerCustomer,
  selectAuthError,
  selectAuthLoading,
} from '@entities/customer';
import type { RegistrationFormData } from '@entities/customer/model/types';
import { schema } from '@features/customer/registration';
import { ROUTES } from '@shared/constants';
import {
  Button,
  TextField,
  PasswordField,
  TelephoneField,
  Alert,
} from '@shared/ui';
import { useAppDispatch } from '@shared/lib';
import styles from './RegistrationForm.module.scss';

export const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const apolloClient = useApolloClient();

  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: RegistrationFormData) => {
    const { passwordConfirm, ...registrationData } = formData;
    dispatch(
      registerCustomer({
        client: apolloClient,
        registrationData,
      })
    );
  };

  return (
    <form
      className={styles.registrationForm}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <fieldset className={styles.fieldset}>
        <div className={styles.fieldsetRow}>
          <TextField
            label='Fitst Name'
            error={errors?.firstname?.message}
            {...register('firstname')}
          />
          <TextField
            label='Last Name'
            error={errors?.lastname?.message}
            {...register('lastname')}
          />
        </div>
        <TextField
          label='Email'
          error={errors?.email?.message}
          type='email'
          placeholder='example@gmail.com'
          {...register('email')}
        />
        <Controller
          name='custom_attributes.phone_number'
          control={control}
          render={({ field }) => (
            <TelephoneField
              label='Phone number'
              error={errors?.custom_attributes?.phone_number?.message}
              placeholder='+44 1234 567890'
              mask='+44 0000 000000'
              {...field}
            />
          )}
        />
        <PasswordField
          label='Password'
          error={errors?.password?.message}
          {...register('password')}
        />
        <PasswordField
          label='Confirm Password'
          error={errors?.passwordConfirm?.message}
          onPaste={(e) => e.preventDefault()}
          {...register('passwordConfirm')}
        />
      </fieldset>
      {authError && <Alert type='error'>{authError}</Alert>}
      <div className={styles.formActions}>
        <Button variant='primary' loading={isSubmitting || loading}>
          {isSubmitting || loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </div>
      <div className={styles.formFooter}>
        Already have an account? <Link to={ROUTES.LOGIN}>Log In</Link>
      </div>
    </form>
  );
};
