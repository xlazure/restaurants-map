import styled from "styled-components";
import { useRef, useContext } from "react";
import { CurrentPage } from "../../context/CurrentPage";

export default function List(props) {
  const { page, setPage, status, setStatus } = useContext(CurrentPage);
  let currPage = page;
  const percentageScroll = useRef();

  async function newPageOnScroll(element) {
    const elementHeight =
      element.current.scrollHeight - element.current.clientHeight;
    if (Math.round(element.current.scrollTop) === elementHeight) {
      setStatus(!status);
      setPage(currPage + 1);
    }
  }

  function Cart(el) {
    return (
      <CartStyle
        onClick={() => {
          props.moveTo(el.address.coord);
        }}
      >
        <p>Name: {el.name}</p>
        <p>City: {el.borough}</p>
        <p>Cuisine: {el.cuisine}</p>
      </CartStyle>
    );
  }

  return (
    <div>
      {/* <Helper>
        <h2>Context Page: {page}</h2>
        <h2>Curr Page: {currPage}</h2>
      </Helper> */}
      <ListContainer
        ref={percentageScroll}
        onScroll={() => {
          newPageOnScroll(percentageScroll);
        }}
      >
        {props.restaurantData?.data
          ?.filter((el) => el.cuisine.includes(props.filterCuisine))
          .map((el, index) => {
            return <Cart key={index} {...el} />;
          })}
      </ListContainer>
    </div>
  );
}

// const Helper = styled.div`
//   position: fixed;
//   z-index: 1010;
//   top: 10em;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 500px;
//   height: 250px;
//   background: skyblue;
// `;
const ListContainer = styled.div`
  overflow-y: auto;
  height: 89.9vh;
  background: #fff;
`;

const CartStyle = styled.div`
  color: #054070;
  background: #f0f0f0;
  border: 0.15em solid #054070;
  width: 90%;
  margin: 1em auto 0 auto;
  border-radius: 5px;
  padding: 0.5em;
  box-shadow: 3px 3px 1px #0505057a;
  :hover {
    cursor: pointer;
    box-shadow: 4px 4px 4px #0505057a;
  }
`;
