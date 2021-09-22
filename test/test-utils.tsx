import { setupServer } from "msw/node";
import { rest } from "msw";


export * from "@testing-library/react";

export const mockServer = setupServer();

const country = {
  name: "Ecuador",
  alpha3Code: "ECU",
  capital: "Quito",
  region: "Americas",
  subregion: "South America",
  borders: ["COL", "PER"],
  flags: ["https://restcountries.eu/data/ecu.svg"],
};

const countriesListMock = rest.get(
  `https://restcountries.eu/rest/v2/all`,
  (_, res, ctx) => {
    return res(ctx.json([country]));
  }
);

const countryMock = rest.get(
  `https://restcountries.eu/rest/v2/alpha/ECU`,
  (_, res, ctx) => {
    return res(ctx.json(country));
  }
);

beforeAll(() => {
  mockServer.listen();
  mockServer.use(countriesListMock);
  mockServer.use(countryMock);
});

afterEach(() => {
  mockServer.resetHandlers();
});

afterAll(() => {
  mockServer.close();
});
