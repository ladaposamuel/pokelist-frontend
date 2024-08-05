import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useOrganisation } from "../api";
import { Organisation } from "../types";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";

export const DashboardPage = () => {
  const { fetchOrganisation } = useOrganisation();
  const [organisation, setOrganisation] = useState<Organisation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organisation = await fetchOrganisation(55);
        setOrganisation(organisation);
      } catch (error) {
        setError("Failed to fetch organisation data.");
      }
    };

    fetchData();
  }, []);

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
          {organisation && !error ? (
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
                  {organisation?.pokemons.map((pokemon) => (
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
                          <Button variant="primary" size="sm">
                            ❤︎ Like
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
