import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FooterProps } from "./Footer.interfaces";
import "./Footer.styles.scss";

export const Footer: React.FC<FooterProps> = ({
   className,
   children,
   variant = "default",
   ...props
}) => {
   const navigate = useNavigate();

   const classes = clsx([
      {
         footer: true,
         [`footer--${variant}`]: variant,
      },
      className,
   ]);

   return (
      <footer className={classes} {...props}>
         ©rickandmortyapi.com
      </footer>
   );
};
