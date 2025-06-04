import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import AppLayout from '@/layouts/app-layout';
import { handleFilter } from '@/lib/utils';
import { Buku, SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { FC, useState } from 'react';
import StatCard from './dashboard/components/stat-card';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

type DashboardProps = {
  bukus: Pick<Buku, 'id' | 'title'>[];
  user_count: number;
  pinjam_count: number;
  buku_count: number;
};

const Dashboard: FC<DashboardProps> = ({ bukus, user_count, pinjam_count, buku_count }) => {
  const [search, setSearch] = useState<string | null>('');

  const {
    auth: { user },
  } = usePage<SharedData>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <Container title="Selamat datang" description={`Anda masuk sebagai ${user.role}`}>
        <div className="grid grid-cols-4 gap-6">
          <StatCard title="Total jenis buku" value={bukus.length} />
          <StatCard title="Buku diperpustakaan" value={buku_count} />
          <StatCard title="Total anggota" value={user_count} />
          <StatCard title="Pinjaman aktif" value={pinjam_count} />
        </div>

        <Card>
          <CardHeader className="flex flex-row justify-between">
            <div className="flex flex-col">
              <CardTitle>Pencarian buku</CardTitle>
              <CardDescription>Pencarian judul buku</CardDescription>
            </div>
            <Button asChild>
              <Link href={route('buku.index')}>
                Semua buku <ArrowRight />
              </Link>
            </Button>
          </CardHeader>

          <CardContent>
            <Input type="text" defaultValue={search?.toString()} placeholder="Cari buku..." onChange={(e) => setSearch(e.target.value)} />
          </CardContent>

          {search && (
            <CardContent>
              <ScrollArea className="h-60 w-full">
                <div className="flex flex-col space-y-1">
                  {bukus
                    ?.filter((buku) => handleFilter(buku, search))
                    .map((buku) => (
                      <Link href={route('buku.show', buku.id)} className="flex items-center justify-between">
                        <Card className="w-full py-2">
                          <CardContent className="flex items-center justify-between">
                            <CardTitle>{buku.title}</CardTitle>
                            <Button size={'icon'} variant={'outline'}>
                              <ArrowRight />
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          )}
        </Card>
      </Container>
    </AppLayout>
  );
};

export default Dashboard;
