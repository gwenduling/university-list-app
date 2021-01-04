import { Route, Switch, BrowserRouter } from "react-router-dom";

import Home from "./pages/home/home";
import Universities from "./pages/universities/universities";
import Countries from "./pages/countries/countries";
import CountryUniversity from "./pages/country-university/country-university";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import NewsLetter from "./components/newsletter/newsletter";

import "./app.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="main">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/universities">
              <Universities />
            </Route>
            <Route exact path="/countries">
              <Countries />
            </Route>
            <Route
              path="/countries/:code"
              render={(props) => <CountryUniversity {...props} />}
            ></Route>
            <Route path="/:id">
              <Home />
            </Route>
          </Switch>
        </div>
        <NewsLetter />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
