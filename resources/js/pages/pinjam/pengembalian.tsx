import Container from '@/components/container';
import DatePicker from '@/components/date-picker';
import FormControl from '@/components/form-control';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Pinjam } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Check, Info } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import DetailBuku from '../buku/components/detail-buku';

type PengembalianProps = {
  pinjam: Pinjam;
  checked_count: number;
};
const Pengembalian: FC<PengembalianProps> = ({ pinjam, checked_count }) => {
  const { data, setData, put, errors, hasErrors } = useForm({
    returned_at: pinjam.returned_at ?? dayjs().format('YYYY-MM-DD HH:mm:ss'),
    fine: pinjam.fine ?? 0,
    note: pinjam.note ?? '',
    late: pinjam.late as boolean | undefined,
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Peminjaman',
      href: route('pinjam.index'),
    },
    {
      title: pinjam.code,
      href: route('pinjam.show', pinjam.id),
    },
    {
      title: 'Pengembalian',
      href: route('pinjam.pengembalian', pinjam.id),
    },
  ];

  const showDoneButton = checked_count === pinjam.bukus?.length;

  const handlePengembalian = () => {
    put(route('pinjam.set-pengembalian', pinjam.id), {
      onSuccess: () => {
        router.visit(route('pinjam.index'));
        toast.success('Berhasil update pinjaman');
      },
    });
  };

  const handleUpdatePinjaman = () => {
    put(route('pinjam.update', pinjam.id), {
      onSuccess: () => {
        toast.success('Berhasil update pinjaman');
      },
    });
  };

  const handle = dayjs(pinjam.due_date).isBefore(dayjs(), 'day');

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Pengembalian ${pinjam.code}`} />
      <Container title={`Pengembalian pinjaman`} description="Pengembalian peminjaman">
        <Card>
          <CardHeader>
            <CardTitle>Periksa kembali buku yang dipinjam {pinjam.status}</CardTitle>
            <CardDescription>
              Peminjaman ini dilakukan oleh {pinjam.user.name} pada tanggal {dayjs(pinjam.loan_date).format('DD MMMM YYYY')} dan rencana pengembalian
              tanggal {dayjs(pinjam.due_date).format('DD MMMM YYYY')}
            </CardDescription>
          </CardHeader>
          {handle && (
            <CardContent>
              <Alert variant={'destructive'}>
                <Info />
                <AlertTitle>Tanggal rencana pengembalian lewat dari hari ini</AlertTitle>
              </Alert>
            </CardContent>
          )}
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <FormControl label="Tanggal pengembalian">
                <DatePicker
                  date={dayjs(data.returned_at).toDate()}
                  onDateChange={(date) => setData('returned_at', dayjs(date).format('YYYY-MM-DD HH:mm:ss'))}
                />
              </FormControl>
              <FormControl label="Status keterlambatan">
                <Button variant={'ghost'} asChild>
                  <Label>
                    <Checkbox defaultChecked={data.late} onCheckedChange={(check) => setData('late', check as boolean)} />
                    <span>Apakah pinjaman ini terlambat dikembalikan?</span>
                  </Label>
                </Button>
              </FormControl>
              {data.late == true && (
                <FormControl label="Nominal denda">
                  <Input type="number" placeholder="Nominal denda" value={data.fine} onChange={(e) => setData('fine', parseInt(e.target.value))} />
                </FormControl>
              )}
              <div className="col-span-full">
                <FormControl label="Keterangan tambahan">
                  <Textarea placeholder="Keterangan tambahan" value={data.note} onChange={(e) => setData('note', e.target.value)} />
                </FormControl>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Judul buku</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Pengecekan buku</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pinjam.bukus?.map((buku) => (
                  <TableRow>
                    <TableCell>{buku.isbn}</TableCell>
                    <TableCell>
                      <DetailBuku buku={buku}>
                        <div>{buku.title}</div>
                      </DetailBuku>
                    </TableCell>
                    <TableCell>{buku.pivot.qty}</TableCell>
                    <TableCell>
                      <Button variant={'ghost'} asChild>
                        <Label>
                          <Checkbox
                            defaultChecked={buku.pivot.checked}
                            onCheckedChange={(check) =>
                              router.put(route('pinjamitem.update', buku.pivot.id), { checked: check }, { preserveScroll: true })
                            }
                          />
                          <span>Sudah diperiksa</span>
                        </Label>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          {hasErrors && (
            <>
              <Separator />
              <CardContent className="text-destructive">
                {Object.entries(errors).map(([key, message]) => (
                  <div>
                    {key} : {message}
                  </div>
                ))}
              </CardContent>
            </>
          )}
          <CardFooter className="flex items-center justify-between">
            <Button disabled variant={'ghost'}>
              Buku yang sudah di cek: {checked_count} dari {pinjam.bukus?.length}
            </Button>

            <div className="flex gap-2">
              <Button disabled={!showDoneButton} onClick={handlePengembalian}>
                <Check />
                Semua buku sudah dicek, ubah status pinjaman menjadi selesai
              </Button>
              <Button onClick={handleUpdatePinjaman}>
                <Check />
                Simpan
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </AppLayout>
  );
};
export default Pengembalian;
