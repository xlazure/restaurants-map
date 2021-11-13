import { useState, useContext } from "react";
import List from "./List";
import Search from "./Search";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styled from "styled-components";
import { CurrentPage } from "../../context/CurrentPage";

export default function ListOverlay(props) {
  const [filterCuisine, setFilterCuisine] = useState("");
  const { status } = useContext(CurrentPage);

  async function moveTo(coords) {
    await props.mapRef.current.panTo({ lat: coords[1], lng: coords[0] });
    await props.mapRef.current.setZoom(16);
  }

  return (
    <>
      <Search
        status={props.isLoaded}
        serachFilterData={props.data}
        SelectCuisine={(value) => {
          setFilterCuisine(value);
          props.MapFilterByCuisine(value);
        }}
      />

      {status ? (
        <List
          restaurantData={props.data}
          filterCuisine={filterCuisine}
          moveTo={(coords) => {
            moveTo(coords);
          }}
        />
      ) : (
        <Loader>
          <AiOutlineLoading3Quarters
            className="animation"
            size="4em"
            color="#054070"
          />
          <h2>Loading...</h2>
        </Loader>
      )}
    </>
  );
}

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5em;
`;
