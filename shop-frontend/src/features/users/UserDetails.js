import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const { data: users } = useSelector((state) => state.user);
  const allOrders = useSelector((state) => state.order.data);
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setUser(users.find((user) => user._id === id));
    setOrders(allOrders.filter((order) => order.userId === id));
  }, [id]);

  return (
    <Row>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>User Id: {user._id}</Card.Title>
            <Card.Text>
              <strong>First Name: </strong>
              {user.firstName}
            </Card.Text>
            <Card.Text>
              <strong>Last Name:</strong>
              {user.lastName}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong>
              {user.email}
            </Card.Text>
            <Card.Text>
              <strong>Phone:</strong>
              {user.phone}
            </Card.Text>
            <Card.Text>
              <strong>Address:</strong>
              {user.address}
            </Card.Text>
            <Card.Text>
              <strong>Orders:</strong>
              <ul>
                {orders
                  .filter((order) => order.userId === user._id)
                  .map((order) => (
                    <li key={order._id}>
                      <strong>Order Id: </strong>
                      <Link to={`/orders/${order._id}`}>{order._id}</Link>
                    </li>
                  ))}
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
