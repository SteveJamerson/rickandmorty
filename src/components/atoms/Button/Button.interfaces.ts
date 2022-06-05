import { ButtonHTMLAttributes } from 'react';
import { ButtonTypes, ButtonVariants } from './Button.types';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: ButtonVariants;
   type?: ButtonTypes;
   text?: string;
   link?: string;
   disabled?: boolean;
   loading?: boolean;
}
