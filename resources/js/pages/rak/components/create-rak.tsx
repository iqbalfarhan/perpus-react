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
import { cn } from '@/lib/utils';
import { Kategori } from '@/types';
import { StoreRakPayload } from '@/types/payload';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type CreateRakProps = PropsWithChildren & {
  kategoris: Kategori[];
};
const CreateRak: FC<CreateRakProps> = ({ children, kategoris }) => {
  const [open, setOpen] = useState(false);
  const { data, setData, post, reset, errors } = useForm<StoreRakPayload>({
    name: '',
    location: '',
    capacity: 0,
    kategori_id: null,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('rak.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Rak berhasil dibuat');
        reset();
        setOpen(false);
      },

      onError: (errors) => {
        const firstErrorKey = Object.keys(errors)[0];
        const firstErrorMessage = errors[firstErrorKey];

        toast.error(firstErrorMessage);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Rak</DialogTitle>
          <DialogDescription>Create Rak</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-1 flex-col space-y-4">
            <FormControl label="Nama rak">
              <Input
                placeholder="Name"
                className={cn('w-full', errors.name && 'border-destructive')}
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
            </FormControl>
            <FormControl label="Lokasi rak">
              <Input
                placeholder="Name"
                className={cn('w-full', errors.location && 'border-destructive')}
                value={data.location}
                onChange={(e) => setData('location', e.target.value)}
              />
            </FormControl>
            <FormControl label="Kapasitas buku">
              <Input
                placeholder="Name"
                className={cn('w-full', errors.capacity && 'border-destructive')}
                value={data.capacity}
                onChange={(e) => setData('capacity', e.target.value as unknown as number)}
              />
            </FormControl>
            <FormControl label="Kategori buku">
              <Select onValueChange={(value) => setData('kategori_id', value as unknown as number)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih kategori buku" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="0">Pilih kategori buku</SelectItem>
                  {kategoris.map((kategori) => (
                    <SelectItem key={kategori.id} value={kategori.id.toString()}>
                      {kategori.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

export default CreateRak;
