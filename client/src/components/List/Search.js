import { useEffect, useState } from "react";
// import { serachApi } from "../../api/searchApi";
import styled from "styled-components";

export default function Search(props) {
  const [filterCuisine, setfilterCuisine] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    function mountFilter() {
      const optionCuisine = [];
      setFilterData(props.serachFilterData);
      filterData?.data?.map((el) => optionCuisine.push(el.cuisine));
      const uniqueOptionCuisine = [...new Set(optionCuisine)];
      setfilterCuisine(uniqueOptionCuisine);
    }

    mountFilter();
  }, [props.serachFilterData, filterData?.data]);

  return (
    <OptionContainer>
      <h2>search </h2>
      <p>results: {filterData?.data?.length}</p>
      <Select
        onChange={(e) => {
          props.SelectCuisine(e.target.value);
        }}
      >
        <option value="">Cousine</option>
        {filterCuisine?.map((cuisine, index) => {
          return (
            <option key={index} value={cuisine}>
              {cuisine}
            </option>
          );
        })}
      </Select>
    </OptionContainer>
  );
}

const OptionContainer = styled.div`
  width: 90%;
  margin: 0 auto 0 auto;
`;
const Select = styled.select`
  max-width: 70%;
  padding: 0.2em;
  margin: 0.5em auto 0 auto;
`;
