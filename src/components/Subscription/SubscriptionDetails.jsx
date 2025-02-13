import React, { useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthConext";
import DataService from "../../services/requestApi"
import { BASEURL } from "../../services/http-Pos";
import axios from "axios";
const SubscriptionDetails = ({handleClose, subscription }) => {
    const [selectedItems, setSelectedItems] = React.useState([]);
    
    const {authData ,isAuthenticated , setSnackbarOpen, setSnackbarMessage,
        setSnackbarSeverity,} = useAuth()
        const {id , saasId , storeId} = authData
        const totalAmount = selectedItems.reduce((total, itemId) => {
            const item = subscription.items.find((item) => item.itemId === itemId);
            return total + (item ? item.netValue : 0);
        }, 0);
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) {
          navigate("/login");
        }
      }, [isAuthenticated]);
    const handleRowClick = (itemId) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(itemId)) {
                return prevSelectedItems.filter((id) => id !== itemId);
            } else {
                return [...prevSelectedItems, itemId];
            }
        });
    };

    const Verification =async (data) =>{
        try {
            const SubmitData= {
                store_id:storeId,
                "razorpay_order_id":data.razorpay_order_id,
                "razorpay_payment_id": data.razorpay_payment_id,
                "razorpay_signature": data.razorpay_signature
            }
            const response = await DataService.PaymentVerification(SubmitData)
            console.log(response.data.status)
            if(response.data.status){
                buySubscription()
            }
        } catch (error) {
            console.log(error)
        }
    }
  

    const fetchSubscriptionData = async () => {
                try {
                    if (selectedItems.length === 0) {
                        setSnackbarMessage('Please select at least one item');
                        setSnackbarSeverity('error');
                        setSnackbarOpen(true);
                        return;
                    }
                    
                    const response = await DataService.MySubscription(id , saasId , storeId);
                         if(response.data.data && response.data.data.length == 0){
                            handleRazorpayPayment()
                         }else{
                            setSnackbarMessage('You already have an active subscription');
                            setSnackbarSeverity('info');
                            setSnackbarOpen(true);
                         }
                } catch (error) {
                    console.error("Error fetching subscription data:", error);
                }
            };

    const createRazorpayOrder = async () => {
        try {
            
            console.log(totalAmount)
          const data = {
            amount:  totalAmount,
            currency: "INR",
          };
    
          const authHeader = `Basic ${btoa(
            "rzp_test_USk6kNFvt2WXOE:afZsDDDaTvqhZPxMLH1p0b2t"
          )}`;
    
          const response = await axios.post(
            `${BASEURL.ENDPOINT_URL}rezar/pay/${data.amount}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: authHeader,
              },
            }
          );
    
          console.log("Razorpay order created:", response.data);
          return response.data.id;
        } catch (error) {
          console.error("Error creating Razorpay order:", error);
          throw error;
        }
      };
      const handleRazorpayPayment = async (formData) => {
        try {
          const orderId = await createRazorpayOrder();
          const options = {
            key: "rzp_test_USk6kNFvt2WXOE",
            amount: totalAmount ,
            currency: "INR",
            name: "Food4You",
            description: "Test Transaction",
            image: "",
            order_id: orderId,
            handler: async function (response) {
              console.log(response);
              await Verification(response)
            //   await handlePlaceOrder(formData, response);
            //   setIsPaymentSuccessful(true);
            //   clearCart();
            //   navigate("/cart/checkout/summary");
            },
            // prefill: {
            //   name: `${formData.first_name} ${formData.last_name}`,
            //   email: formData.email,
            //   contact: formData.Mobile_numbers,
            // },
            // notes: {
            //   address: formData["Street Address"],
            // },
            theme: {
              color: "#003f62",
            },
          };
    
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        } catch (error) {
          console.error("Error handling Razorpay payment:", error);
        }
      };


    const buySubscription = async () => {
        if (selectedItems.length === 0) {
            setSnackbarMessage('Please select at least one item');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }
        const data = {
            subscriptionId: subscription.subscriptionId,
            customerId: id, // Replace with actual customer ID
            startDate: new Date(), // Replace with actual start date
            paymentMode: "Cash",
            items: selectedItems,
        };
           
        try {
            const response = await DataService.BuySubsription(data);
            if(response.data.status){
                setSnackbarMessage('Subscription created successfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            }else{
                setSnackbarMessage(response.data.message || 'Failed to create subscription');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
            console.log('Subscription created successfully:', response.data);
        } catch (error) {
            setSnackbarMessage('Error creating subscription');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            console.error('Error creating subscription:', error);
        }
    };
return (
    <>
    
    <Card>
        <CardMedia component="img" className="h-[300px] w-[100px]" src={subscription.image} alt="Subscription Image" />
        <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
                Subscription Details
            </Typography>
            <Typography variant="body1">Subscription ID: {subscription.subscriptionId}</Typography>
            <Typography variant="body1">Description: {subscription.description}</Typography>
            <Typography variant="body1">Number of Days: {subscription.noOfDays}</Typography>
            <Typography variant="body1">SaaS ID: {subscription.saasId}</Typography>
            <Typography variant="body1">Store ID: {subscription.storeId}</Typography>

            <Typography variant="h6" component="div" sx={{ mt: 2, mb: 1 }}>
                Subscription Items
            </Typography>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Discount</TableCell>
                            <TableCell align="right">Net Value</TableCell>
                            <TableCell align="right">Gross</TableCell>
                            <TableCell align="right">Off Days</TableCell>
                            <TableCell align="right">Selling Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subscription?.items && subscription?.items?.map((item) => (
                            <TableRow
                                onClick={() => handleRowClick(item.itemId)}
                                key={item.subscriptionItemId}
                                style={{
                                    backgroundColor: selectedItems.includes(item.itemId) ? '#7fff56' : 'transparent',
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">{item.price}</TableCell>
                                <TableCell align="right">{item.discount}</TableCell>
                                <TableCell align="right">{item.netValue}</TableCell>
                                <TableCell align="right">{item.gross}</TableCell>
                                <TableCell align="right">{item.offdays}</TableCell>
                                <TableCell align="right">{item.selling}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
        <CardContent>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleClose} variant="contained" style={{ marginRight: '10px' }}>Cancel</Button>
                <Button onClick={fetchSubscriptionData} variant="contained">Buy Now</Button>
            </div>
        </CardContent>
    </Card>
   
    </>
);
};

export default SubscriptionDetails;
