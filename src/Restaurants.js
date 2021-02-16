import queryString from "query-string";
import { useState, useEffect } from "react";
import { Card, Table, Container, Pagination } from "react-bootstrap";
import { useHistory } from "react-router-dom";




export default function Restaurants({ borough }) {
  let history = useHistory();
  let parsed = queryString.parse(borough).borough;
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;
  useEffect(() => {
    const url = `https://dry-cove-61738.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${parsed}`;
    const url2 = `https://dry-cove-61738.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;

    setLoading(true);
    fetch(parsed ? url : url2)
      .then((res) => {
        if (!res.ok) {
          throw new Error("unable to download users");
        }
        return res.json();
      })
      .then((result) => {
        setRestaurants(result);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [page, parsed]);
  
  if (loading || !restaurants) {
    return (
      <Card style={{ margin: "20px " }}>
        <Card.Header>Loading Restaurants...</Card.Header>
      </Card>
    );
  }
  

  if (restaurants.length === 0) {
    return (
      <Card style={{ margin: "20px " }}>
        <Card.Header>No Restaurants Found</Card.Header>
      </Card>
    );
  }

  return (
    <Container>
      <Card style={{ marginTop: "20px " }}>
        <Card.Header style={{ fontSize: "1.8em" }}>
          <p>Restaurant List</p>
          <footer className="text-muted" style={{ fontSize: "0.8rem" }}>
            Full list of restaurants. Optinally sorted by borough
          </footer>
        </Card.Header>
        <Card.Body style={{ padding: "0" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurants) => (
                <tr
                  key={restaurants._id}
                  onClick={() => {
                    history.push(`/restaurant/${restaurants._id}`);
                  }}
                >
                  <td>{restaurants.name}</td>
                  <td>
                    {restaurants.address.building} {restaurants.address.street}
                  </td>
                  <td>{restaurants.borough}</td>
                  <td>{restaurants.cuisine}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        <Pagination>
          <Pagination.First onClick={() => setPage(1)} />
          <Pagination.Prev
            onClick={() => (page > 1 ? setPage(page - 1) : setPage(page))}
          />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next
            onClick={() => (page < 2535 ? setPage(page + 1) : setPage(page))}
          />
        </Pagination>
      </Card>
    </Container>
  );
}
