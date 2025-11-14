import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useApolloClient } from "@apollo/client/react";
import { clearError, register as registerCustomer, selectAuthError, selectAuthLoading } from "@entities/customer";
import { ROUTES } from "@shared/constants";
import { Button, FormInput, PasswordInput } from "@shared/ui";
import styles from "./RegistrationForm.module.scss";
import { useEffect } from "react";

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();

  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(clearError())
  }, [])

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    mode: 'onChange'
  });

  const email = watch('email');
  const password = watch('password');

  const onSubmit = (formData) => {
    const { passwordConfirm, ...registrationData } = formData;
    dispatch(registerCustomer({
      client: apolloClient,
      registrationData
    }));
  }

  return (
    <form className={styles.registrationForm} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <div className={styles.fieldsRow}>
          <FormInput
            label="Fitst Name"
            className={styles.inputField}
            error={errors.firstname}
            {...register('firstname', {
              required: 'This field is required'
            })}
          />
          <FormInput
            label="Last Name"
            className={styles.inputField}
            error={errors.lastname}
            {...register('lastname', {
              required: 'This field is required'
            })}
          />
        </div>
        <FormInput
          type="email"
          label="Email"
          placeholder="example@gmail.com"
          className={styles.inputField}
          error={errors.email}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            }
          })}
        />
        <FormInput
          label="Phone number"
          placeholder="(123) 456-7890"
          className={styles.inputField}
          error={errors.custom_attributes?.phone_number}
          {...register('custom_attributes[phone_number]', {
            required: 'This field is required'
          })}
        />
        <PasswordInput
          label="Password"
          className={styles.inputField}
          error={errors.password}
          {...register('password', {
            required: 'This field is required',
            validate: {
              minLength: (value) =>
                value.length >= 8 || 'Password must be at least 8 characters',
              hasUpperCase: (value) =>
                /[A-ZА-ЯЁ]/.test(value) || 'Password must have at least one uppercase letter',
              hasLowerCase: (value) =>
                /[a-zа-яё]/.test(value) || 'Password must have at least one lowercase letter',
              hasNumber: (value) =>
                /\d/.test(value) || 'Password must have at least one number',
              hasSpecialChar: (value) =>
                /[!@#$%^&*.,]/.test(value) || 'Password must have at least one special character',
              isPasswordSameAsEmail: (value) =>
                value.toLowerCase() !== email.toLowerCase() || "The password can't be the same as the email address."
            },
          })}
        />
        <PasswordInput
          label="Confirm Password"
          className={styles.inputField}
          error={errors.passwordConfirm}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) => value === password || 'Passwords do not match'
          })}
        />
      </fieldset>
      {authError && (
        <p>{authError}</p>
      )}
      <div className={styles.formActions}>
        <Button variant="primary" loading={isSubmitting || loading}>
          {isSubmitting || loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </div>
      <div className={styles.formFooter}>
        Already have an account? <Link to={ROUTES.LOGIN}>Log In</Link>
      </div>
    </form>
  )
}
