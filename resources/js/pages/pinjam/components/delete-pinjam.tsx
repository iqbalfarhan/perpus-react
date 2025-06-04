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
import { Pinjam } from '@/types';
import { router } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type DeletePinjamProps = PropsWithChildren & {
  pinjam: Pinjam;
};

const DeletePinjam: FC<DeletePinjamProps> = ({ children, pinjam }) => {
  const handleDelete = () => {
    router.delete(route('pinjam.destroy', pinjam.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Penerbit berhasil dihapus');
      },
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>yakin akan menghapus pinjam {pinjam.code}?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePinjam;
