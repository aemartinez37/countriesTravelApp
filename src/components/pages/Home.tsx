import React, { useEffect } from "react";
import { Countries } from "../CountriesList";
import { useAppContext } from "../../app-context/AppContext";

export const Home = () => {
  const appContext = useAppContext();

  useEffect(() => {
    appContext.resetTravel();
  }, []);

  return <Countries />;
};
