/* eslint-disable react-hooks/rules-of-hooks */
import clsx from "clsx";
import React, { useCallback, useRef, useState } from "react";
import { Icon } from "../Icon";
import { FieldProps } from "./Field.interfaces";
import "./Field.styles.scss";

export const Field: React.FC<FieldProps> = ({
   className,
   variant = "outline",
   type = "text",
   id,
   label,
   icon,
   disabled,
   value,
   ...props
}) => {
   const inputRef = useRef<HTMLInputElement>(null);
   const [isField, setIsField] = useState(false);
   const [isFocused, setIsFocused] = useState(false);

   const classes = clsx([
      {
         field: true,
      },
      className,
   ]);

   const handleInputFocus = useCallback(() => {
      setIsFocused(true);
   }, []);

   const handleInputBlur = useCallback(() => {
      setIsFocused(false);
      setIsField(!!inputRef.current?.value);
   }, []);

   return (
      <>
         <div className={classes}>
            {icon && <Icon name={icon}></Icon>}
            <input
               onFocus={handleInputFocus}
               onBlur={handleInputBlur}
               type={type}
               id={id}
               disabled={disabled}
               ref={inputRef}
               defaultValue={value}
               {...props}
            ></input>

            {label && (
               <label
                  htmlFor={id}
                  className={isFocused || isField ? "caption" : "placeholder"}
               >
                  {label}
               </label>
            )}
         </div>
      </>
   );
};
