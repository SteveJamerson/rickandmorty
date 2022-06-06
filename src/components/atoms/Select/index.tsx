import clsx from "clsx";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "../Icon";
import { SelectProps } from "./Select.interfaces";
import "./Select.styles.scss";

export const Select: React.FC<SelectProps> = ({
   data,
   value,
   label,
   className,
   loading = false,
   change,
   disabled,
   children,
   ...props
}) => {
   const dropRef = useRef<HTMLDivElement>(null);

   const [opened, setOpened] = useState(false);
   const [items, setItem] = useState<
      {
         id: string;
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

   const handleItemClick = (id: string) => {
      selectedItem === id ? setSelectedItem("") : setSelectedItem(id);
      triggerValue(id);
   };

   const triggerValue = (id: string) => {
      return change && change(id);
   };

   useEffect(() => {
      setSelectedItem(value || "");
   }, []);

   useLayoutEffect(() => {
      window.addEventListener("click", (e: any): void => {
         !dropRef.current?.contains(e.target) && setOpened(false);
      });
   }, []);

   return (
      <div className={classes} ref={dropRef} {...props}>
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
               ? items?.find((item) => item.id === selectedItem)?.label
               : ""}
            <Icon name="arrow-down" size={8}></Icon>
         </div>
         <div className={`select--body ${opened && "open"}`}>
            {items.map((item) => (
               <div
                  className={`select--item ${
                     selectedItem === item.id && "active"
                  }`}
                  onClick={() =>
                     !(selectedItem === item.id) && handleItemClick(item.id)
                  }
                  id={item.id}
                  key={item.id}
               >
                  {item.label}
               </div>
            ))}
         </div>
      </div>
   );
};
