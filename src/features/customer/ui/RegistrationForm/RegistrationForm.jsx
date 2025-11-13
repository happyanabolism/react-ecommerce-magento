import { Button, FormInput, PasswordInput } from "@shared/ui";
import styles from "./RegistrationForm.module.scss";
import { Link } from "react-router";
import { ROUTES } from "@shared/constants";
import { useForm } from "react-hook-form";

export const RegistrationForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const password = watch('password');

  const onSubmit = (formData) => {
    console.log(formData);
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
      <div className={styles.formActions}>
        <Button variant="primary">Sign Up</Button>
      </div>
      <div className={styles.formFooter}>
        Already have an account? <Link to={ROUTES.LOGIN}>Log In</Link>
      </div>
    </form>
  )
}
