import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import WithdrawMoney from "../../components/Shop/WithdrawMoney";
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="">
        <DashboardSideBar active={7} />
      </div>
       <WithdrawMoney />
    </div>
  </div>
  )
}

export default ShopWithDrawMoneyPage