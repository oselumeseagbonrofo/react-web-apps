import useHttp from "../hooks/useHttp";

import Meal from "./Meal";
import Error from "./Error";

const requestConfig = {};

const Meals = () => {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Menu Loading</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <>
      {meals.map((meal) => {
        return (
          <div id="meals" key={meal.id}>
            <Meal meal={meal} />
          </div>
        );
      })}
    </>
  );
};

export default Meals;
