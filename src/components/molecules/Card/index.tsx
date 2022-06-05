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
      <div className={classes}>
         <div className="card__image">
            <Image
               src={image.src}
               external={image.external}
               ext={image.ext}
            ></Image>
         </div>
         <div className="card__text">
            <p className="card__title">{title}</p>
            <p className="card__subtitle">{subtitle}</p>
            {children}
         </div>
      </div>
   );
};
