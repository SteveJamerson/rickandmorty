import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Locations from "./Locations";
import NotFound from "./NotFound";

export const RoutesPages = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/locations" element={<Locations />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};
