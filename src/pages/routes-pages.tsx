import { Route, Routes } from "react-router-dom";
import Character from "./Character";
import Episodes from "./Episodes";
import Home from "./Home";
import Locations from "./Locations";
import NotFound from "./NotFound";

export const RoutesPages = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/character" element={<Character />} />
         <Route path="/episodes" element={<Episodes />} />
         <Route path="/locations" element={<Locations />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};
