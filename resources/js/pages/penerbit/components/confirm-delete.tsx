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
import { Penerbit } from '@/types';
import { router } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type ConfirmDeleteProps = PropsWithChildren & {
  penerbit: Penerbit;
};

const ConfirmDelete: FC<ConfirmDeleteProps> = ({ penerbit, children }) => {
  const handleDelete = () => {
    router.delete(route('penerbit.destroy', penerbit.id), {
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
          <AlertDialogDescription>yakin akan menghapus penerbit {penerbit.name}?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDelete;
