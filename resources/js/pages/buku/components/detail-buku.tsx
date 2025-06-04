import FormControl from '@/components/form-control';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Buku } from '@/types';
import { FC, PropsWithChildren } from 'react';

type DetailBukuProps = PropsWithChildren & {
  buku: Buku;
};

const DetailBuku: FC<DetailBukuProps> = ({ children, buku }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detail buku</SheetTitle>
          <SheetDescription>{buku.kategori?.name}</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-auto">
          <div className="space-y-6 px-4">
            <FormControl label="Judul buku">
              <p className="text-muted-foreground">{buku.title}</p>
            </FormControl>
            <FormControl label="Sinopsis">
              <p className="text-muted-foreground">{buku.synopsis}</p>
            </FormControl>
            <FormControl label="Kategori">
              <p className="text-muted-foreground">{buku.kategori?.name}</p>
              <p className="text-muted-foreground">{buku.kategori?.description}</p>
            </FormControl>
            <FormControl label="Rak">
              <p className="text-muted-foreground">{buku.rak?.name}</p>
              <p className="text-muted-foreground">Kapasitas {buku.rak?.capacity} buku</p>
              <p className="text-muted-foreground">{buku.rak?.location}</p>
            </FormControl>
            <FormControl label="Penerbit">
              <p className="text-muted-foreground">{buku.penerbit?.name}</p>
              <p className="text-muted-foreground">{buku.penerbit?.address}</p>
            </FormControl>
            <FormControl label="Penulis">
              <p className="text-muted-foreground">{buku.author}</p>
            </FormControl>
            <FormControl label="Nomor ISBN">
              <p className="text-muted-foreground">{buku.isbn}</p>
            </FormControl>
            <FormControl label="Bahasa buku">
              <p className="text-muted-foreground space-x-2">
                <span>{buku.bahasa?.flag}</span>
                <span>{buku.bahasa?.name}</span>
              </p>
            </FormControl>
            <FormControl label="Stok buku">
              <p className="text-muted-foreground">{buku.stock}</p>
            </FormControl>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default DetailBuku;
