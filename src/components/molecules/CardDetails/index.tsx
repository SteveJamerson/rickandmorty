import clsx from "clsx";
import React from "react";
import { Icon, Image } from "../../atoms";
import { CardDetailsProps } from "./CardDetails.interfaces";
import "./CardDetails.styles.scss";

export const CardDetails: React.FC<CardDetailsProps> = ({
   image,
   title,
   subtitle,
   status,
   gender,
   close,
   className,
   children,
   ...props
}) => {
   const classes = clsx([
      {
         "card--details": true,
      },
      className,
   ]);

   return (
      <div className={classes} {...props}>
         <Icon
            className="card--details__clone"
            name="close"
            size={36}
            onClick={(e) => close(e)}
         />
         <div className="card--details__image">
            <Image
               src={image?.src}
               external={image?.external}
               ext={image?.ext}
            ></Image>
         </div>
         <div className="card--details__text">
            <p className="card--details__title">{title}</p>
            <p className="card--details__subtitle">{subtitle}</p>
            <p className={`card--details__status ${status?.toLowerCase()}`}>
               {status}
            </p>
            <p className="card--details__label">Gênero:</p>
            <p className="card--details__gender">{gender}</p>
            {children}
         </div>

         <div className="card--details__extra"></div>
      </div>
   );
};
