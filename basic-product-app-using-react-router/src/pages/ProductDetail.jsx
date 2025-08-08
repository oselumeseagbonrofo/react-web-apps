import { useParams, Link } from "react-router-dom";

const ProductDetailPage = () =>{
    const params = useParams();
    return(
        <>
        <h1>Product {params.id} </h1>
        <p><Link to=".." relative="path">Back (Relative to url path)</Link></p>
        <p><Link to=".." relative="route">Back (Relative to parent route)</Link></p>
        <p><Link to="..">Back (Default- parent route)</Link></p>
        </>
    )
}

export default ProductDetailPage;