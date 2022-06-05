import React from "react";
import { Button, Image } from "../../components/atoms";
import { Navbar } from "../../components/molecules/Navbar";
import "./styles.scss";

const Home: React.FC = () => {
   return (
      <>
         <Navbar />
         <section className="home__content container">
            <h2 className="home__title">
               Está preparado para navegar no mundo de Rick and Morty ?
            </h2>
            <Image src="rick-and-morty" ext=".png" className="front" />
            <Button link="personsagens">Iniciar Aventura</Button>
            <p className="fw-600">©rickandmortyapi.com</p>
         </section>
      </>
   );
};

export default Home;
