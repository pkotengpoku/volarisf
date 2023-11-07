import React from 'react'
import Header from '../components/Layout/Header'
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import BuyNow from '../components/Checkout/BuyNow';
import Footer from '../components/Layout/Footer';

const BuyNowPage = () => {
  return (
    <div>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={1} />
        <BuyNow />
        <br />
        <br />
        <Footer />
    </div>
  )
}

export default BuyNowPage