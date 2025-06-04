import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Penerbit } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type EditPenerbitProps = PropsWithChildren & {
  penerbit: Penerbit;
};

const EditPenerbit: FC<EditPenerbitProps> = ({ children, penerbit }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data, setData } = useForm({
    name: penerbit.name || '',
    address: penerbit.address || '',
    image: null as File | null,
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.post(
      route('penerbit.update', penerbit.id),
      {
        _method: 'PUT',
        name: data.name,
        address: data.address,
        image: data.image,
      },
      {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          setOpen(false);
          toast.success('Penerbit berhasil diupdate');
        },
        onError: () => {
          toast.error('Penerbit gagal diupdate');
        },
      },
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Penerbit</SheetTitle>
          <SheetDescription>Edit Penerbit</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleUpdate} className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col space-y-4 p-4">
            <FormControl label="Nama penerbit">
              <Input placeholder="Name" className="w-full" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Nama penerbit">
              <Textarea placeholder="Alamat penerbit" className="w-full" value={data.address} onChange={(e) => setData('address', e.target.value)} />
            </FormControl>
            <FormControl label="Logo penerbit">
              <Input
                type="file"
                className="w-full"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setData('image', file);
                }}
              />
            </FormControl>

            {data.image && (
              <Avatar>
                <AvatarImage src={data.image ? URL.createObjectURL(data.image) : ''} />
              </Avatar>
            )}

            <Avatar>
              <AvatarImage src={penerbit?.image} />
            </Avatar>
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

export default EditPenerbit;
