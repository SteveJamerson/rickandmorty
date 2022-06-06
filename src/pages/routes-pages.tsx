import { Route, Routes } from "react-router-dom";
import Episodes from "./Episodes";
import Home from "./Home";
import Locations from "./Locations";
import NotFound from "./NotFound";

export const RoutesPages = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/locations" element={<Locations />} />
         <Route path="/episodes" element={<Episodes />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};
