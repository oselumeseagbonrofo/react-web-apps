import { useEffect, useState } from "react";

const useFetch = (fetchFn, initialValue) =>{
    const [isFetching, setIsFetching] = useState();
    const [error, setError] = useState();
    const [data, setData] = useState(initialValue);

    useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
        try {
          const places = await fetchFn();
          setData(places);         
        } catch (e) {
          setError({
            message: e.message || "Could not fetch data. Please try again",
          });
      };

      setIsFetching(false);
  }
    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    error,
    data,
    setData,
  }
}

export default useFetch;