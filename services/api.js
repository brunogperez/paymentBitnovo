import axios from "axios";
import { apiKEY, baseURL, xDeviceID } from "./enviroment.js";

export const fetchCurrencies = async () => {

  try {
    const response = await fetch(`${baseURL}/currencies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Id": `${xDeviceID}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener las criptomonedas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const createOrder = async (orderData ) => {
    try {
        const response = await axios.post(`${baseURL}/orders/`, orderData, {
          headers: {
            "X-Device-Id": `${xDeviceID}`,
            "X-API-Key": `${apiKEY}`,
            "Content-Type": "application/json",
          },
        });
        return response.data
    } catch (error) {
        console.error("Error al crear la orden:", error.response?.data.detail );
        throw error;
    }
};
