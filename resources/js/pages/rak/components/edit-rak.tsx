import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Kategori, Rak } from '@/types';
import { UpdateRakPayload } from '@/types/payload';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type EditRakProps = PropsWithChildren & {
  rak: Rak;
  kategoris: Kategori[];
};
const EditRak: FC<EditRakProps> = ({ children, rak, kategoris }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data, setData, put } = useForm<UpdateRakPayload>({
    name: rak.name || '',
    location: rak.location || '',
    capacity: rak.capacity || 0,
    kategori_id: rak.kategori?.id || null,
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    put(route('rak.update', rak.id), {
      preserveScroll: true,
      onSuccess: () => {
        setOpen(false);
        toast.success('Rak berhasil diupdate');
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Rak</SheetTitle>
          <SheetDescription>Edit Rak {rak.name}</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleUpdate} className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col space-y-4 px-4">
            <FormControl label="Nama rak">
              <Input placeholder="Name" className="w-full" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Lokasi rak">
              <Input placeholder="Name" className="w-full" value={data.location} onChange={(e) => setData('location', e.target.value)} />
            </FormControl>
            <FormControl label="Nama rak">
              <Input
                placeholder="Name"
                className="w-full"
                value={data.capacity}
                onChange={(e) => setData('capacity', e.target.value as unknown as number)}
              />
            </FormControl>
            <FormControl label="Kategori buku">
              <Select
                defaultValue={rak.kategori?.id.toString()}
                onValueChange={(value) => {
                  if (value == '0') {
                    setData('kategori_id', null);
                    return;
                  }
                  setData('kategori_id', value as unknown as number);
                }}
              >
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

export default EditRak;
