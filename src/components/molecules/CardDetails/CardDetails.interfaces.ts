import { HTMLAttributes } from 'react';

export interface CardDetailsProps extends HTMLAttributes<HTMLDivElement> {
   className?: string;
   image?: {
      src: string;
      external?: boolean;
      ext?: '.png' | '.svg' | '.jpeg' | '.jpg';
   };
   title?: string;
   subtitle?: string;
   status?: 'Alive' | 'Dead';
   gender?: 'female' | 'male' | 'genderless';
   close?: any;
}
