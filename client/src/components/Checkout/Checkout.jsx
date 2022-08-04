import * as React from 'react';
import { useState } from "react"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';


const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step: number, cart, handleAddressSubmitStep, handlePaymentSubmitStep, addressState, paymentState) {
  switch (step) {
    case 0:
      return <AddressForm handleAddressSubmitStep={handleAddressSubmitStep} addressState={addressState} />;
    case 1:
      return <PaymentForm handlePaymentSubmitStep={handlePaymentSubmitStep} paymentState={paymentState} />;
    case 2:
      return <Review addressState={addressState} paymentState={paymentState} cart={cart}  />;
    default:
      throw new Error('Unknown step');
  }
}


export default function Checkout({cart}) {
  const [activeStep, setActiveStep] = useState(0);
  const [addressState, setAddressState] = useState({})
  const [paymentState, setPaymentState] = useState({})

  const handleAddressSubmitStep = (fields) => {
    setAddressState(fields)
  }

  const handlePaymentSubmitStep = (fields) => {
    setPaymentState(fields)
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thanks for your order, {addressState.firstName}.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, cart, handleAddressSubmitStep, handlePaymentSubmitStep, addressState, paymentState)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1}}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
  );
}