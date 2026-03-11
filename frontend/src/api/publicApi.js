import { api } from "./client";

export const fetchPortfolio = async () => {
  const { data } = await api.get("/portfolio");
  return data;
};

export const submitContactMessage = async (payload) => {
  const { data } = await api.post("/messages", payload);
  return data;
};
