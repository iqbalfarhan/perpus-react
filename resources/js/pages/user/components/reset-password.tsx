import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { copyToClipboard, generatePassword } from '@/lib/utils';
import { User } from '@/types';
import { router } from '@inertiajs/react';
import { Copy, RefreshCcw } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type ResetPasswordProps = PropsWithChildren & {
  user: User;
};

const ResetPassword: FC<ResetPasswordProps> = ({ children, user }) => {
  const [newPass, setNewPass] = useState(() => generatePassword());

  const handleSimpan = () => {
    router.put(
      route('user.update', user.id),
      { password: newPass },
      {
        onSuccess: () => {
          toast.success('Password berhasil direset');
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset password {user.name}</DialogTitle>
          <DialogDescription>Buat password random untuk user</DialogDescription>
        </DialogHeader>
        <FormControl label="Password baru">
          <div className="flex w-full gap-2">
            <Input value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Password baru" className="w-full text-center" />
            <Button type="submit" onClick={() => setNewPass(generatePassword())} size={'icon'}>
              <RefreshCcw />
            </Button>
          </div>
        </FormControl>

        <DialogFooter className="flex w-full flex-row items-center justify-between">
          <Button variant={'secondary'} onClick={() => copyToClipboard(newPass).then(() => toast.success('Password berhasil disalin'))}>
            <Copy />
            Copy password
          </Button>
          <div className="flex-1"></div>
          <DialogClose asChild>
            <Button onClick={handleSimpan} type="submit">
              Reset password
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPassword;
