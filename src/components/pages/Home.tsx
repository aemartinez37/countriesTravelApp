import React, { useEffect } from "react";
import { Countries } from "../CountriesList";
import { useAppContext } from "../../app-context/AppContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const appContext = useAppContext();

  useEffect(() => {
    appContext.resetTravel();
  }, []);

  return (
    <div>
      <Link to="/compliance-dashboard">Compliance Dashboard</Link>
      <Countries />
    </div>
  );
};
