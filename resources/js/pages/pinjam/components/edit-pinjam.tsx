import DatePicker from '@/components/date-picker';
import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Pinjam, User } from '@/types';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type EditPinjamProps = PropsWithChildren & {
  pinjam: Pinjam;
  users: User[];
};

const EditPinjam: FC<EditPinjamProps> = ({ children, pinjam, users }) => {
  const [open, setOpen] = useState(false);
  const { data, setData, errors, put } = useForm({
    user_id: pinjam.user.id,
    loan_date: pinjam.loan_date ?? undefined,
    due_date: pinjam.due_date ?? undefined,
    note: pinjam.note,
    returned: pinjam.returned as boolean,
    returned_at: pinjam.returned_at as string | undefined,
    late: pinjam.late as boolean | undefined,
    fine: pinjam.fine ?? undefined,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(route('pinjam.update', pinjam.id), {
      onSuccess: () => {
        toast.success('Berhasil mengubah data peminjaman');
      },
      onError: () => {
        toast.error('Gagal mengubah data peminjaman');
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit info peminjaman</SheetTitle>
          <SheetDescription>{pinjam.code}</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-auto">
          <div className="space-y-6 px-4">
            <FormControl label="Nama peminjam">
              <Select value={data.user_id.toString()} onValueChange={(value) => setData('user_id', parseInt(value))}>
                <SelectTrigger className={cn('w-full', errors.user_id && 'border-destructive')}>
                  <SelectValue placeholder="Pilih user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={'null'}>Pilih peminjam</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      <Avatar className="size-4">
                        <AvatarImage src={user.avatar} alt={user.name} />
                      </Avatar>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Tanggal pinjaman">
              <DatePicker date={dayjs(data.loan_date).toDate()} onDateChange={(date) => setData('loan_date', dayjs(date).format('YYYY-MM-DD'))} />
            </FormControl>
            <FormControl label="Rencana pengembalian">
              <DatePicker date={dayjs(data.due_date).toDate()} onDateChange={(date) => setData('due_date', dayjs(date).format('YYYY-MM-DD'))} />
            </FormControl>
            <FormControl label="Catatan">
              <Textarea value={data.note} onChange={(e) => setData('note', e.target.value)} />
            </FormControl>
          </div>
          {pinjam.returned && (
            <>
              <Separator className="my-6" />
              <div className="space-y-6 px-4">
                <FormControl label="Status pengeembalian">
                  <Button type="button" variant={'ghost'} asChild>
                    <Label>
                      <Switch
                        checked={data.returned}
                        onCheckedChange={(checked) => {
                          setData('returned', checked);
                          setData('returned_at', checked == true ? pinjam.returned_at : undefined);
                        }}
                      />
                      <span>Buku dipinjaman ini sudah dikembalikan</span>
                    </Label>
                  </Button>
                </FormControl>
                {data.returned && (
                  <FormControl label="Tanggal pengembalian">
                    <DatePicker
                      date={dayjs(data.returned_at).toDate()}
                      onDateChange={(date) => setData('returned_at', dayjs(date).format('YYYY-MM-DD'))}
                    />
                  </FormControl>
                )}
                <FormControl label="Status Keterlambatan">
                  <Button type="button" variant={'ghost'} asChild>
                    <Label>
                      <Switch checked={data.late} onCheckedChange={(checked) => setData('late', checked)} />
                      <span>Pinjaman ini terlambat dikembalikan</span>
                    </Label>
                  </Button>
                </FormControl>
                {data.late && (
                  <FormControl label="Denda keterlambatan">
                    <Input value={data.fine} onChange={(e) => setData('fine', parseInt(e.target.value))} />
                  </FormControl>
                )}
              </div>
            </>
          )}
        </ScrollArea>
        <SheetFooter>
          <form onSubmit={handleSubmit} className="flex justify-between">
            <SheetClose asChild>
              <Button type="button" variant={'ghost'}>
                Batal
              </Button>
            </SheetClose>
            <Button>Simpan</Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditPinjam;
