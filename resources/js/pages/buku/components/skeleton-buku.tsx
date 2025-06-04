import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';

const SkeletonBuku = () => {
  return (
    <div className="flex w-full items-center space-x-4 rounded-md">
      <Skeleton className="flex aspect-square w-full items-center justify-center">
        <ImageOff />
      </Skeleton>
    </div>
  );
};

export default SkeletonBuku;
