import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { FC } from 'react';

type StatCardProps = {
  value?: number;
  title?: string;
};

const StatCard: FC<StatCardProps> = ({ value = 0, title }) => {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl font-semibold">{value}</CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendingUp />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">Visitors for the last 6 months</div>
      </CardFooter>
    </Card>
  );
};

export default StatCard;
