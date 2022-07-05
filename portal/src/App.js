import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navbar} from "./components/Navigation/Navbar";
import {Catalog} from "./pages/Catalog";
import LinksType from "./enums/links-type";
import {LibraryState} from "./context/library/LibraryState";
import {Information} from "./pages/Information";

function App() {
  return (
      <LibraryState>
      <BrowserRouter>
          <Navbar/>
          <div className="container pt-4">
              <Routes>
                  <Route path={LinksType.CATALOG.to + '/:id'} element={<Catalog/>}/>
                  <Route path={LinksType.INFO.to} element={<Information/>}/>

                  <Route path="*" element={<Catalog/>}/>
              </Routes>
          </div>
      </BrowserRouter>
      </LibraryState>
  );
}

export default App;
