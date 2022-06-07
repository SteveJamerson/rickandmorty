import clsx from "clsx";
import React from "react";
import { ModalProps } from "./Modal.interfaces";
import "./Modal.styles.scss";

export const Modal: React.FC<ModalProps> = ({
   className,
   children,
   ...props
}) => {
   const classes = clsx([
      {
         modal: true,
      },
      className,
   ]);

   return (
      <div className={classes} {...props}>
         {children}
      </div>
   );
};
