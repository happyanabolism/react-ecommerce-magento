import { useForm } from 'react-hook-form'
import './LoginForm.css'

function LoginForm() {

  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
    // defaultValues: {
    //   email: 'testDefaultValue'
    // }
  });

  // useEffect(() => {
  //   // Data from server
  //   reset({
  //     email: 'example@gmail.com'
  //   })
  // }, [reset])

  const emailError = formState.errors.email?.message;

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Enter email:"
        {...register('email', {
          required: 'This field is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          }
        })}
      />
      {emailError && (
        <p className='field-validation-error'>{emailError}</p>
      )}
      <input
        type="password"
        placeholder="Enter password:"
        {...register('password', {
          required: 'This field is required'
        })}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default LoginForm;