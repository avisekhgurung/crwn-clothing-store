import { useEffect } from "react";
import Home from "./routes/Home/Home";
import {Routes, Route} from "react-router-dom"
import Navigation from "./routes/Navigation/Navigation";
import Authentication from "./routes/Authentication/Authentication";
import Shop from "./Shop/Shop";
import Checkout from "./routes/Checkout/Checkout";
import { createUserDocumentFromAuth, onAuthStateChangedListner } from "./utils/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe =  onAuthStateChangedListner((user) => {
     if(user){
      createUserDocumentFromAuth(user);
     }
     dispatch(setCurrentUser(user))
    });
    return unsubscribe;
 },[])

  return ( 
    <Routes>
      <Route path="/" element={<Navigation/>}>
      <Route index element={<Home />} />
      <Route path="shop/*" element={<Shop/>} />
      <Route path="sign-in" element={<Authentication/>} />
      <Route path="checkout" element={<Checkout />} />
      </Route>

    </Routes>
  );
};

export default App;
