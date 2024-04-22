import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

export default function OrderDetails() {
  const { id } = useParams();
  const order = useSelector((state) => state.order.data.find((order) => order._id === id));
  const user = useSelector((state) => state.user.data.find((user) => user._id === order.userId));


  return (
    <Row>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Order Id: {order._id}</Card.Title>
            {user && (
              <Card.Text>
                <strong>User: </strong>
                <Link to={`/users/${order.userId}`}>{user.firstName} </Link>
              </Card.Text>
            )}
            <Card.Text>
              <strong>Products:</strong>
              <ul>
                {order.products &&
                  order.products.map((product) => (
                    <li key={product.productId}>
                      {product.quantity} x <Link to={`/products/${product.productId}`}>product</Link>
                    </li>
                  ))}
              </ul>
            </Card.Text>
            <Card.Text>
              <strong>Total Cost:</strong>
              {order.totalCost}
            </Card.Text>
            <Card.Text>
              <strong>Status:</strong>
              {order.status}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
