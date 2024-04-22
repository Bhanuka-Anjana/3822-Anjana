import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "./orderSlice";
import { Row, Col, Card, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { updateOrder } from "../../services/orderService";

export default function OrdersList() {
  const dispatch = useDispatch();
  const { data: orders, loading, error } = useSelector((state) => state.order);
  const { data: admin } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user.data);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("All");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const searchText = useSelector((state) => state.common.searchItem);

  const handleShipped = (id) => {
    let updateorder = orders.find((order) => order._id === id);
    const data = {
      userId: updateorder.userId,
      products: updateorder.products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
      totalCost: updateorder.totalCost,
      status: "Shipped",
      createdDate: updateorder.createdDate,
    };
    updateOrder(id, data).then((response) => {
      if (response.status === 200) {
        dispatch(updateOrderStatus({ _id: id, status: "Shipped" }));
      }
    });
  };
  const handleConfirmed = (id) => {
    let updateorder = orders.find((order) => order._id === id);
    const data = {
      userId: updateorder.userId,
      products: updateorder.products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
      totalCost: updateorder.totalCost,
      status: "Confirmed",
      createdDate: updateorder.createdDate,
    };
    updateOrder(id, data).then((response) => {
      if (response.status === 200) {
        dispatch(updateOrderStatus({ _id: id, status: "Confirmed" }));
      }
    });
  };

  const setSelectedCategory = (order) => {
    setSelectedOrderStatus(order);
    if (order === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((o) => o.status === order));
    }
  };

  if (error) {
    return <h1> {error} </h1>;
  }
  if (loading) {
    return <h1> loading .....</h1>;
  }
  //order has id,user,list of products and quantities, total price, status[delivered, pending, cancelled
  //admin can set the order status to delivered or confirmed
  //orders should group by  Order status

  if (filteredOrders === 0) {
    <>
      <h2>Sort by: </h2>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedOrderStatus}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setSelectedCategory("All");
            }}
          >
            All
          </Dropdown.Item>
          {["Confirmed", "Shipped", "Pending"].map((status) => (
            <Dropdown.Item
              key={status}
              onClick={() => {
                setSelectedCategory(status);
              }}
            >
              {status}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {filteredOrders < orders && (
        <h1>
          <h1>Showing results for {searchText}</h1>
        </h1>
      )}
    </>;
  }

  return (
    <>
      <h2>Sort by: </h2>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedOrderStatus}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setSelectedCategory("All");
            }}
          >
            All
          </Dropdown.Item>
          {["Confirmed", "Shipped", "Pending"].map((status) => (
            <Dropdown.Item
              key={status}
              onClick={() => {
                setSelectedCategory(status);
              }}
            >
              {status}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {filteredOrders < orders && (
        <h1>
          <h1>Showing results for {searchText}</h1>
        </h1>
      )}
      {filteredOrders && (
        <Row>
          {filteredOrders.map((order) => (
            <Col md={4} key={order._id}>
              <Card>
                <Card.Body>
                  <Card.Title>Order Id: {order._id}</Card.Title>
                  <Card.Text>
                    <strong>User: </strong>
                    <Link to={`/users/${order.userId}`}>
                      {
                        users.find((user) => user._id === order.userId)
                          .firstName
                      }{" "}
                    </Link>
                  </Card.Text>
                  <Card.Text>
                    <strong>Products:</strong>
                    <ul>
                      {order.products.map((product) => (
                        <li key={product.productId}>
                          {product.quantity} x{" "}
                          <Link to={`/products/${product.productId}`}>
                            product
                          </Link>
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
                  {admin.isAdmin && order.status === "Pending" && (
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleShipped(order._id);
                      }}
                    >
                      Conform Shipment
                    </Button>
                  )}
                  {!admin.isAdmin && order.status === "Shipped" && (
                    <Button
                      variant="success"
                      onClick={() => {
                        handleConfirmed(order._id);
                      }}
                    >
                      Confirm Delivery
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
