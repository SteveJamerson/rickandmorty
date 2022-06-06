import React, { useCallback, useEffect, useState } from "react";
import { Field } from "../../components/atoms/Field";
import { Select } from "../../components/atoms/Select";
import { Card, Footer, Navbar } from "../../components/molecules";
import { getCharacter } from "../../services/api";
import {
   RequestCharacter,
   ResultsCharacter,
} from "../../services/api.interfaces";
import "./styles.scss";

interface FormData {
   name: string;
   status: string;
   gender: string;
}

const Character: React.FC = () => {
   const [formData, setFormData] = useState<FormData>({
      name: "",
      status: "",
      gender: "",
   });

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

   const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();

      setFormData((data) => {
         const { name, value } = event.currentTarget;
         data[name as "name" | "status" | "gender"] = value;
         setCharacters([]);
         setPages(1);
         setShown(6);
         handleCharacter({ query: data } as RequestCharacter);
         return data;
      });
   };

   useEffect(() => {}, []);

   return (
      <>
         <Navbar />
         <section className="character__content container">
            <h2 className="character__title">Buscar Personagens</h2>

            <div className="character__row row col-md-9">
               <div className="col-md-12">
                  <Field
                     id="name"
                     name="name"
                     type="text"
                     label="Buscar Personagens"
                     icon="search"
                     defaultValue={formData.name}
                     onChange={handleSearch}
                  ></Field>
               </div>
               <div className="col-md-6">
                  <Select
                     id="status"
                     name="status"
                     data={[
                        { value: "alive", label: "Alive" },
                        { value: "dead", label: "Dead" },
                     ]}
                     label="Status"
                     className="character__select"
                     onChange={handleSearch}
                     defaultValue={formData.status}
                  ></Select>
               </div>
               <div className="col-md-6">
                  <Select
                     id="gender"
                     name="gender"
                     data={[
                        { value: "female", label: "Female" },
                        { value: "male", label: "Male" },
                        { value: "genderless", label: "Genderless" },
                     ]}
                     label="Gênero"
                     className="character__select"
                     onChange={handleSearch}
                     defaultValue={formData.gender}
                  ></Select>
               </div>
            </div>
         </section>
         {characters.length ? (
            <section className="character__result ">
               <div className="container">
                  <p>Resultados</p>
                  <div className="cards">
                     {characters.slice(0, shown).map((character, i) => {
                        return (
                           <Card
                              key={i}
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
         ) : (
            ""
         )}
         <Footer variant={characters.length ? "black" : "default"} />
      </>
   );
};

export default Character;
