import { REST_COUNTRIES_API } from "../constants";
import axios from "axios";
import { Country } from "../types";

class CountriesApiService {
  public async getCountries(): Promise<Country[]> {
    return await axios
      .get(`${REST_COUNTRIES_API}all`)
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
      });
  }

  public async getCountry(alpha3Code: string): Promise<Country> {
    return await axios
      .get(`${REST_COUNTRIES_API}alpha/${alpha3Code}`)
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
      });
  }
}

export const CountriesApi = new CountriesApiService();
