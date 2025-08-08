import {
  Outlet,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import { useEffect } from "react";

import MainNavigation from "../components/MainNavigation";
import { getTokenDuration } from "../utils/auth";

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData();
  const submit = useSubmit();


  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED"){
      submit(null, {method: "post", action: "/logout"});
      return;
    }

    // Set timeout to token duration
    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);
    setTimeout(()=>{
      submit(null, {method: "post", action: "/logout"});
    }, tokenDuration);

  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

export const loader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    //return redirect('/auth');
  }
  return null;
};
