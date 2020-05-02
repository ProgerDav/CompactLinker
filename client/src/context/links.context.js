import { createContext } from "react";

function noop() {}

export const LinksContext = createContext({
  links: [],
  filteredLinks: [],
  search: noop,
  order: noop,
  pushLink: noop,
  removeLink: noop,
});
