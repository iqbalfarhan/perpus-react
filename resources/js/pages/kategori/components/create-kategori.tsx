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
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type CreateKategoriProps = PropsWithChildren & {};
const CreateKategori: FC<CreateKategoriProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { data, setData, post, reset, errors } = useForm({
    name: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('kategori.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Kategori berhasil dibuat');
        setOpen(false);
        reset();
      },
      onError: () => {
        setOpen(true);
        toast.error('Kategori gagal dibuat');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Kategori baru</DialogTitle>
          <DialogDescription>Harap isi semua data yang diperlukan</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-1 flex-col space-y-4">
            <FormControl label="Nama kategori">
              <Input
                placeholder="Name"
                className={errors.name && 'border-destructive'}
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
            </FormControl>
            <FormControl label="Deskripsi">
              <Textarea placeholder="Description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormControl>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'ghost'}>Batal</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateKategori;
