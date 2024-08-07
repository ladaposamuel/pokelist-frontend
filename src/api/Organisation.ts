import { Organisation } from "../types";
import { apiClient } from "../utils/apiClient";
import { useAuth } from "../context/userContext";
import { Pokemon } from "../types/Pokemon";

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

  const fetchOrganisationPokemons = async (): Promise<Pokemon[]> => {
    if (!currentUser) {
      return [];
    }

    const response = await apiClient.get(`pokemon/all`, {
      headers: {
        Authorization: currentUser.token,
      },
    });

    if (response.success) {
      return response.responseObject;
    }

    return [];
  };

  return { fetchOrganisations, fetchOrganisation, fetchOrganisationPokemons };
};

export { useOrganisation };
