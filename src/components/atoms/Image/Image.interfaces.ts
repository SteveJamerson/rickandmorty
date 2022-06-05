import { ImgHTMLAttributes } from 'react';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
   className?: string;
   external?: boolean;
   ext?: '.png' | '.svg' | '.jpeg' | '.jpg';
}
