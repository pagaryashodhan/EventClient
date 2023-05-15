import { React, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentButton = (props) => {
  const location = useLocation();
  // console.log(location);
  const { amount } = location.state;
  console.log(location.state);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(location.state));
    console.log(localStorage.getItem("data"));
  });
  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

  const getData = async (data) => {
    try {
      const response = await fetch(
        `https://payments.pccoeieee.org/api/payment`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      return await response.json();
    } catch (err) {
      return console.log(err);
    }
  };

  const makePayment = () => {
    getData({ amount: amount, email: "abc@gmail.com" }).then((response) => {
      var information = {
        action: "https://securegw.paytm.in/order/process",
        params: response,
      };
      post(information);
    });
  };
  return (
    <div className="payment-button-screen">
      <div className="payment-page-wrapper">
        {/* <h3> Event Name : {location.state.event}</h3> */}
        <h3> Amount : {location.state.amount}</h3>
        <button onClick={makePayment}>PAY USING PAYTM {props.amount}</button>
      </div>
    </div>
  );
};

export default PaymentButton;
