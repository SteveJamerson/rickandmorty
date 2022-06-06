import { IconName } from './../Icon/Icon.types';

export interface FieldProps
   extends React.InputHTMLAttributes<HTMLInputElement> {
   variant?: 'outline' | 'fill';
   type: 'text' | 'number' | 'tel' | 'email' | 'password' | 'search';
   id: string;
   name: string;
   label?: string;
   value?: string | number;
   disabled?: boolean;
   icon?: IconName;
   key?: React.Key;
   fieldRef?: any;
}
