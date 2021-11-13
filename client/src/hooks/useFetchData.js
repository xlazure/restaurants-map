import { restaurantsApi } from "../api/restaurantsApi";
import { useCallback, useState } from "react";

export function useFetchData(initialValue) {
  const [fetchData, setFetchData] = useState();

  const fillData = useCallback(
    async () => setFetchData(await restaurantsApi(initialValue)),
    [initialValue]
  );
  return [fetchData, fillData];
}
