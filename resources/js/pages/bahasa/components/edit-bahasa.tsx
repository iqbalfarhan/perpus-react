import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Bahasa } from '@/types';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type EditBahasaProps = PropsWithChildren & {
  bahasa: Bahasa;
};
const EditBahasa: FC<EditBahasaProps> = ({ children, bahasa }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data, setData, put } = useForm({
    name: bahasa.name,
    flag: bahasa.flag,
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(route('bahasa.update', bahasa.id), {
      preserveScroll: true,
      onSuccess: () => {
        setOpen(false);
        toast.success('Bahasa berhasil diupdate');
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Bahasa</SheetTitle>
          <SheetDescription>Edit Bahasa</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleUpdate} className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col space-y-4 px-4">
            <FormControl label="Nama bahasa">
              <Input
                placeholder="Name"
                className="w-full"
                defaultValue={bahasa.name}
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
            </FormControl>
            <FormControl label="Emoji Bendera">
              <Input
                placeholder="Description"
                className="w-full"
                defaultValue={bahasa.flag}
                value={data.flag}
                onChange={(e) => setData('flag', e.target.value)}
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

export default EditBahasa;
