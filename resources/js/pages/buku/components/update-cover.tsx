import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Buku } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';

type UpdateCoverProps = {
  buku: Buku;
};

const UpdateCover: FC<UpdateCoverProps> = ({ buku }) => {
  const [open, setOpen] = useState(false);
  const [newimage, setNewimage] = useState<File | null>(null);

  const handleUploadImage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.post(
      route('buku.update', buku.id),
      {
        _method: 'PUT',
        cover: newimage,
      },
      {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Cover berhasil diupdate');
          setNewimage(null);
          setOpen(false);
        },
        onError: () => {
          toast.error('Cover gagal diupdate');
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update cover</CardTitle>
        <CardDescription>Update cover buku</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="aspect-square w-full rounded-md">
            {buku.thumbnail ? (
              <img src={buku.thumbnail} alt={buku.title} className="w-full rounded-md" />
            ) : (
              <div className="bg-muted-foreground flex aspect-square w-full items-center justify-center rounded-md" />
            )}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pilih file gambar cover</DialogTitle>
              <DialogDescription>File yang dipilih harus berupa gambar dan maksimal 2 Mb</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUploadImage} className="mt-4 space-y-6">
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="w-full"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setNewimage(file);
                  }}
                />
              </FormControl>

              {newimage && (
                <Avatar className="size-24 rounded">
                  <AvatarImage src={URL.createObjectURL(newimage)} />
                </Avatar>
              )}

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={'ghost'}>Batal</Button>
                </DialogClose>
                <Button>
                  <Upload />
                  Upload
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter>
        <Button variant={'ghost'} size={'sm'} className="ghost" asChild>
          <Link
            href={route('buku.remove-cover', buku.id)}
            method="put"
            data={{ cover: null }}
            preserveScroll
            onSuccess={() => toast.success('Cover berhasil direset')}
          >
            <X />
            Reset cover
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateCover;
