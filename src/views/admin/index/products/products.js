import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import ExportExcel from "../../../../components/xlsx/xlsx";
import "..//..//sassAdmin/_user.scss";
import "./style.scss";
import axios from "axios";

function Products() {
  const [listProducts, setListProducts] = useState([]);
  const [listProductsSearch, setListProductsSearch] = useState([]);
  const [Product, setProduct] = useState();
  const [cookies, setCookie] = useCookies();
  const [limit, setLimit] = useState(20);
  const [showModal, setShowModal] = useState(false);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [id_product, setIdProduct] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    // giá trị mặc định cho data
    defaultValues: {
      name: "",
      prices: "",
    },
  });
  const colors = ["Màu Trắng", "Màu Xanh", "Màu Nâu", "Màu Vàng"];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const closeModal = () => setShowModal(false);

  const openModal = (id_product) => {
    setIdProduct(id_product);
    setShowModal(true);
  };

  const createVariant = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/variants",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.admin_token,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Tạo mới thành công!");
        setSize("");
        setQuantity(0);
        setColor("");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra trong quá trình tạo mới.");
    }
  };

  const handleAdd = () => {
    if (!id_product && !color) return;
    const data = {
      product_id: id_product,
      color,
      size,
      quantity,
    };
    createVariant(data);
  };
  ///DANH SÁCH Products
  useEffect(() => {
    fetch(`http://localhost:5050/products/admin?limit=${limit}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.admin_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setListProducts(res.data);
        console.log(res);
      });
  }, [Product, cookies.admin_token, limit]);

  ///TÌM KIẾM Products
  const searchProducts = (data) => {
    if (data.name !== "" || data.prices !== "") {
      fetch(
        `http://localhost:5050/products?limit=${limit}&name=${data.name}&prices=${data.prices}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.admin_token,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setListProductsSearch(res.data);
        });
    } else {
      alert("Nhập tìm kiếm!");
    }
  };

  /// XÓA Products
  const deleteProducts = (ProductId) => {
    fetch(`http://localhost:5050/products/${ProductId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.admin_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status_code == 200) {
          setProduct(res.data);
          toast.success(() => (
            <p style={{ paddingTop: "1rem" }}>Xóa thành công!</p>
          ));
        } else {
          toast.error(() => (
            <p style={{ paddingTop: "1rem" }}>Xóa thất bại!</p>
          ));
        }
      });
  };

  // RESET
  const handleChangeName = (event) => {
    const newName = event.target.value;
    console.log(newName);
    if (newName.length === 0) {
      setListProductsSearch([]);
    }
  };
  const dsProducts = (
    listProductsSearch.length > 0 ? listProductsSearch : listProducts
  ).map((item, index) => (
    <tr key={item._id}>
      <td>{(index = index + 1)}</td>
      {item.name.length > 20 ? (
        <td>{item.name.substring(0, 20)} ...</td>
      ) : (
        <td>{item.name.substring(0, 20)}</td>
      )}

      <td>{item.prices}</td>
      <td>{item.discount}</td>
      <td>{item.stock}</td>
      <td>
        <NavLink to={`/Products/update/${item._id}`}>
          <i style={{ color: "green" }} class="far fa-edit"></i>
        </NavLink>
        <i
          style={{ color: "red", marginLeft: "1rem" }}
          onClick={() => deleteProducts(item._id)}
          class="fas fa-trash-alt "
        ></i>
        <i
          style={{ color: "green", marginLeft: "1rem" }}
          className="fas fa-pen-nib"
          onClick={() => openModal(item._id)}
        ></i>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="content-wraper content-wraper3 ">
        <div className="content-wraper-header d-lg-flex">
          <h2>Sản phẩm</h2>
          <div className="d-flex content-wraper-header-cl2">
            <Link to="">
              <p style={{ color: "#0A58CA" }}>Home</p>
            </Link>
            <p>/</p>
            <p className="gray">Quản lý sản phẩm</p>
          </div>
        </div>
        <hr style={{ width: "90%", margin: "auto", marginBottom: "1rem" }}></hr>

        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ width: "300px" }}
        />
        <div className="content">
          <div className="container-fluid">
            <form
              onChange={handleChangeName}
              onSubmit={handleSubmit(searchProducts)}
            >
              <div className="d-lg-flex flex-lg-wrap">
                <div class="input-container">
                  <input
                    placeholder="Tên sản phẩm"
                    class="input-field"
                    type="text"
                    {...register("name")}
                  />
                  <label for="input-field" class="input-label">
                    Tên sản phẩm
                  </label>
                  <span class="input-highlight"></span>
                </div>
                <div class="input-container">
                  <input
                    placeholder="Giá sản phẩm"
                    class="input-field"
                    type="text"
                    {...register("prices")}
                  />
                  <label for="input-field" class="input-label">
                    Giá sản phẩm
                  </label>
                  <span class="input-highlight"></span>
                </div>

                <button id="idSearchProducts">
                  {" "}
                  <i style={{ marginRight: "1rem" }} class="fas fa-search"></i>
                  Tìm Kiếm
                </button>
              </div>
            </form>
            {showModal && (
              <div className="modal-variant">
                <div className="modal-content">
                  <h3>Thêm thông tin cho sản phẩm</h3>

                  <label>
                    Màu
                    <select
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    >
                      <option disabled value="">
                        Chọn màu
                      </option>
                      {colors.map((col, index) => (
                        <option key={index} value={col}>
                          {col}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Size
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option disabled value="">
                        Chọn size
                      </option>
                      {sizes.map((sz, index) => (
                        <option key={index} value={sz}>
                          {sz}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Số lượng:
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </label>

                  <button onClick={handleAdd}>Thêm</button>
                  <button onClick={closeModal}>Đóng</button>
                </div>
              </div>
            )}
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
                    <th>Tên sản phẩm</th>
                    <th>Giá sản phẩm</th>
                    <th>Mã giảm giá</th>
                    <th>Số lượng</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>{dsProducts}</tbody>
              </Table>
              <ExportExcel nameFile="products" data={listProducts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Products;
