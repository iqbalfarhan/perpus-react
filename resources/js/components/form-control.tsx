import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';
import { Label } from './ui/label';

type FormControlProps = PropsWithChildren & {
  label?: string;
  direction?: 'h' | 'v';
};

const FormControl: FC<FormControlProps> = ({ children, label, direction = 'v' }) => {
  return (
    <Label className={cn('flex items-start gap-2', direction === 'v' ? 'flex-col' : 'flex-row')}>
      {label && <span>{label}</span>}
      {children}
    </Label>
  );
};

export default FormControl;
