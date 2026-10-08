import { useState } from 'react';
import {
  useUpdateEmailForm,
  UpdateEmailFields,
} from '@features/customer-update';
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

export const UpdateEmailDialog = () => {
  const [open, setOpen] = useState(false);
  const { form, formProps, submitProps, error, pending, reset } =
    useUpdateEmailForm({
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
        <Button>Edit customer email</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit customer email</DialogTitle>
        </DialogHeader>
        <form {...formProps}>
          <UpdateEmailFields form={form} error={error} />
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
