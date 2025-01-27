/* eslint-disable react-refresh/only-export-components */
import React, { createContext, Dispatch, useContext, useReducer } from "react";

type ViewType = "grid" | "list";

interface ChangeViewAction {
  type: "switch";
}

const SearchViewContext = createContext<ViewType>("list");
const SearchViewDispatchContext = createContext<Dispatch<ChangeViewAction>>(
  () => {},
);

const searchViewReducer = (view: ViewType, action: ChangeViewAction) => {
  switch (action.type) {
    case "switch":
      return view === "grid" ? "list" : "grid";
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const useSearchView = () => useContext(SearchViewContext);
export const useSearchViewDispatch = () =>
  useContext(SearchViewDispatchContext);

export const SearchViewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [view, dispatch] = useReducer(searchViewReducer, "list");

  return (
    <SearchViewContext.Provider value={view}>
      <SearchViewDispatchContext.Provider value={dispatch}>
        {children}
      </SearchViewDispatchContext.Provider>
    </SearchViewContext.Provider>
  );
};
