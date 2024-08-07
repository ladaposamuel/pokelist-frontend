import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useOrganisation } from "../api";
import { useFavourite } from "../api";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import { Pokemon } from "../types/Pokemon";
import { useAuth } from "../context/userContext";

document.title = "Dashboard | PokeList";
const ITEMS_PER_PAGE = 4;

export const DashboardPage = () => {
  const { fetchOrganisationPokemons } = useOrganisation();
  const { likePokemon } = useFavourite();
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pokemons?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const { currentUser } = useAuth();
  const fetchData = async () => {
    try {
      const organisationPokemons = await fetchOrganisationPokemons();
      setPokemons(organisationPokemons);
    } catch (error) {
      setError("Failed to fetch organisation data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const pokemonId = e.currentTarget.dataset.id;

    await likePokemon(Number(pokemonId));
    fetchData();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Dashboard</h4>
      </div>
      <div className="card-body">
        <p>
          Welcome to your dashboard, below is our secret pokemon list, keep it
          safe!
        </p>
        <p>
          You are free to Upvote or Downvote any pokemon, to help us maintain a
          healthy list.
        </p>
        <hr />

        <Row>
          {pokemons && !error ? (
            <Col>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Pokemon Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems?.map((pokemon) => {
                    const checkIfLiked = pokemon.favorites.find(
                      (favorite) => favorite.user.id === currentUser?.id
                    );
                    const liked = checkIfLiked?.liked;
                    return (
                      <tr key={pokemon.id}>
                        <td>{pokemon.id}</td>
                        <td>
                          <img src={pokemon.image} alt={pokemon.name} />
                        </td>
                        <td>{pokemon.name}</td>
                        <td>{pokemon.description}</td>
                        <td>
                          {pokemon.type.split(",").map((type) => (
                            <>
                              <Badge bg="dark" key={type}>
                                {type}
                              </Badge>{" "}
                            </>
                          ))}
                        </td>
                        <td>
                          <div>
                            <Button
                              variant={liked ? "danger" : "success"}
                              size="sm"
                              data-id={pokemon.id}
                              onClick={handleLike}
                            >
                              {liked ? " ✗ Unlike" : "✔︎ Like"}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Pagination>
                {Array.from(
                  { length: Math.ceil(pokemons?.length / itemsPerPage) },
                  (_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  )
                )}
              </Pagination>
            </Col>
          ) : !error ? (
            <div>
              <Spinner animation="border" role="status" />
            </div>
          ) : null}

          {error && (
            <Alert key={"warning"} variant={"warning"}>
              {error}
            </Alert>
          )}
        </Row>
      </div>
    </div>
  );
};

export default DashboardPage;
