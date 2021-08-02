import { AppContextType, Country } from "./types";

export function travelAvailableCountries(
  this: AppContextType,
  allCountries: Country[]
) {
  return this.visitedCountries.length > 0
    ? (this.currentCountry!.borders
        ? allCountries.filter((country: Country) =>
            this.currentCountry!.borders.includes(country.alpha3Code)
          )
        : []
      ).filter((country: Country) => {
        return !this.visitedCountries
          .map((x: Country) => x.alpha3Code)
          .includes(country.alpha3Code);
      })
    : allCountries;
}
