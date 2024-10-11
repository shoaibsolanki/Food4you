import { Box, Button, ButtonBase, Modal } from "@mui/material";
import React from "react";
import { useCart } from "../../contexts/CartContext";
const Checkoutmodal = ({ modal, toggle }) => {
    const {cart,totalPrice} = useCart()
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        // bgcolor: 'background.paper',
        // border: '2px solid #000',
        // boxShadow: 24,
        p: 4,
      };
      const {bankAccount} = JSON.parse(localStorage.getItem('selectedStore'))
  return (
    <div>
        <div>
        <Modal
  open={modal}
  onClose={toggle}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">McDonald's</h1>
              <div className="w-6 h-6 text-gray-500 cursor-pointer" onClick={toggle}>X</div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{cart.length} items</p>
            <div className="space-y-4 mb-6">
              {cart.length>0 &&cart.map((item)=>{return( <div className="flex justify-between items-center">
                <span className="text-gray-800">{item.item_name}</span>
                <span className="text-gray-800">{bankAccount} {item.price}</span>
              </div>)})}
              {/* <div className="flex justify-between items-center">
                <span className="text-gray-800">CHICKEN BIG TASTY</span>
                <span className="text-gray-800">CA$9.89</span>
              </div> */}
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold">Subtotal</span>
              <span className="font-semibold">{bankAccount} {totalPrice}</span>
            </div>
            <Button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors">
              Go to checkout
            </Button>
          </div>
  </Box>
</Modal>
    </div>
      {/* <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>

        </ModalBody>
      </Modal> */}
    </div>
  );
};

export default Checkoutmodal;
