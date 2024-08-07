import { apiClient } from "../utils/apiClient";
import { useAuth } from "../context/userContext";

const useFavourite = () => {
  const { currentUser } = useAuth();

  const likePokemon = async (pokemonId: number): Promise<any> => {
    if (!currentUser) {
      return null;
    }
    const response = await apiClient.post(
      `pokemon/favorite/${pokemonId}`,
      {},
      {
        headers: {
          Authorization: currentUser.token,
        },
      }
    );

    if (response.success) {
      return response.responseObject.liked;
    }

    return null;
  };

  return { likePokemon };
};

export { useFavourite };
