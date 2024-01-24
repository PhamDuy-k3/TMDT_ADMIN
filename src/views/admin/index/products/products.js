import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Products() {
  const [listProduct, setlistProduct] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setlistProduct(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    fetchProducts();
  }, []);

  const changeInputSearch = (event) => {
    setTextInput(event.target.value);
    setFilteredProducts(listProduct)
  };

  const search = () => {
    const searchText = textInput.trim().toLowerCase();
    const list_search = listProduct.filter((item) =>
      item.title.toLowerCase().includes(searchText)
    );
    //console.log(list_search);
    // nếu ko tìm thấy thì list_search là  danh sach ban đâu
    setFilteredProducts(list_search);
  };
  const prducts = filteredProducts.map((item) => (
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
    <div className="content-wraper content-wraper3">
      <div className="content-wraper-header d-lg-flex">
        <h2>Products</h2>
        <div className="d-flex content-wraper-header-cl2">
          <a href="">
            <p style={{ color: "#0A58CA" }}>Home</p>
          </a>
          <p>/</p>
          <p className="gray">Products</p>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên sản phẩm.."
                  name="phone"
                  onChange={(event) => changeInputSearch(event)}
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
                <Form.Control
                  type="text"
                  placeholder="Nhập .."
                  name="lastName"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Nhập ."
                  name="userName"
                />
              </Form.Group>
            </Col>
            <Col>
              <Button onClick={search}>Tìm Kiếm</Button>
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
              <tbody>{prducts}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Products;
