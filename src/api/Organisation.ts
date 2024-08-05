import { Organisation } from "../types";
import { apiClient } from "../utils/apiClient";
import { useAuth } from "../context/userContext";

const useOrganisation = () => {
  const { currentUser } = useAuth();

  const fetchOrganisations = async (): Promise<Organisation[]> => {
    const response = await apiClient.get("organisations");

    if (response.success) {
      return response.responseObject;
    }

    return [];
  };

  const fetchOrganisation = async (
    id: number
  ): Promise<Organisation | null> => {
    if (!currentUser) {
      return null;
    }

    const response = await apiClient.get(`organisations/${id}`, {
      headers: {
        Authorization: currentUser.token,
      },
    });

    if (response.success) {
      return response.responseObject;
    }

    return null;
  };

  return { fetchOrganisations, fetchOrganisation };
};

export { useOrganisation };
