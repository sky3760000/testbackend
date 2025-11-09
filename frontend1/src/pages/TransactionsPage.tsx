import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Grid,
  Tabs,
  Tab,
  Alert,
} from "@mui/material";
import { getTransactionStatus, sendWebhook } from "../api";

export default function TransactionsPage() {
  const [tab, setTab] = useState(0);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    transaction_id: "",
    source_account: "",
    destination_account: "",
    amount: "",
    currency: "",
  });
  const [transactionId, setTransactionId] = useState("");

  const primaryColor = "#0D47A1";
  const secondaryColor = "#00ACC1";

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendWebhook = async () => {
    setError(null);
    setResponse(null);
    try {
      const res = await sendWebhook(form);
      if (res?.error) throw new Error(res.error);
      setResponse(res);
    } catch (err: any) {
      setError(err.message || "Failed to send webhook. Please try again.");
    }
  };

  const handleGetStatus = async () => {
    setError(null);
    setResponse(null);
    try {
      const res = await getTransactionStatus(transactionId);
      if (res?.error) throw new Error(res.error);
      setResponse(res);
    } catch (err: any) {
      setError(err.message || "Failed to get transaction status.");
    }
  };

  return (
    <Box
      sx={{
        width: "95vw",
        minHeight: "100vh",
        mt: 14,
        ml:4,
        // p: 4,
        backgroundColor: "#f9fafc",
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, color: primaryColor, fontWeight: "bold" }}
      >
        Transactions API Tester
      </Typography>

      <Tabs
        value={tab}
        onChange={(_, v) => {
          setTab(v);
          setResponse(null);
          setError(null);
        }}
        textColor="inherit"
        indicatorColor="secondary"
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            color: primaryColor,
          },
          "& .Mui-selected": {
            color: secondaryColor,
          },
        }}
      >
        <Tab label="Send Webhook (POST)" />
        <Tab label="Get Transaction Status (GET)" />
      </Tabs>


      {tab === 0 && (
        <Card sx={{ p: 3, mb: 3 ,ml:2,mr:2}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Transaction ID"
                name="transaction_id"
                fullWidth
                value={form.transaction_id}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Source Account"
                name="source_account"
                fullWidth
                value={form.source_account}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Destination Account"
                name="destination_account"
                fullWidth
                value={form.destination_account}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Amount"
                name="amount"
                type="number"
                fullWidth
                value={form.amount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Currency"
                name="currency"
                fullWidth
                value={form.currency}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button
  variant="contained"
  onClick={handleSendWebhook}
  sx={{
    mt: 3,
    width: "200px",        
    display: "block",       
    mx: "auto",             
    backgroundColor: primaryColor,
    "&:hover": { backgroundColor: "#08306b" },
  }}
>
            Send Webhook
          </Button>
        </Card>
      )}

  
      {tab === 1 && (
        <Card sx={{ p: 3, mb: 3 }}>
          <TextField
            label="Transaction ID"
            fullWidth
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            sx={{ mb: 2 }}
          />
         <Button
  variant="contained"
  onClick={handleGetStatus}
  sx={{
    mt: 3,
    width: "200px",       
    display: "block",       
    mx: "auto",           
    backgroundColor: primaryColor,
    "&:hover": { backgroundColor: "#08306b" },
  }}
>
            Get Status
          </Button>
        </Card>
      )}


      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

   
      {response && (
        <Card sx={{ backgroundColor: "#f9f9f9" }}>
          <CardContent>
            <Typography
              variant="subtitle1"
              sx={{ color: primaryColor, fontWeight: "bold", mb: 1 }}
            >
              Response:
            </Typography>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
