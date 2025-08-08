const { redirect } = require("react-router-dom");

export const action = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return redirect("/");
}