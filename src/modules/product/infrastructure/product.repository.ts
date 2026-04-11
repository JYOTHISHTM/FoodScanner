

import axios from "axios";

interface OpenFoodFactsResponse {
  product: Record<string, unknown>;
  status: number;
  status_verbose: string;
}


export const fetchProductFromAPI = async (productId: string) => {
  const response = await axios.get<OpenFoodFactsResponse>(
    `https://world.openfoodfacts.org/api/v0/product/${productId}.json`
  );

  if (response.data.status === 0) {
    return null; 
  }

  return response.data.product;
};