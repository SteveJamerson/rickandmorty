import { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
   className?: string;
   variant: 'charecter' | 'location' | 'episode';
   image: {
      src: string;
      external?: boolean;
      ext?: '.png' | '.svg' | '.jpeg' | '.jpg';
   };
   title?: string;
   subtitle?: string;
   status?: 'Alive' | 'Dead';
}
