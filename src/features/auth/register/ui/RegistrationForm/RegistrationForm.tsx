import { useId } from 'react';
import { Link } from 'react-router';
import { useForm /*, Controller */ } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  schema,
  type RegistrationFormData,
} from '../../model/registration.schema';
import { ROUTES } from '@shared/config';
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
  // TelephoneField,
} from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/api';
import { useRegister } from '../../model/useRegister';

export const RegistrationForm = () => {
  const formId = useId();
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
  const pending = isSubmitting || loading;

  const onSubmit = (formData: RegistrationFormData) => {
    createCustomer(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className='text-xl'>Sign Up</h1>
        </CardTitle>
        <CardDescription>
          Enter your details below to create an account
        </CardDescription>
        <CardAction>
          <Button variant='link' asChild>
            <Link to={ROUTES.LOGIN}>Log In</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id={formId} onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <div className='grid gap-5 sm:grid-cols-2 sm:gap-4'>
              <TextField
                label='First Name'
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
              type='email'
              placeholder='example@gmail.com'
              error={errors?.email?.message}
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
          {pending ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </CardFooter>
    </Card>
  );
};
