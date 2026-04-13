import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const TOKEN_KEY = "urbanfit_token";

const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getClasses = async () => {
  const { data } = await api.get("/classes");
  return data;
};

export const getTrainers = async () => {
  const { data } = await api.get("/trainers");
  return data;
};

export const getMemberships = async () => {
  const { data } = await api.get("/memberships");
  return data;
};

export const submitContactForm = async (payload) => {
  const { data } = await api.post("/contact", payload);
  return data;
};

export const bookTrial = async (payload) => {
  const { data } = await api.post("/trials", payload);
  return data;
};

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const register = async (name, email, password) => {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
};

export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};
