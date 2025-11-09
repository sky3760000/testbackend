import axios from "axios";

const API_BASE = "https://testbackend-1-xpu3.onrender.com/v1";

export const sendWebhook = async (data:any) => {
  const payload = {
    transaction_id: data.transaction_id,
    source_account: data.source_account,
    destination_account: data.destination_account,
    amount: Number(data.amount),
    currency: data.currency,
  };
  const res = await axios.post(`${API_BASE}/webhooks/transactions`, payload);
  return res.data;
};

export const getTransactionStatus = async (id:any) => {
  const res = await axios.get(`${API_BASE}/transactions/${id}`);
  return res.data;
};


// import axios from "axios";

// const API_BASE = "https://testbackend-1-xpu3.onrender.com/v1";
// // const API_BASE = "http://localhost:8000/v1";

// export const sendWebhook = async () => {
//   const data = {
//     transaction_id: "string4",
//     source_account: "string",
//     destination_account: "string",
//     amount: 0,
//     currency: "string",
//   };
//   const res = await axios.post(`${API_BASE}/webhooks/transactions`, data);
//   return res.data;
// };

// export const getTransactionStatus = async (id: string) => {
//   const res = await axios.get(`${API_BASE}/transactions/${id}`);
//   return res.data;
// };
