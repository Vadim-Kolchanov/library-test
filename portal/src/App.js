import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navbar} from "./components/Navigation/Navbar";
import {Catalog} from "./pages/Catalog";
import LinksType from "./enums/links-type";
import {CatalogState} from "./context/catalog/CatalogState";

function App() {
  return (
      <CatalogState>
      <BrowserRouter>
          <Navbar/>
          <div className="container pt-4">
              <Routes>
                  <Route path={LinksType.CATALOG.to + '/:id'} element={<Catalog/>}/>
                  <Route path={LinksType.EDITOR_BOOK.to} element={(<div>Book</div>)}/>
                  <Route path={LinksType.EDITOR_AUTHOR.to} element={(<div>Author</div>)}/>

                  <Route path="*" element={<Catalog/>}/>
              </Routes>
          </div>
      </BrowserRouter>
      </CatalogState>
  );
}

export default App;
