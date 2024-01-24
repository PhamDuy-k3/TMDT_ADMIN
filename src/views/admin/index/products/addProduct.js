import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AddProduct() {
  const [listProduct, setlistProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setlistProduct(data.products);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    fetchProducts();
  }, []);

  // function overflow() {
  //   if (isUpdate === true) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }
  console.log(listProduct);
  const users = listProduct.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{item.price}</td>
      <td>{item.brand}</td>
      <td>{item.category}</td>
      <td>
        <Button>Delete</Button>
      </td>
      <td>
        <Button>Update</Button>
      </td>
    </tr>
  ));

  return (
    <>
      <Row>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nhập tên sản phẩm.."
              name="phone"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nhập giá tiền.."
              name="firstName"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control type="text" placeholder="Nhập .." name="lastName" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control type="text" placeholder="Nhập ." name="userName" />
          </Form.Group>
        </Col>
        <Col>
          <Button>ADD</Button>
        </Col>
      </Row>
      <div style={{ overflow: "scroll", height: "95rem" }}>
        <Table
          className="mt-4"
          style={{ textAlign: "center" }}
          striped
          bordered
          hover
          variant="white"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name Product</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </Table>
      </div>
    </>
  );
}

export default AddProduct;
