import { useId } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FieldGroup,
  PasswordField,
  Spinner,
  TextField,
} from '@shared/ui';
import { ROUTES } from '@shared/config';
import { getMagentoErrorMessage } from '@shared/api';
import { schema, type LoginFormData } from '../../model/login.schema';
import { useLogin } from '../../model/useLogin';

export function LoginForm() {
  const formId = useId();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const [login, { loading, error }] = useLogin();
  const pending = isSubmitting || loading;

  const onSubmit = (formData: LoginFormData) => {
    login(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className='text-xl'>Log In</h1>
        </CardTitle>
        <CardDescription>
          Enter your email below to log in to your account
        </CardDescription>
        <CardAction>
          <Button variant='link' asChild>
            <Link to={ROUTES.REGISTRATION}>Sign Up</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id={formId} onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <TextField
              label='Email'
              type='email'
              placeholder='example@gmail.com'
              error={errors?.email?.message}
              {...register('email')}
            />
            <PasswordField
              label='Password'
              labelAction={
                <Link
                  to='#'
                  className='text-sm underline-offset-4 hover:underline'
                >
                  Forgot your password?
                </Link>
              }
              error={errors?.password?.message}
              {...register('password')}
            />
            {error && (
              <Alert variant='destructive'>
                <AlertDescription>
                  {getMagentoErrorMessage(error)}
                </AlertDescription>
              </Alert>
            )}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type='submit'
          form={formId}
          disabled={pending}
          className='w-full'
        >
          {pending && <Spinner />}
          {pending ? 'Logging In...' : 'Log In'}
        </Button>
      </CardFooter>
    </Card>
  );
}
