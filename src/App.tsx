import React from "react";
import { Home } from "./components/pages/Home";
import { CountryInfo } from "./components/pages/CountryInfo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContextProvider } from "./app-context/AppContext";
import { AppError } from "./components/app-erros";
import { ErrorBoundary } from "react-error-boundary";

export const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <ErrorBoundary
          FallbackComponent={AppError}
          onReset={() => {
            window.location.href = "/";
          }}
        >
          <Switch>
            <Route path={"/:countryAlpha3Code"}>
              <CountryInfo />
            </Route>
            <Route path={"/"}>
              <Home />
            </Route>
          </Switch>
        </ErrorBoundary>
      </Router>
    </AppContextProvider>
  );
};

export default App;
