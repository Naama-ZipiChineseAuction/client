import TotalPrice from "./TotalPrice";
import SubmitButton from "./SubmitButton";
import PricesTable from "./PricesTable";
import ThankYouModal from "./ThankYouModal";
import React, { useState,useEffect } from "react";
import BackButton from "./BackButton";
import AppBarPage from "./AppBarPage";
import NavigateRaffles from "./NavigateRaffles";
import {manager} from "./manager"

export default function PaymentPage(props) {
  const [shouldShowThankYouModal, setShouldShowThankYouModal] = useState(false);
  useEffect(() => {
   console.log(props.prizesArray)
  }, []);
  return (
    <>
      <AppBarPage>
        <BackButton />
      </AppBarPage>

      <PricesTable prizes={props.prizesArray} />
      <TotalPrice prizes={props.prizesArray} />
      <SubmitButton setShouldShowThankYouModal={setShouldShowThankYouModal} />
      {shouldShowThankYouModal && (
        <ThankYouModal
          prizesArray={props.prizesArray}
          setShouldShowThankYouModal={setShouldShowThankYouModal}
        />
      )}
      { JSON.parse(localStorage.getItem("currentUser")).user_password==manager.password&&
     JSON.parse(localStorage.getItem("currentUser")).user_email==manager.email&&<NavigateRaffles/>}
    </>
  );
}
