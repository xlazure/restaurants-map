import "./App.css";

import { useEffect, useRef, useState } from "react";
import { restaurantsApi } from "./api/restaurantsApi";
import styled from "styled-components";
import ListOverlay from "./components/List/main";
import Map from "./components/Map/Map";
import { CurrentPage } from "./context/CurrentPage";
function App() {
  const mapRef = useRef();
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [restaurantData, setRestaurantData] = useState();
  const [markerFilter, setMarkerFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData(initialValue = 1) {
      const { res, isLoaded } = await restaurantsApi(initialValue);
      setRestaurantData(res);
      setStatus(isLoaded);
    }
    fetchData(page);
    return () => {
      setRestaurantData([]);
    };
  }, [page]);

  return (
    <CurrentPage.Provider value={{ page, setPage, status, setStatus }}>
      <div className="App">
        <ListWithSearch>
          <ListOverlay
            isLoaded={isLoading}
            mapRef={mapRef}
            data={restaurantData}
            MapFilterByCuisine={(value) => setMarkerFilter(value)}
          />
        </ListWithSearch>
        <Map markerFilter={markerFilter} mapRef={mapRef} />
      </div>
    </CurrentPage.Provider>
  );
}

const ListWithSearch = styled.div`
  background: #fff;
  width: 35%;
`;
export default App;
