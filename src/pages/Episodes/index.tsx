import React, { useCallback, useEffect, useState } from "react";
import { Button, Dropdown } from "../../components/atoms";
import { Card, Navbar } from "../../components/molecules";
import { getEpisode } from "../../services/api";
import { RequestEpisode, ResultsEpisode } from "../../services/api.interfaces";
import "./styles.scss";

const Episodes: React.FC = () => {
   const [episodes, setEpisodes] = useState<ResultsEpisode[]>([]);
   const [shown, setShown] = useState<number>(6);
   const [page, setPages] = useState(1);
   const [limits, setLimits] = useState<{ pages: number; count: number }>();
   const [season, setSeason] = useState("01");

   const data = [
      { id: "01", label: "Temporada 1" },
      { id: "02", label: "Temporada 2" },
      { id: "03", label: "Temporada 3" },
      { id: "04", label: "Temporada 4" },
      { id: "05", label: "Temporada 5" },
   ];

   const handleEpisode = useCallback(async (params: RequestEpisode) => {
      await getEpisode(params)
         .then(({ info, results }) => {
            const { pages, count } = info;
            setLimits({ pages, count });
            return results;
         })
         .then((results) => {
            setEpisodes((l) => {
               const newValue = !l?.length ? results : [...l, ...results];
               const filterValue = Array.from(
                  new Set(newValue.map((a) => a.id))
               ).map((id) => {
                  return newValue.find((a) => a.id === id);
               }) as ResultsEpisode[];
               return filterValue;
            });
         });
   }, []);

   const handleShown = () => {
      setShown((n) => {
         const newValue = n + 4;
         console.log(limits?.count, newValue);

         if (
            newValue > episodes.length &&
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

         handleEpisode({
            query: { page: String(newValue), episode: `S${season}` },
         });

         return newValue;
      });
   };

   const handleSeason = (value: string) => {
      console.log(value);
      setEpisodes([]);
      setPages(1);
      setShown(6);
      setSeason(value);
      handleEpisode({ query: { episode: `S${value}` } });
   };

   const handleImage = (url: string) => {
      return url ? url.replace("episode/", "character/avatar/") + ".jpeg" : "";
   };

   useEffect(() => {
      handleEpisode({ query: { episode: `S${season}` } });
   }, []);

   return (
      <>
         <Navbar />
         <section className="episode__content container">
            <h2 className="episode__title">Episódios</h2>

            <Dropdown
               data={data}
               value="01"
               className="episode__select"
               change={(value: string) => {
                  handleSeason(value);
               }}
            ></Dropdown>

            <div className="cards">
               {episodes.slice(0, shown).map((location, i) => {
                  return (
                     <Card
                        key={i}
                        variant="location"
                        image={{
                           src: handleImage(location.url),
                           external: true,
                        }}
                        title={location.name}
                        subtitle={`Lançamento ${location.air_date}`}
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

export default Episodes;
