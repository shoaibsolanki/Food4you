import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Avatar, Divider } from "@mui/material";
import DataService from '../../services/requestApi'
import { useAuth } from "../../contexts/AuthConext";
import { useNavigate } from "react-router-dom";
import { Stroller } from "@mui/icons-material";
const SubscriptionCard = ({ data }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl overflow-hidden">
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar
              src={data.subscription?.image}
              alt="Subscription Image"
              className="w-16 h-16"
            />
            <div>
              <Typography variant="h6" className="font-bold">
                {data.subscription?.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Subscription ID: {data.subscription?.subscriptionId}
              </Typography>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="space-y-3">
            {data.subscription&& data.subscription?.items.map((item) => (
              <div key={item.subscriptionItemId} className="flex justify-between">
                <Typography variant="body1" className="font-medium">
                  {item.name}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  ₹{item.netValue} ({item.selling} per day)
                </Typography>
              </div>
            ))}
          </div>
          <Divider className="my-4" />
          <div className="flex justify-between font-semibold">
            <Typography>Total:</Typography>
            <Typography>₹{data.total}</Typography>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <Typography>Payment Mode:</Typography>
            <Typography>{data.paymentMode}</Typography>
          </div>
          <Divider className="my-4" />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <Typography>Start Date:</Typography>
            <Typography>{data.startDate}</Typography>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <Typography>End Date:</Typography>
            <Typography>{data.endDate}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SubscriptionList = () => {

    const [subscriptionData, setSubscriptionData] = useState(null);
    const {authData ,isAuthenticated} = useAuth()
        const {id , saasId , storeId} = authData
        const navigate = useNavigate()
        useEffect(() => {
            if (!isAuthenticated) {
              navigate("/login");
            }
          }, [isAuthenticated]);

    useEffect(() => {
        const fetchSubscriptionData = async () => {
            try {
                const response = await DataService.MySubscription(id , saasId , storeId);
                setSubscriptionData(response.data.data[0]);
            } catch (error) {
                console.error("Error fetching subscription data:", error);
            }
        };

        fetchSubscriptionData();
    }, []);

    if (!subscriptionData) {
        return <div>Loading...</div>;
    }

  return <SubscriptionCard data={subscriptionData} />;
};

export default SubscriptionList;
