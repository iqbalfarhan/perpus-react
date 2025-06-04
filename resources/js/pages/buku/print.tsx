import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Buku } from '@/types';
import { Head } from '@inertiajs/react';
import { Minus, Plus } from 'lucide-react';
import { FC, useState } from 'react';
import Barcode from 'react-barcode';

type PrintCodeProps = {
  buku: Buku;
};
const PrintCode: FC<PrintCodeProps> = ({ buku }) => {
  const [count, setCount] = useState<number>(12);
  const [printForAll, setPrintForAll] = useState<boolean>(false);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Daftar buku',
      href: route('buku.index'),
    },
    {
      title: buku.title,
      href: route('buku.show', buku.id),
    },
    {
      title: 'Cetak label',
      href: route('buku.show', buku.id),
    },
  ];

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Cetak label" />
      <Container title="Cetak label" description={`Cetak label buku ${buku.title}`}>
        <Card className="print:hidden">
          <CardHeader className="flex items-center justify-between gap-6">
            <CardTitle>Berapa item yang akan diprint</CardTitle>
            <div className="flex justify-between">
              <Button size={'icon'} variant={'outline'} disabled={printForAll} onClick={handleDecrement}>
                <Minus />
              </Button>
              <Button size={'icon'} variant={'ghost'} disabled>
                {count}
              </Button>
              <Button size={'icon'} variant={'outline'} disabled={printForAll} onClick={handleIncrement}>
                <Plus />
              </Button>
            </div>
            <Label>
              <Switch
                checked={printForAll}
                onCheckedChange={(value) => {
                  setPrintForAll(value);
                  setCount(value ? buku.stock : 1);
                }}
              />
              <span className="ml-2">Print untuk semua label</span>
            </Label>
          </CardHeader>
        </Card>
        <div className="bg-card grid grid-cols-3 gap-x-4 gap-y-8 py-12 print:gap-0 print:p-4">
          {Array.from({ length: count }).map((_, index) => (
            <Barcode className="w-full" value={buku.isbn} key={index} />
          ))}
        </div>
      </Container>
    </AppLayout>
  );
};

export default PrintCode;
