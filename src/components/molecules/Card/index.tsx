import clsx from "clsx";
import React from "react";
import { Image } from "../../atoms";
import { CardProps } from "./Card.interfaces";
import "./Card.styles.scss";

export const Card: React.FC<CardProps> = ({
   variant,
   image,
   title,
   subtitle,
   status,
   episode,
   className,
   children,
   ...props
}) => {
   const classes = clsx([
      {
         card: true,
         [`card--${variant}`]: variant,
      },
      className,
   ]);

   return (
      <div className={classes} {...props}>
         <div className="card__image">
            <Image
               src={image.src}
               external={image.external}
               ext={image.ext}
            ></Image>
         </div>
         <div className="card__text">
            {episode && <p className="card__episode">{episode.slice(-2)}</p>}
            {title && <p className="card__title">{title}</p>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
            {status && (
               <p className={`card__status ${status?.toLowerCase()}`}>
                  {status}
               </p>
            )}
            {children}
         </div>
      </div>
   );
};
