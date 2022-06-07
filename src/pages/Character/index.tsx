import React, { useCallback, useEffect, useState } from "react";
import { Field, Select } from "../../components/atoms";
import {
   Card,
   CardDetails,
   Footer,
   Modal,
   Navbar,
} from "../../components/molecules";
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
   const [shown, setShown] = useState<number>(0);
   const [page, setPages] = useState(1);
   const [limits, setLimits] = useState<{ pages: number; count: number }>();
   const [charactersDetails, setCharactersDetails] =
      useState<ResultsCharacter>();
   const [charactersShow, setCharactersShow] = useState(false);

   const handleCharacter = useCallback(
      async (params: RequestCharacter) => {
         await getCharacter(params)
            .then(({ info, results }) => {
               const { pages, count } = info;
               setLimits({ pages, count });
               return results;
            })
            .then((results) => {
               const newValue = !characters?.length
                  ? results
                  : [...characters, ...results];
               const filterValue = Array.from(
                  new Set(newValue.map((a) => a.id))
               ).map((id) =>
                  newValue.find((a) => a.id === id)
               ) as ResultsCharacter[];
               return filterValue;
            })
            .then((results) => {
               setCharacters(results);
            });
      },
      [characters]
   );
   const handleDetails = useCallback((chr: ResultsCharacter) => {
      console.log(chr);

      setCharactersDetails(chr);
      setCharactersShow((s) => !s);
   }, []);

   const handleShown = (n: number) => {
      setShown((_) => {
         const newValue = n;
         console.log(newValue);

         if (
            newValue + 6 >= characters.length &&
            !(newValue >= (limits?.count as number))
         ) {
            handlePage(newValue);
         }
         return newValue;
      });
   };

   const handlePage = (page: number) => {
      setPages((_) => {
         const newValue = page ? (((page + 6) / 20) | 0) + 1 : 1;
         handleCharacter({
            query: { ...formData, page: String(newValue) },
         } as RequestCharacter);
         return newValue;
      });
   };

   const handleSearch = useCallback(
      (event: React.FormEvent<HTMLInputElement>) => {
         event.preventDefault();
         const { name, value } = event.currentTarget;

         setFormData((data) => {
            data[name as "name" | "status" | "gender"] = value;
            return data;
         });

         handleSubmit();
      },
      []
   );

   const handleSubmit = useCallback(() => {
      setCharacters([]);
      setPages(1);
      setShown(0);
      handleCharacter({ query: formData } as RequestCharacter);
   }, []);

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
                     {characters.slice(shown, shown + 6).map((character, i) => {
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
                              onClick={() => handleDetails(character)}
                           >
                              {character?.first}
                           </Card>
                        );
                     })}
                  </div>
                  <div className="dots">
                     {Array.from(
                        { length: characters.length / 6 + 1 },
                        (_, i) => i
                     ).map((index, i) => {
                        return (
                           <input
                              className="dot"
                              key={i}
                              type="radio"
                              name="dots"
                              checked={shown === index * 6}
                              onClick={() => handleShown(index * 6)}
                           />
                        );
                     })}
                  </div>
               </div>
            </section>
         ) : (
            ""
         )}
         {charactersShow ? (
            <Modal>
               <CardDetails
                  title={charactersDetails?.name}
                  status={charactersDetails?.status as "Alive" | "Dead"}
                  gender={
                     charactersDetails?.gender as
                        | "female"
                        | "male"
                        | "genderless"
                  }
                  image={{
                     src: charactersDetails?.image as string,
                     external: true,
                  }}
                  close={() => {
                     setCharactersShow(false);
                  }}
               ></CardDetails>
            </Modal>
         ) : (
            ""
         )}
         <Footer variant={characters.length ? "black" : "default"} />
      </>
   );
};

export default Character;
