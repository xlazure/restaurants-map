import axios from "axios";

export async function restaurantsApi(page) {
  const res = await axios.get(`http://localhost:3001/restaurants/${page}`);
  const isLoaded = { isLoaded: true };
  return {
    res,
    isLoaded,
  };
}
export async function restaurantsApiAll() {
  const res = await axios.get("http://localhost:3001/restaurants");
  const isLoaded = { isLoaded: true };
  return {
    res,
    isLoaded,
  };
}
