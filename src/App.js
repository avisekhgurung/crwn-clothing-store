import Home from "./routes/Home/Home";
import {Routes, Route} from "react-router-dom"
import Navigation from "./routes/Navigation/Navigation";
import Authentication from "./routes/Authentication/Authentication";
import Shop from "./Shop/Shop";
import Checkout from "./routes/Checkout/Checkout";





const App = () => {
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