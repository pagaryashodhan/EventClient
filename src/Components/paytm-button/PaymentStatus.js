import React, { useEffect, useState } from "react";
import { db } from "./firebase";
// import { collection } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const PaymentStatus = () => {
  const orderId = useParams().orderId;
  console.log(orderId);
  const [user, setUserData] = useState();
  const [values, setValues] = useState({
    success: false,
    error: false,
  });
  const url = "https://api.pccoeieee.org";
  const navigator = useNavigate();
  useEffect(() => {
    getStatus();
  }, []);
  const { success, error } = values;
  const getStatus = async () => {
    const citiesCol = collection(db, "payments");
    const citySnapshot = await getDocs(citiesCol);
    citySnapshot.docs.map((doc) => {
      if (doc) {
        doc.data().paymentHistory.map(async (payment) => {
          if (payment.ORDERID.toString() === orderId.toString()) {
            if (payment.STATUS === "TXN_SUCCESS") {
              const data = JSON.parse(localStorage.getItem("data"));
              const userToken = localStorage.getItem("token");
              await axios
                .post(`${url}/event/register/${data.eventId}`, {
                  emails: data.emails,
                  referal: data.referal,
                  payload: data.payload,
                })
                .then(async (response) => {
                  console.log(response);
                  await axios
                    .post(`${url}/payment/create-receipt`, {
                      transaction_id: orderId,
                      amount: data.amount,
                      event_name: data.eventName,
                      payment_mode: "upi",
                      user_id: jwtDecode(userToken).id,
                      team_members: data.emails,
                    })
                    .then((res) => {
                      console.log(res);
                      //TODO: add toast
                      navigator("/profile");
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => {
                  //TODO: add error toast
                  console.log(error);
                });
              setValues({ ...values, success: true, error: false });
            } else {
              setValues({ ...values, success: false, error: "Payment Failed" });
            }
          }
        });
      } else {
        setValues({ ...values, success: false, error: "Payment Failed" });
      }
    });
  };

  return (
    <div>
      {success && <h1>Payment Succesfully</h1>}
      {error && <h1>{error}</h1>}
    </div>
  );
};

export default PaymentStatus;
