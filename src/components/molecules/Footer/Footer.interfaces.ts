import { HTMLAttributes } from 'react';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
   text?: string;
   variant?: 'default' | 'black';
}
