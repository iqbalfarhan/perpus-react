import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
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
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type CreatePenerbitProps = PropsWithChildren & {};
const CreatePenerbit: FC<CreatePenerbitProps> = ({ children }) => {
  const { data, setData, post } = useForm({
    name: '',
    address: '',
    logo: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('penerbit.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Penerbit berhasil dibuat');
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Penerbit</DialogTitle>
          <DialogDescription>Create Penerbit</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-1 flex-col space-y-4">
            <FormControl label="Nama penerbit">
              <Input placeholder="Name" className="w-full" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Nama penerbit">
              <Textarea placeholder="Alamat penerbit" className="w-full" value={data.address} onChange={(e) => setData('address', e.target.value)} />
            </FormControl>
            <FormControl label="Logo penerbit">
              <Input type="file" className="w-full" onChange={(e) => setData('logo', e.target.files?.[0] || null)} />
            </FormControl>

            {data.logo && (
              <Avatar>
                <AvatarImage src={data.logo ? URL.createObjectURL(data.logo) : ''} />
              </Avatar>
            )}
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

export default CreatePenerbit;
