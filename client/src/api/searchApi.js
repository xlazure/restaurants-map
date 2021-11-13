import axios from "axios";

export async function serachApi(term = "New York") {
  const res = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&`,
    {
      params: {
        q: term,
      },
    }
  );
  return res;
}
