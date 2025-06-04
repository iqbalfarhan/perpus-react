import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Kategori } from '@/types';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type EditKategoriProps = PropsWithChildren & {
  kategori: Kategori;
};
const EditKategori: FC<EditKategoriProps> = ({ children, kategori }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data, setData, put } = useForm({
    name: kategori.name,
    description: kategori.description,
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(route('kategori.update', kategori.id), {
      preserveScroll: true,
      onSuccess: () => {
        setOpen(false);
        toast.success('Kategori berhasil diupdate');
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Kategori</SheetTitle>
          <SheetDescription>Edit Kategori</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleUpdate} className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col space-y-4 px-4">
            <FormControl label="Nama kategori">
              <Input
                placeholder="Name"
                className="w-full"
                defaultValue={kategori.name}
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
            </FormControl>
            <FormControl label="Deskripsi">
              <Textarea
                placeholder="Description"
                className="w-full"
                defaultValue={kategori.description}
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
              />
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

export default EditKategori;
