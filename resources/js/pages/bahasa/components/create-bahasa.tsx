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
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type CreateBahasaProps = PropsWithChildren & {};
const CreateBahasa: FC<CreateBahasaProps> = ({ children }) => {
  const { data, setData, post } = useForm({
    name: '',
    flag: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('bahasa.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Kategori berhasil dibuat');
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Kategori</DialogTitle>
          <DialogDescription>Create Kategori</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-1 flex-col space-y-4">
            <FormControl label="Nama kategori">
              <Input placeholder="Name" className="w-full" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Emoji Bendera">
              <Input placeholder="Icon Bendera" className="w-full" value={data.flag} onChange={(e) => setData('flag', e.target.value)} />
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

export default CreateBahasa;
