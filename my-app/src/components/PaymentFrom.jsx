import React from "react";

const Payment = ({ amount, packageDetails }) => {
   const loadRazorpayScript = () => {
      return new Promise((resolve) => {
         const script = document.createElement("script");
         script.src = "https://checkout.razorpay.com/v1/checkout.js";
         script.onload = () => resolve(true);
         script.onerror = () => resolve(false);
         document.body.appendChild(script);
      });
   };

   const handlePayment = async () => {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
         alert("Failed to load Razorpay SDK. Please try again.");
         return;
      }

      // API call to create a payment order
      const response = await fetch("http://localhost:4600/create-order", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!response.ok || !data) {
         alert("Failed to initiate payment. Please try again.");
         return;
      }

      const options = {
         key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay API key
         amount: data.amount,
         currency: data.currency,
         name: "TraveCo.",
         description: `Payment for ${packageDetails.title}`,
         image: "https://your-logo-url.com/logo.png", // Optional logo URL
         order_id: data.id,
         handler: function (response) {
            alert("Payment Successful!");
            console.log("Payment Details:", response);
         },
         prefill: {
            name: "Customer Name", // Replace with dynamic customer name
            email: "customer.email@example.com", // Replace with dynamic customer email
            contact: "1234567890", // Replace with dynamic customer phone number
         },
         theme: {
            color: "#3399cc",
         },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
   };

   return (
      <div>
         <button
            onClick={handlePayment}
            className="px-4 py-2 text-white transition bg-teal-500 rounded hover:bg-teal-600"
         >
            Pay ₹{amount}
         </button>
      </div>
   );
};

export default Payment;
