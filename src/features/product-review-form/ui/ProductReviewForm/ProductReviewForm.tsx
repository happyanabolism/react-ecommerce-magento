import { Link, useLocation } from 'react-router';
import { selectJwt } from '@entities/session';
import { useCustomer } from '@entities/customer';
import { useAppSelector } from '@shared/lib';
import { ROUTES } from '@shared/config';
import { Spinner } from '@shared/ui';
import { ReviewForm } from '../ReviewForm/ReviewForm';

interface ProductReviewFormProps {
  sku: string;
}

export const ProductReviewForm = ({ sku }: ProductReviewFormProps) => {
  const jwt = useAppSelector(selectJwt);
  const location = useLocation();
  const { data: customer, isPending } = useCustomer();

  if (!jwt) {
    return (
      <Link
        to={ROUTES.LOGIN}
        state={{ from: location.pathname + location.search }}
      >
        Please log in to write a review
      </Link>
    );
  }

  // the form reads its default nickname once, on mount, so it waits for the customer
  if (isPending) {
    return (
      <Spinner className='mx-auto my-8 block size-8 text-muted-foreground' />
    );
  }

  // if the customer failed to load, the nickname is just left empty
  return (
    <ReviewForm sku={sku} defaultNickname={customer?.firstname ?? undefined} />
  );
};
