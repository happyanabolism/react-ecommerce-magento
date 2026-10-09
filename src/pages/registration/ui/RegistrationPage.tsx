import { RegistrationForm } from '@features/auth/register';
import { Container } from '@shared/ui';

export const RegistrationPage = () => {
  return (
    <>
      <title>Sign Up</title>

      <Container>
        <div className='mx-auto max-w-md py-10'>
          <RegistrationForm />
        </div>
      </Container>
    </>
  );
};
