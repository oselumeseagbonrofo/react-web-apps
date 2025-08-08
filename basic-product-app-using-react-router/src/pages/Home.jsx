import { useNavigate } from "react-router-dom";

const Home = () =>{
    const navigate = useNavigate();

    const navigateHandler = () =>{
        navigate("products");
    }

    return(
        <>
        <h1>Home Page</h1>
        <button onClick={navigateHandler}>Go to Products</button>
        </>
    )
}

export default Home;