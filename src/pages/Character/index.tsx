import React, { useCallback, useEffect, useState } from "react";
import { Field } from "../../components/atoms/Field";
import { Select } from "../../components/atoms/Select";
import { Card, Navbar } from "../../components/molecules";
import { getCharacter } from "../../services/api";
import {
   RequestCharacter,
   ResultsCharacter,
} from "../../services/api.interfaces";
import "./styles.scss";

const Character: React.FC = () => {
   const [characters, setCharacters] = useState<ResultsCharacter[]>([]);
   const [shown, setShown] = useState<number>(6);
   const [page, setPages] = useState(1);
   const [limits, setLimits] = useState<{ pages: number; count: number }>();

   const handleCharacter = useCallback(async (params: RequestCharacter) => {
      await getCharacter(params)
         .then(({ info, results }) => {
            const { pages, count } = info;
            setLimits({ pages, count });
            return results;
         })
         .then((results) => {
            setCharacters((l) => {
               const newValue = !l?.length ? results : [...l, ...results];
               const filterValue = Array.from(
                  new Set(newValue.map((a) => a.id))
               ).map((id) => {
                  return newValue.find((a) => a.id === id);
               }) as ResultsCharacter[];
               return filterValue;
            });
         });
   }, []);

   const handleShown = () => {
      setShown((n) => {
         const newValue = n + 4;
         if (
            newValue > characters.length &&
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
         handleCharacter({ query: { page: String(newValue) } });
         return newValue;
      });
   };

   useEffect(() => {
      handleCharacter({});
   }, []);

   return (
      <>
         <Navbar />
         <section className="character__content container">
            <h2 className="character__title">Buscar Personagens</h2>
            <div className="character__row row col-md-9">
               <div className="col-md-12">
                  <Field
                     id="test"
                     type="text"
                     label="Buscar Personagens"
                     icon="search"
                  ></Field>
               </div>
               <div className="col-md-6">
                  <Select
                     data={[
                        { id: "alive", label: "Alive" },
                        { id: "dead", label: "Dead" },
                     ]}
                     label="Status"
                     className="character__select"
                  ></Select>
               </div>
               <div className="col-md-6">
                  <Select
                     data={[
                        { id: "female", label: "Female" },
                        { id: "male", label: "Male" },
                        { id: "genderless", label: "Genderless" },
                     ]}
                     label="Gênero"
                     className="character__select"
                  ></Select>
               </div>
            </div>
         </section>
         <section className="character__result ">
            <div className="container">
               <p>Resultados</p>
               <div className="cards">
                  {characters.slice(0, shown).map((character) => {
                     return (
                        <Card
                           variant="charecter"
                           image={{
                              src: character.image,
                              external: true,
                           }}
                           title={character.name}
                           status={character.status as "Alive" | "Dead"}
                        ></Card>
                     );
                  })}
               </div>
            </div>
         </section>
      </>
   );
};

export default Character;
