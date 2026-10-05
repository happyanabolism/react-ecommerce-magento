import { Link } from 'react-router';
import { useForm /*, Controller */ } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  schema,
  type RegistrationFormData,
} from '../../model/registration.schema';
import { ROUTES } from '@shared/constants';
import {
  Button,
  TextField,
  PasswordField,
  // TelephoneField,
  Alert,
} from '@shared/ui';
import styles from './RegistrationForm.module.scss';
import { getMagentoErrorMessage } from '@shared/utils';
import { useRegister } from '../../model/useRegister';

export const RegistrationForm = () => {
  const [createCustomer, { loading, error }] = useRegister();

  const {
    register,
    // control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: RegistrationFormData) => {
    createCustomer(formData);
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
        {/* TODO(customer-attributes): render custom attributes from attributesForm metadata
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
        */}
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
      {error && <Alert type='error'>{getMagentoErrorMessage(error)}</Alert>}
      <div className={styles.formActions}>
        <Button
          type='submit'
          variant='primary'
          loading={isSubmitting || loading}
        >
          {isSubmitting || loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </div>
      <div className={styles.formFooter}>
        Already have an account? <Link to={ROUTES.LOGIN}>Log In</Link>
      </div>
    </form>
  );
};
