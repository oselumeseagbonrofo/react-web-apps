import useFetch from "../hooks/useFetch.js";
import Places from "./Places.jsx";
import ErrorPage from "./Error.jsx";
import { sortPlacesByDistance } from "../../../04-extracting-code/src/loc.js";
import { fetchAvailablePlaces } from "../../../04-extracting-code/src/http.js";


const fetchSortedPlaces = async () =>{
      const places = await fetchAvailablePlaces();

    return new Promise((resolve) =>{
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          resolve(sortedPlaces);
    })
  })
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {isFetching, error, data: availablePlaces} = useFetch(fetchSortedPlaces, []);

  
    

  if (error) {
    return <ErrorPage title="Error" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching Place data"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
