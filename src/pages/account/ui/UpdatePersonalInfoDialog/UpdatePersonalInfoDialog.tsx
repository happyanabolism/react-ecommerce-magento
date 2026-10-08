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

export const UpdatePersonalInfoDialog = ({
  customer,
}: UpdatePersonalInfoDialogProps) => {
  const [open, setOpen] = useState(false);
  const { form, formProps, submitProps, error, pending, reset } =
    useUpdatePersonalInfoForm({
      customer,
      onSuccess: () => setOpen(false),
    });

  const handleOpenChange = (nextOpen: boolean) => {
    if (pending) return;
    if (nextOpen) reset();
    setOpen(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Edit name</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit name</DialogTitle>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
};
