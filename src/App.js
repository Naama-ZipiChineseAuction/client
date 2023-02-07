import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppBarPage from "./AppBarPage";
import PaymentPage from "./PaymentPage";
import PrizesPage from "./PrizesPage";
import RafflesPage from "./RafflesPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function App() {
  const [prizesArray, setPrizesArray] = useState()
  useEffect(() => {
    fetch('http://localhost:4500/products/getAllProducts')
      .then(res => res.json())
      .then(res => {
        setPrizesArray(res.map(e => ({ ...e, isSelected: false })))
        console.log(prizesArray)
      })
  }, []);
  return (
    <>
      <Routes>
        <Route path="Prizes" element={<PrizesPage prizesArray={prizesArray} />} />
        <Route
          path="PaymentPage"
          element={<PaymentPage prizesArray={prizesArray} />}
        />
        <Route
          path="RafflesPage"
          element={<RafflesPage prizesArray={prizesArray} />}
        />
        <Route path="" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="signIn" element={<SignIn />} />

      </Routes>
    </>
  );
}
