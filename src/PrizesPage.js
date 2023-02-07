import React, { useState } from "react";
import ContinueToPayment from "./ContinueToPayment";
import BonussCard from "./NoticeModal";
import Prizes from "./Prizes";
import AppBarPage from "./AppBarPage";
import NavigateRaffles from "./NavigateRaffles";
import {manager }from "./manager";
export default function PrizesPage(props) {
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [numOfSelectedPrizes, setNumOfSelectedPrizes] = useState(0);
  return (
    <>
      <AppBarPage numOfSelectedPrizes={numOfSelectedPrizes} />
    { JSON.parse(localStorage.getItem("currentUser")).user_password==manager.password&&
     JSON.parse(localStorage.getItem("currentUser")).user_email==manager.email&&<NavigateRaffles/>}
      <Prizes
        numOfSelectedPrizes={numOfSelectedPrizes}
        setNumOfSelectedPrizes={setNumOfSelectedPrizes}
        setShowNoticeModal={setShowNoticeModal}
        prizesArray={props.prizesArray}
      />
      <ContinueToPayment />
      {showNoticeModal && <BonussCard showNoticeModal={setShowNoticeModal} />}
    </>
  );
}
