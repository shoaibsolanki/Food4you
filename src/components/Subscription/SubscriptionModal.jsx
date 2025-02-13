import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import SubscriptionDetails from "./SubscriptionDetails";


const SubscriptionModal = ({subscriptions}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
      Subscribe Now
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="subscription-modal-title"
        aria-describedby="subscription-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 800,
            maxHeight: "90vh",
            overflow: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <SubscriptionDetails handleClose={handleClose} subscription={subscriptions} />
        </Box>
      </Modal>
    </div>
  );
};

export default SubscriptionModal;
