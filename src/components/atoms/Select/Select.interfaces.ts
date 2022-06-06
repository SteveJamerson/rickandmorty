import { HTMLAttributes } from 'react';

export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
   data: {
      id: string;
      label: string;
   }[];
   value?: string;
   label?: string;
   disabled?: boolean;
   loading?: boolean;
   change?: any;
}
