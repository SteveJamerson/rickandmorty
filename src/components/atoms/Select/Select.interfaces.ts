import { HTMLAttributes } from 'react';

export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
   data: {
      value: string;
      label: string;
   }[];
   defaultValue?: string;
   label?: string;
   id: string;
   name: string;
   disabled?: boolean;
   loading?: boolean;
   change?: any;
   fieldRef?: any;
}
