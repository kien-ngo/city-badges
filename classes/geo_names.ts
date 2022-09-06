import { Continent } from "./continents";

type Props = {
  [key in Continent]: {
    [key in string]?: any;
  };
};
export const GEO_NAMES: Props = {
  Africa: {},
  Asia: {},
  "North America": {},
  Europe: {},
  Oceania: {},
  "South America": {},
};
