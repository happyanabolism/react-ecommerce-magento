import { useState } from 'react';
import {
  useUpdatePasswordForm,
  UpdatePasswordFields,
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

export const UpdatePasswordDialog = () => {
  const [open, setOpen] = useState(false);
  const { form, formProps, submitProps, error, pending, reset } =
    useUpdatePasswordForm({
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
        <Button>Change password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
        </DialogHeader>
        <form {...formProps}>
          <UpdatePasswordFields form={form} error={error} />
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
