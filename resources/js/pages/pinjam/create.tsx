import Container from '@/components/container';
import DatePicker from '@/components/date-picker';
import FormControl from '@/components/form-control';
import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn, flattenErrorMessages } from '@/lib/utils';
import { BreadcrumbItem, Buku, SharedData, User } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';

type CreatePeminjamanProps = {
  users: User[];
  bukus: Buku[];
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Peminjaman',
    href: '/pinjam',
  },
  {
    title: 'Buat peminjaman',
    href: route('pinjam.create'),
  },
];

const CreatePeminjaman: FC<CreatePeminjamanProps> = ({ users, bukus }) => {
  const {
    auth: { user },
  } = usePage<SharedData>().props;

  const [items, setItems] = useState<
    {
      buku_id: Buku['id'];
      qty: number;
    }[]
  >([]);

  const [code, setCode] = useState('');

  const handleScanCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selected = bukus.find((book) => book.isbn === code);

    if (selected) {
      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.buku_id === selected.id);

        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex].qty += 1;
          return updated;
        }
        return [...prev, { buku_id: selected.id, qty: 1 }];
      });
    } else {
      toast.error(`Buku ${code} tidak ditemukan`);
    }

    setCode('');
  };

  const handleIncrement = (bukuId: number) => {
    setItems((prev) => prev.map((item) => (item.buku_id === bukuId ? { ...item, qty: item.qty + 1 } : item)));
  };

  const handleDecrement = (bukuId: number) => {
    setItems((prev) => prev.map((item) => (item.buku_id === bukuId && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item)));
  };

  const handleRemove = (bukuId: number) => {
    setItems((prev) => prev.filter((item) => item.buku_id !== bukuId));
  };

  const defaultDate = dayjs().format('YYYY-MM-DD');

  const { data, setData, errors, reset } = useForm({
    user_id: undefined as User['id'] | undefined,
    loan_date: defaultDate,
    note: '',
    due_date: dayjs(defaultDate).add(7, 'day').format('YYYY-MM-DD'),
    items: [],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.post(
      route('pinjam.store'),
      {
        user_id: data.user_id,
        loan_date: data.loan_date,
        due_date: data.due_date,
        note: data.note,
        items: items.map((item) => ({
          buku_id: item.buku_id,
          qty: item.qty,
        })),
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Peminjaman berhasil dibuat');
          reset();
          setItems([]);
        },
        onError: (errors) => {
          toast.error(flattenErrorMessages(errors));
        },
      },
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Peminjaman" />
      <Container title="Form peminjaman" description="Buat peminjaman baru">
        <Card>
          <CardHeader>
            <CardTitle>Informasi peminjaman</CardTitle>
            <CardDescription>isi dengan data yang sesuai</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-4 gap-6">
            <div className="col-span-2">
              <FormControl label="Pilih peminjam">
                <Select value={data.user_id?.toString()} onValueChange={(value) => setData('user_id', parseInt(value))}>
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
            </div>
            <FormControl label="Tanggal pinjam">
              <DatePicker date={dayjs(data.loan_date).toDate()} onDateChange={(date) => setData('loan_date', dayjs(date).format('YYYY-MM-DD'))} />
            </FormControl>
            <FormControl label="Rencana pengembalian">
              <DatePicker date={dayjs(data.due_date).toDate()} onDateChange={(date) => setData('due_date', dayjs(date).format('YYYY-MM-DD'))} />
            </FormControl>
            <div className="col-span-4">
              <FormControl label="Catatan tambahan">
                <Textarea
                  placeholder="Keterangan tambahan, misalkan kondisi buku sebelum dipinjam dll"
                  value={data.note}
                  onChange={(e) => setData('note', e.target.value)}
                />
              </FormControl>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" disabled>
              Petugas input: {user.name}
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <HeadingSmall title="Item yang dipinjam" description="tanggal pinjam dan tanggal kembali" />
          </CardHeader>
          <CardHeader>
            <form onSubmit={handleScanCode}>
              <FormControl label="Scan disini">
                <Input placeholder="Scan barcode atau QR code buku" value={code} onChange={(e) => setCode(e.target.value)} />
              </FormControl>
            </form>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode buku</TableHead>
                  <TableHead>Judul buku</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => {
                  const buku = bukus.find((buku) => buku.id === item.buku_id);
                  return (
                    <TableRow key={item.buku_id}>
                      <TableCell>{buku?.isbn}</TableCell>
                      <TableCell>{buku?.title}</TableCell>
                      <TableCell>
                        <div className="flex">
                          <Button size={'icon'} variant={'outline'} onClick={() => handleDecrement(item.buku_id)}>
                            <Minus />
                          </Button>
                          <Button size={'icon'} variant={'ghost'}>
                            {item.qty}
                          </Button>
                          <Button size={'icon'} variant={'outline'} onClick={() => handleIncrement(item.buku_id)}>
                            <Plus />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size={'icon'} variant={'ghost'} onClick={() => handleRemove(item.buku_id)}>
                          <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <form onSubmit={handleSubmit}>
          <Button type="submit">simpan</Button>
        </form>
      </Container>
    </AppLayout>
  );
};
export default CreatePeminjaman;
