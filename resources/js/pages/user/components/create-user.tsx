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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type CreateUserProps = PropsWithChildren & {};
const CreateUser: FC<CreateUserProps> = ({ children }) => {
  const { data, setData, post } = useForm({
    name: '',
    email: '',
    password: 'password',
    role: 'user',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('user.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('User berhasil dibuat');
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>Create User</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-1 flex-col space-y-4">
            <FormControl label="Nama user">
              <Input placeholder="Name" className="w-full" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat email">
              <Input
                type="email"
                placeholder="Alamat email"
                className="w-full"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
            </FormControl>
            <FormControl label="Password">
              <Input placeholder="Password" className="w-full" defaultValue={data.password} onChange={(e) => setData('password', e.target.value)} />
            </FormControl>
            <FormControl label="Role">
              <Select defaultValue={data.role} onValueChange={(value) => setData('role', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUser;
