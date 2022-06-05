import clsx from "clsx";
import React from "react";
import { useTheme } from "../../../contexts/Theme";
import { ImageProps } from "./Image.interfaces";
import "./Image.styles.scss";

export const Image: React.FC<ImageProps> = ({
   src,
   alt,
   ext = ".png",
   external,
   className,
   ...props
}) => {
   const classes = clsx([
      {
         image: true,
      },
      className,
   ]);
   const { theme } = useTheme();

   const source = () => {
      try {
         return external && src
            ? src
            : require(`../../../assets/images/${theme}/${src}${ext}`);
      } catch (e) {
         return require(`../../../assets/images/${theme}/not-found.svg`);
      }
   };

   return (
      <img
         loading="lazy"
         className={classes}
         src={source()}
         alt={alt}
         {...props}
      />
   );
};
