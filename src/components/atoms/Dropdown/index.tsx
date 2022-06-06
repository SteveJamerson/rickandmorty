import clsx from "clsx";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "../Icon";
import { DropdownProps } from "./Dropdown.interfaces";
import "./Dropdown.styles.scss";

export const Dropdown: React.FC<DropdownProps> = ({
   data,
   value,
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
         dropdown: true,
         open: opened,
      },
      className,
   ]);

   const [selectedItem, setDropdownedItem] = useState<string>();

   const toggleDropdown = () => setOpened(!opened);

   const handleItemClick = (id: string) => {
      selectedItem === id ? setDropdownedItem("") : setDropdownedItem(id);
      triggerValue(id);
   };

   const triggerValue = (id: string) => {
      return change(id);
   };

   useEffect(() => {
      setDropdownedItem(value);
   }, []);

   useLayoutEffect(() => {
      window.addEventListener("click", (e: any): void => {
         !dropRef.current?.contains(e.target) && setOpened(false);
      });
   }, []);

   return (
      <div className={classes} ref={dropRef} {...props}>
         <div
            className={`dropdown--header ${opened && "open"}`}
            onClick={toggleDropdown}
         >
            {selectedItem
               ? items?.find((item) => item.id === selectedItem)?.label
               : "Dropdown your destination"}
            <Icon name="arrow-down" size={12}></Icon>
         </div>
         <div className={`dropdown--body ${opened && "open"}`}>
            {items.map((item) => (
               <div
                  className={`dropdown--item ${
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
