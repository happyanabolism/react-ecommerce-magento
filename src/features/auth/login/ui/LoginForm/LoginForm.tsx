import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Spinner,
  TextField,
  PasswordField,
  Alert,
  AlertDescription,
} from '@shared/ui';
import { ROUTES } from '@shared/config';
import { getMagentoErrorMessage } from '@shared/api';
import { schema, type LoginFormData } from '../../model/login.schema';
import { useLogin } from '../../model/useLogin';
import styles from './LoginForm.module.scss';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const [login, { loading, error }] = useLogin();

  const onSubmit = (formData: LoginFormData) => {
    login(formData);
  };

  return (
    <form
      className={styles.loginForm}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <fieldset className={styles.fieldset}>
        <TextField
          label='Email'
          error={errors?.email?.message}
          placeholder='example@gmail.com'
          {...register('email')}
        />
        <PasswordField
          label='Password'
          error={errors?.password?.message}
          {...register('password')}
        />
      </fieldset>
      {error && (
        <Alert variant='destructive'>
          <AlertDescription>{getMagentoErrorMessage(error)}</AlertDescription>
        </Alert>
      )}
      <div className={styles.formActions}>
        <Button type='submit' disabled={isSubmitting || loading}>
          {(isSubmitting || loading) && <Spinner />}
          {isSubmitting || loading ? 'Logging In...' : 'Log In'}
        </Button>
        <Link to={'#'}>Forgot password?</Link>
      </div>
      <div className={styles.formFooter}>
        Don't have an account? <Link to={ROUTES.REGISTRATION}>Sign Up</Link>
      </div>
    </form>
  );
}
