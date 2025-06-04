import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type EditUserProps = PropsWithChildren & {
  user: User;
};
const EditUser: FC<EditUserProps> = ({ children, user }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data, setData, put } = useForm({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(route('user.update', user.id), {
      preserveScroll: true,
      onSuccess: () => {
        setOpen(false);
        toast.success('User berhasil diupdate');
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit User</SheetTitle>
          <SheetDescription>Edit User</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleUpdate} className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col space-y-4 px-4">
            <FormControl label="Nama user">
              <Input placeholder="Name" className="w-full" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat email">
              <Input placeholder="Alamat email" className="w-full" value={data.email} onChange={(e) => setData('email', e.target.value)} />
            </FormControl>
            <FormControl label="Role">
              <Select defaultValue={user.role} onValueChange={(value) => setData('role', value)}>
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
          <SheetFooter className="flex flex-row justify-between">
            <SheetClose asChild>
              <Button variant={'ghost'}>Batal</Button>
            </SheetClose>
            <Button type="submit">Simpan</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditUser;
