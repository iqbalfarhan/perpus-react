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
import { Rak } from '@/types';
import { router } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type ConfirmDeleteProps = PropsWithChildren & {
  rak: Rak;
};

const ConfirmDelete: FC<ConfirmDeleteProps> = ({ rak, children }) => {
  const handleDelete = () => {
    router.delete(route('rak.destroy', rak.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Rak berhasil dihapus');
      },
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>yakin akan menghapus rak {rak.name}?</AlertDialogDescription>
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
