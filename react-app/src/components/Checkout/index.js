import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {loadAllAddresses} from "../../store/address"


function Checkout() {

  const dispatch = useDispatch()
  const userId = useSelector(state => state.session.user.id)

  useEffect(() => {
    await dispatch()
  }, [])


  return (
    <>

    </>
  );
}

export default Checkout;
