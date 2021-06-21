import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Country } from "../../types";
import { CountriesApi } from "../../services/ApiCountries";
import { Card } from "react-bootstrap";
import { useAppContext } from "../../app-context/AppContext";
import { Countries } from "../CountriesList";

export const CountryInfo = () => {
  const appContext = useAppContext();
  const { countryAlpha3Code } = useParams<{ countryAlpha3Code: string }>();
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    CountriesApi.getCountry(countryAlpha3Code)
      .then((data: Country) => {
        appContext.updateTravel(data);
        setCountry(data);
      })
      .catch((err) => {
        console.log(err);
        setCountry(null);
      });
  }, [countryAlpha3Code]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Card style={{ width: "60rem", margin: "auto" }}>
        <Card.Img variant="top" src={country.flag} alt={country.name} />
        <Card.Body>
          <Card.Title>{country.name}</Card.Title>
          <Card.Text style={{ textAlign: "left" }}>
            <p>
              <strong>Capital: </strong>
              {country.capital}
            </p>
            <p>
              <strong>Borders: </strong>
              <Countries />
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
      {/* <div>{appContext.visitedCountries}</div> */}
    </div>
    //   <Link to={"/"}> &#8592; Back </Link>
  );
};
