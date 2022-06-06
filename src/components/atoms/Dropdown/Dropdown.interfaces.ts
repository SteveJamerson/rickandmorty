import { HTMLAttributes } from 'react';

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
   data: {
      id: string;
      label: string;
   }[];
   value?: string;
   disabled?: boolean;
   loading?: boolean;
   change?: any;
}
