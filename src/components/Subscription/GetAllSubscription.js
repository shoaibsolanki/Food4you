import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASEURL } from '../../services/http-Pos';
import SubscriptionModal from './SubscriptionModal';

const GetAllSubscription = () => {
        const [subscriptions, setSubscriptions] = useState([]);
        const selectedStore = localStorage.getItem('selectedStore');
  const parsedStore = selectedStore ? JSON.parse(selectedStore) : null;
  const { saas_id, store_id , bank_account } = parsedStore || {};
        const fetchSubscriptions = async () => {
            try {
                const response = await axios.get(`${BASEURL.ENDPOINT_URL}Subscription/Master-Get/${saas_id}/${store_id}`);
                setSubscriptions(response.data.data);
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            }
        };

        useEffect(() => {
            fetchSubscriptions();
        }, []);
    return (
        <>
        <div className="flex flex-col md:flex-row justify-center items-center ">
            {subscriptions && subscriptions.map((subscription) => (
                <Card key={subscription.subscriptionId} className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden m-4">
                    <CardContent>
                        {subscription.image && <img src={subscription.image} alt="Image" className="w-full h-32 object-cover mb-4 rounded" />}
                        <Typography variant="h5" component="div" className="font-bold mb-2">
                            {subscription.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="mb-4">
                            Duration: {subscription.noOfDays} days
                        </Typography>
                        <SubscriptionModal subscriptions={subscription}/>
                    </CardContent>
                </Card>
            ))}
        </div>

        </>
    );
};

export default GetAllSubscription;