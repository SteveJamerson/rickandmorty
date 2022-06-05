import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonProps } from "./Button.interfaces";
import "./Button.styles.scss";

export const Button: React.FC<ButtonProps> = ({
   className,
   variant = "primary",
   text,
   link,
   type = "button",
   loading = false,
   disabled,
   children,
   ...props
}) => {
   const buttonRef = useRef<HTMLButtonElement>(null);
   const navigate = useNavigate();

   const redirect = () => {
      if (link) {
         navigate(link);
      }
   };

   const classes = clsx([
      {
         button: true,
         [`button--${variant}`]: variant,
         [`button--loading`]: loading,
      },
      className,
   ]);

   useEffect(() => {
      buttonRef.current?.addEventListener("click", () => {
         redirect();
      });
   }, []);

   return (
      <button
         ref={buttonRef}
         className={classes}
         type={type}
         disabled={loading || disabled}
         {...props}
      >
         {text || children}
      </button>
   );
};
