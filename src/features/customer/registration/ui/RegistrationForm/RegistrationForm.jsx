import { useEffect } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useApolloClient } from "@apollo/client/react";
import { clearError, register as registerCustomer, selectAuthError, selectAuthLoading } from "@entities/customer";
import { ROUTES } from "@shared/constants";
import { Button, FormInput, PasswordInput } from "@shared/ui";
import { schema } from "@features/customer/registration";
import styles from "./RegistrationForm.module.scss";

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();

  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(clearError())
  }, [])

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
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
            {...register('firstname')}
          />
          <FormInput
            label="Last Name"
            className={styles.inputField}
            error={errors.lastname}
            {...register('lastname')}
          />
        </div>
        <FormInput
          type="email"
          label="Email"
          placeholder="example@gmail.com"
          className={styles.inputField}
          error={errors.email}
          {...register('email')}
        />
        <FormInput
          label="Phone number"
          placeholder="(123) 456-7890"
          className={styles.inputField}
          error={errors.custom_attributes?.phone_number}
          {...register('custom_attributes[phone_number]')}
        />
        <PasswordInput
          label="Password"
          className={styles.inputField}
          error={errors.password}
          {...register('password')}
        />
        <PasswordInput
          label="Confirm Password"
          className={styles.inputField}
          error={errors.passwordConfirm}
          {...register('passwordConfirm')}
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
