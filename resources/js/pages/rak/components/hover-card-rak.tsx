import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Rak } from '@/types';
import { FC, PropsWithChildren } from 'react';

type HoverCardRakProps = PropsWithChildren & {
  rak: Rak;
};

const HoverCardRak: FC<HoverCardRakProps> = ({ children, rak }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{rak.name}</h4>
            <p className="text-sm">{rak.location}</p>
            <div className="text-muted-foreground text-xs">kapasitas {rak.capacity} buku</div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardRak;
