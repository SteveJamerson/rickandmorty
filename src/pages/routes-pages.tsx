import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";

export const RoutesPages = () => {
   return (
      <Routes>
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};
