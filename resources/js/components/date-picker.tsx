import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { FC } from 'react';

type DatePickerProps = {
  date?: Date | undefined;
  onDateChange?: (date: Date | undefined) => void;
};

const DatePicker: FC<DatePickerProps> = ({ date, onDateChange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className={cn('w-full min-w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
          <CalendarIcon />
          {date ? dayjs(date).format('DD MMMM YYYY') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={onDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
