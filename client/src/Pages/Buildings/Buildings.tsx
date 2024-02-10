import BuildingsContent from "./BuildingsContent";

import BuildingsContextProvider from "../../Contexts/BuildingsContext";

import "../../styles/buildings.css";

export default function Buildings() {
  return (
    <BuildingsContextProvider>
      <h1 className="content-headline">Gebäude</h1>
      <BuildingsContent />
    </BuildingsContextProvider>
  );
}
