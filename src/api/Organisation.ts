import { Organisation } from "../types";
import { apiClient } from "../utils/apiClient";

const fetchOrganisations = async (): Promise<Organisation[]> => {
  const response = await apiClient.get("organisations");

  if (response.success) {
    return response.responseObject;
  }

  return [];
};

export { fetchOrganisations };
