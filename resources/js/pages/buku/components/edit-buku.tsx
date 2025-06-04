import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Bahasa, Buku, Kategori, Penerbit, Rak } from '@/types';
import { StoreBukuPayload } from '@/types/payload';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type EditBukuProps = PropsWithChildren & {
  buku: Buku;
  kategoris: Kategori[];
  raks: Rak[];
  bahasas: Bahasa[];
  penerbits: Penerbit[];
};
const EditBuku: FC<EditBukuProps> = ({ children, buku, kategoris, raks, bahasas, penerbits }) => {
  const [open, setOpen] = useState(false);
  const { data, setData, put } = useForm<StoreBukuPayload>({
    title: buku.title,
    synopsis: buku.synopsis,
    author: buku.author,
    isbn: buku.isbn,
    page: buku.page,
    stock: buku.stock,
    kategori_id: buku.kategori?.id,
    rak_id: buku.rak?.id,
    bahasa_id: buku.bahasa?.id,
    penerbit_id: buku.penerbit?.id,
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    put(route('buku.update', buku.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Buku berhasil diubah');
        setOpen(false);
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Edit buku</SheetTitle>
          <SheetDescription>{buku.title}</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-auto">
          <div className="space-y-4 px-5">
            <FormControl label="Judul buku">
              <Input
                placeholder="Name"
                className="w-full"
                defaultValue={buku.title}
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
              />
            </FormControl>
            <FormControl label="Ringkasan buku">
              <Textarea
                placeholder="Ringkasan buku"
                className="w-full"
                defaultValue={buku.synopsis}
                value={data.synopsis}
                onChange={(e) => setData('synopsis', e.target.value)}
              />
            </FormControl>
            <FormControl label="Pengarang">
              <Input
                placeholder="Pengarang"
                className="w-full"
                defaultValue={buku.author}
                value={data.author}
                onChange={(e) => setData('author', e.target.value)}
              />
            </FormControl>
            <FormControl label="Nomor ISBN">
              <Input
                placeholder="Nomor ISBN"
                className="w-full"
                defaultValue={buku.isbn}
                value={data.isbn}
                onChange={(e) => setData('isbn', e.target.value)}
              />
            </FormControl>
            <div className="grid grid-cols-2 gap-6">
              <FormControl label="Jumlah halaman">
                <Input
                  placeholder="Jumlah halaman"
                  className="w-full"
                  defaultValue={buku.page}
                  value={data.page}
                  onChange={(e) => setData('page', e.target.value as unknown as number)}
                />
              </FormControl>
              <FormControl label="Stok buku">
                <Input
                  placeholder="Stok buku diperpustakaan"
                  className="w-full"
                  defaultValue={buku.stock}
                  value={data.stock}
                  onChange={(e) => setData('stock', e.target.value as unknown as number)}
                />
              </FormControl>
            </div>
            <FormControl label="Kategori buku">
              <Select
                defaultValue={buku.kategori?.id.toString()}
                value={data.kategori_id?.toString()}
                onValueChange={(value) => setData('kategori_id', value as unknown as number)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih kategori buku" />
                </SelectTrigger>
                <SelectContent>
                  {kategoris.map((kategori) => (
                    <SelectItem key={kategori.id} value={kategori.id.toString()}>
                      {kategori.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Lokasi buku">
              <Select
                defaultValue={buku.rak?.id.toString()}
                value={data.rak_id?.toString()}
                onValueChange={(value) => setData('rak_id', value as unknown as number)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih rak buku" />
                </SelectTrigger>
                <SelectContent>
                  {raks.map((rak) => (
                    <SelectItem key={rak.id} value={rak.id.toString()}>
                      {rak.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Bahasa buku">
              <Select
                defaultValue={buku.bahasa?.id.toString()}
                value={data.bahasa_id?.toString()}
                onValueChange={(value) => setData('bahasa_id', value as unknown as number)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih bahasa buku" />
                </SelectTrigger>
                <SelectContent>
                  {bahasas.map((bahasa) => (
                    <SelectItem key={bahasa.id} value={bahasa.id.toString()}>
                      {bahasa.flag} {bahasa.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Penerbit buku">
              <Select
                defaultValue={buku.penerbit?.id.toString()}
                value={data.penerbit_id?.toString()}
                onValueChange={(value) => setData('penerbit_id', value as unknown as number)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih penerbit buku" />
                </SelectTrigger>
                <SelectContent>
                  {penerbits.map((penerbit) => (
                    <SelectItem key={penerbit.id} value={penerbit.id.toString()}>
                      {penerbit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </div>
        </ScrollArea>
        <SheetFooter className="flex flex-row justify-between">
          <SheetClose asChild>
            <Button type="submit" variant={'ghost'}>
              Batal
            </Button>
          </SheetClose>
          <form onSubmit={handleUpdate}>
            <Button type="submit">Simpan</Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditBuku;
