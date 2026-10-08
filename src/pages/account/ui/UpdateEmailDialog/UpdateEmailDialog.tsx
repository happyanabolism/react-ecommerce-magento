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

const UpdateEmailDialogBody = ({ onSuccess }: { onSuccess: () => void }) => {
  const { form, formProps, submitProps, error, pending } = useUpdateEmailForm({
    onSuccess,
  });

  return (
    <>
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
    </>
  );
};

export const UpdateEmailDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit customer email</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit customer email</DialogTitle>
        </DialogHeader>
        <UpdateEmailDialogBody onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
