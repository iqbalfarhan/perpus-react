import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Buku } from '@/types';
import { router } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type DeleteBukuProps = PropsWithChildren & {
  buku: Buku;
};
const DeleteBuku: FC<DeleteBukuProps> = ({ children, buku }) => {
  const handleDelete = () => {
    router.delete(route('buku.destroy', buku.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Bahasa berhasil dihapus');
      },
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>yakin akan menghapus buku {buku.title}?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBuku;
