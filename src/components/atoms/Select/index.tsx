import clsx from "clsx";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "../Icon";
import { SelectProps } from "./Select.interfaces";
import "./Select.styles.scss";

export const Select: React.FC<SelectProps> = ({
   data,
   defaultValue,
   label,
   id,
   name,
   className,
   loading = false,
   change,
   fieldRef,
   disabled,
   children,
   ...props
}) => {
   const dropRef = useRef<HTMLDivElement>(null);
   const selectRef = useRef<HTMLInputElement>(fieldRef);

   const [opened, setOpened] = useState(false);
   const [items, setItem] = useState<
      {
         value: string;
         label: string;
      }[]
   >(data);

   const classes = clsx([
      {
         select: true,
         open: opened,
      },
      className,
   ]);

   const [selectedItem, setSelectedItem] = useState<string>();

   const toggleSelect = () => setOpened(!opened);

   const handleItemClick = (e: any) => {
      const id = e.target.id;
      selectedItem === id ? setSelectedItem("") : setSelectedItem(id);
      props.onChange && props.onChange(e);
   };

   useEffect(() => {
      setSelectedItem(defaultValue || "");
   }, []);

   useLayoutEffect(() => {
      window.addEventListener("click", (e: any): void => {
         !dropRef.current?.contains(e.target) && setOpened(false);
      });
   }, []);

   return (
      <div className={classes} ref={dropRef}>
         <div
            className={`select--header ${opened && "open"}`}
            onClick={toggleSelect}
         >
            <label
               htmlFor=""
               className={selectedItem || opened ? "caption" : ""}
            >
               {label}
            </label>
            {selectedItem
               ? items?.find((item) => item.value === selectedItem)?.label
               : ""}
            <input
               hidden
               id={id}
               name={name}
               ref={selectRef}
               type="text"
               readOnly
               defaultValue={
                  selectedItem
                     ? items?.find((item) => item.value === selectedItem)?.value
                     : ""
               }
            />

            <Icon name="arrow-down" size={8}></Icon>
         </div>
         <div className={`select--body ${opened && "open"}`}>
            {items.map((item) => (
               <>
                  <label
                     htmlFor={item.value}
                     className={`select--item ${
                        selectedItem === item.value && "active"
                     }`}
                  >
                     {item.label}
                  </label>
                  <input
                     hidden
                     onClick={(e) =>
                        !(selectedItem === item.value) && handleItemClick(e)
                     }
                     name={name}
                     id={item.value}
                     key={item.value}
                     defaultValue={item.value}
                  />
               </>
            ))}
         </div>
      </div>
   );
};
