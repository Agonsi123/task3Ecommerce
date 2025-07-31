import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useDispatch } from "react-redux";
import {login, logout} from "./store/authSlice";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/home/Homepage";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import SignUp from "./pages/signUp/SignUp";
import Account from "./pages/account/Account";
import Wishlist from "./pages/wishlist/Wishlist";
import SCart from "./pages/sCart/SCart";
import NotFound from "./pages/notfound/NotFound";
import ProductDetails from "./pages/productDetails/ProductDetails";
import ProtectedRoute from "./components/ProtectedRoute";





function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            name: user.name || '',
            identifier: user.email || user.phoneNumber
          })
        );
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });

    return() => unsubscribe();
  }, []);


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/scart" element={<SCart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
