import { useRef, useState, useCallback } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import ErrorPage from "./components/Error.jsx";
import { fetchUserPlaces, updateUserPlaces } from "./http.js";
import useFetch from "./hooks/useFetch.js";

function App() {
  const selectedPlace = useRef();

  const {isFetching, error, data, setData} = useFetch(fetchUserPlaces, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setData((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    try {
      await updateUserPlaces([selectedPlace, ...data]);

    } catch (error) {
      setData(data); // Optimistic updating provides for better UI. Updates locally first before remote update
      setErrorUpdatingPlaces({
        message: error.message || "Failed to update places.",
      });
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setData((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );
    try {
    await updateUserPlaces(
      data.filter((place) => place.id !== selectedPlace.current.id)
    );
  } catch (error) {
    setData(data);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to update places.",
      });
    }

    setModalIsOpen(false);
  }, [data, setData]);

  const handleError = () => {
    setErrorUpdatingPlaces(null);
  };

  

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <ErrorPage
            title="An error occurred!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <ErrorPage title="An error occurred!" message={error.message} />}
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isLoading={isFetching}
          loadingText="Fetching your places..."
          places={data}
          onSelectPlace={handleStartRemovePlace}
        />
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
