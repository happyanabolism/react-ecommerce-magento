import { useState } from 'react';
import {
  useUpdatePersonalInfoForm,
  UpdatePersonalInfoFields,
} from '@features/customer-update';
import type { CustomerFieldsFragment } from '@shared/api';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  DialogTitle,
  Spinner,
} from '@shared/ui';

interface UpdatePersonalInfoDialogProps {
  customer: CustomerFieldsFragment;
}

const UpdatePersonalInfoDialogBody = ({
  customer,
  onSuccess,
}: UpdatePersonalInfoDialogProps & { onSuccess: () => void }) => {
  const { form, formProps, submitProps, error, pending } =
    useUpdatePersonalInfoForm({ customer, onSuccess });

  return (
    <>
      <form {...formProps}>
        <UpdatePersonalInfoFields form={form} error={error} />
      </form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant='outline' disabled={pending}>
            Cancel
          </Button>
        </DialogClose>
        <Button {...submitProps}>
          {pending && <Spinner />}
          Save changes
        </Button>
      </DialogFooter>
    </>
  );
};

export const UpdatePersonalInfoDialog = ({
  customer,
}: UpdatePersonalInfoDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit name</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit name</DialogTitle>
        </DialogHeader>
        <UpdatePersonalInfoDialogBody
          customer={customer}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
