import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../../components/atoms";
import { Card, Navbar } from "../../components/molecules";
import { getLocation } from "../../services/api";
import {
   RequestLocation,
   ResultsLocation,
} from "../../services/api.interfaces";
import "./styles.scss";

const Locations: React.FC = () => {
   const [locations, setLocations] = useState<ResultsLocation[]>([]);
   const [shown, setShown] = useState<number>(6);
   const [page, setPages] = useState(1);
   const [limits, setLimits] = useState<{ pages: number; count: number }>();

   const handleLocation = useCallback(async (params: RequestLocation) => {
      await getLocation(params)
         .then(({ info, results }) => {
            const { pages, count } = info;
            setLimits({ pages, count });
            return results;
         })
         .then((results) => {
            setLocations((l) => {
               const newValue = !l?.length ? results : [...l, ...results];
               const filterValue = Array.from(
                  new Set(newValue.map((a) => a.id))
               ).map((id) => {
                  return newValue.find((a) => a.id === id);
               }) as ResultsLocation[];
               return filterValue;
            });
         });
   }, []);

   const handleShown = () => {
      setShown((n) => {
         const newValue = n + 4;
         if (
            newValue > locations.length &&
            !(newValue >= (limits?.count as number))
         ) {
            handlePage();
         }
         return newValue;
      });
   };

   const handlePage = () => {
      setPages((page) => {
         const newValue = page + 1;
         handleLocation({ query: { page: String(newValue) } });
         return newValue;
      });
   };

   const handleImage = (url: string) => {
      return url
         ? url.replace("character/", "character/avatar/") + ".jpeg"
         : "";
   };

   useEffect(() => {
      handleLocation({});
   }, []);

   return (
      <>
         <Navbar />
         <section className="location__content container">
            <h2 className="location__title">Lugares Famosos de Rick & Morty</h2>

            <div className="cards">
               {locations.slice(0, shown).map((location, i) => {
                  return (
                     <Card
                        key={i}
                        variant="location"
                        image={{
                           src: handleImage(location.residents[0]),
                           external: true,
                        }}
                        title={location.name}
                        subtitle={`Dimensão: ${location.dimension.replace(
                           "Dimension",
                           ""
                        )}`}
                     ></Card>
                  );
               })}
            </div>

            <Button
               variant="terciary"
               iconName="arrow-down"
               iconSize={12}
               iconPosition="down"
               className="more"
               onClick={handleShown}
               disabled={shown >= (limits?.count || 0)}
            >
               Mostrar Mais
            </Button>
         </section>
      </>
   );
};

export default Locations;
