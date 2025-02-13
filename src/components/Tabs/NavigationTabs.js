"use client";

import React, { useState } from "react";
import HorizontalCategoryList from "../Categorylist";
import PopularProducts from "../PopularProducts";
import GetAllSubscription from "../Subscription/GetAllSubscription";
import SubscriptionList from "../Subscription/MySubscription";

const tabs = ["Overview", "Meal subscriptions" , "My Subscription"];

export default function NavigationTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <>
        <HorizontalCategoryList />
        <PopularProducts />
        </>
      case 1:
        return <GetAllSubscription/>;
      case 2:
        return <SubscriptionList />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-sm font-normal transition-colors ${
                activeTab === index
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
}
