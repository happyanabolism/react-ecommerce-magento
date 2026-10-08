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

const UpdatePasswordDialogBody = ({ onSuccess }: { onSuccess: () => void }) => {
  const { form, formProps, submitProps, error, pending } =
    useUpdatePasswordForm({ onSuccess });

  return (
    <>
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
    </>
  );
};

export const UpdatePasswordDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Change password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
        </DialogHeader>
        <UpdatePasswordDialogBody onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
