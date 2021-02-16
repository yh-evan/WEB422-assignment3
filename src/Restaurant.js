import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Card, CardDeck, Container } from "react-bootstrap";


export default function Restaurant({ id }) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const url = `https://dry-cove-61738.herokuapp.com/api/restaurants/${id}`;

    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res) {
          throw new Error("Unable to find restaurant details");
        }
        return res.json();
      })
      .then((result) => {
        if (result.hasOwnProperty("_id")) {
          setRestaurant(result);
        } else {
          setRestaurant(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (!restaurant){
    return (
      <Card style={{ margin: "20px " }}>
        <Card.Header>No Restaurants Found</Card.Header>
      </Card>
    )
  }

  if (!restaurant || loading) {
    return (
      <Card style={{ margin: "20px " }}>
        <Card.Header>Loading Restaurants...</Card.Header>
      </Card>
    );
  }

  const convertDate = (dateString)=>{
    var date = new Date(dateString);
    return date.toDateString();
  }

  return (
    <Container>
      <Card style={{ margin: "20px " }}>
        <Card.Header>
          {restaurant.name}
          <footer className="text-muted" style={{ fontSize: "0.8rem" }}>
            {restaurant.address.building} {restaurant.address.street}
          </footer>
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <MapContainer
              style={{ height: "400px" }}
              center={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[
                  restaurant.address.coord[1],
                  restaurant.address.coord[0],
                ]}
              ></Marker>
            </MapContainer>
          </blockquote>
        </Card.Body>
      </Card>
      <CardDeck>
        {restaurant.grades.map((Grades, index) => (
          <Card key={index} style={{ textAlign: "center" }}>
            <Card.Body>
              <Card.Text>
                Grade is: {Grades.grade}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{convertDate(Grades.date)}</small>
            </Card.Footer>
          </Card>
        ))}
      </CardDeck>
    </Container>
  );
}
