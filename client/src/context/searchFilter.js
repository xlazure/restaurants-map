import { createContext } from "react";
export const SearchFilter = createContext({
  cuisine: "",
  name: "",
  onChange: () => {},
});
