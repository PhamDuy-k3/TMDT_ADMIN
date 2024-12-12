import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./style.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VND_currency } from "../../../../components/vnd";
import ModelAddVariant from "./modelAddVariants";
const ProductDetail = () => {
  const [cookies] = useCookies();
  const [product, setProduct] = useState([]);
  const [variants, setVariants] = useState([]);
  const [variant, setVariant] = useState({
    _id: "",
    product_id: "",
    color: "",
    size: "",
    price: "",
    quantity: "",
  });
  const product_id = useParams();
  const [showModelAddVariant, setShowModelAddVariant] = useState(false);

  const fetchProducts = async () => {
    try {
      if (!product_id) return;
      const response = await axios.get(
        `http://localhost:5050/products/${product_id.productId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.admin_token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setProduct(response.data.data);
        getVariants();
      }
    } catch (error) {
      toast.error("Failed to fetch products", error);
    }
  };
  const getVariants = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/variants?product_id=${product_id.productId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.admin_token}`,
          },
        }
      );
      if (response.status === 200) {
        setVariants(response.data.data); // Lấy danh sách sản phẩm
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [cookies.admin_token]);

  const handelVariants = (variant) => {
    setVariant(variant);
    setShowModelAddVariant(true);
  };

  // xóa
  const handleDelete = async (data) => {
    try {
      const response = await axios({
        method: "delete",
        url: "http://localhost:5050/variants",
        data: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.admin_token,
        },
      });
      if (response.data.status_code === 200) {
        toast.success("Xóa thành công");
        fetchProducts();
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra trong quá trình xử lý.");
    }
  };
  console.log(product);
  return (
    <div
      style={{ minHeight: "0", height: "auto" }}
      className="content-wraper content-wraper3 "
    >
      <div className="content-wraper-header d-lg-flex">
        <h4>Chi tiết sản phẩm </h4>
        <div className="d-flex content-wraper-header-cl2">
          <Link to="/">
            <p style={{ color: "#0A58CA" }}>Home</p>
          </Link>
          <p>/</p>
          <p className="gray">Quản lý sản phẩm</p>
        </div>
      </div>
      <hr style={{ width: "90%", margin: "auto", marginBottom: "1rem" }}></hr>
      <div id="product-detail">
        <div className="product-detail__content">
          <table className="table table-bordered table-products">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Giảm giá</th>
                <th>Đã bán</th>
                <th>Trạng thái</th>
                <th>Số lượng còn lại</th>
                <th>Hình ảnh</th>
              </tr>
            </thead>
            <tbody>
              {product ? (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{VND_currency.format(product.prices)}</td>
                  <td>
                    {product.discount
                      ? `${product.discount}%`
                      : "Không giảm giá"}
                  </td>
                  <td>{product.soldCount}</td>
                  <td>
                    {product.isVisible ? (
                      <span style={{ color: "green" }}>Hiển thị</span>
                    ) : (
                      <span style={{ color: "red" }}>Ẩn</span>
                    )}
                  </td>
                  <td>{product.stock}</td>
                  <td>
                    {product.images?.length > 0
                      ? product.images?.map((image, index) => (
                          <img
                            src={product.images[index]}
                            alt={product.name}
                            style={{ width: "50px", height: "50px" }}
                          />
                        ))
                      : ""}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Không có sản phẩm nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <ModelAddVariant
            toast={toast}
            setVariant={setVariant}
            fetchProducts={fetchProducts}
            variant={variant}
            setShowModelAddVariant={setShowModelAddVariant}
            showModelAddVariant={showModelAddVariant}
            idProduct={product_id.productId}
          />
          <table className="table table-bordered table-variant">
            <thead>
              <tr>
                <th>Màu</th>
                <th>Size</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {variants.length > 0 ? (
                variants.map((variant) => (
                  <tr key={variant._id}>
                    <td>{variant.color}</td>
                    <td>{variant.size}</td>
                    <td>{VND_currency.format(variant.price)}</td>
                    <td>{variant.quantity}</td>
                    <td>
                      <FaEdit
                        onClick={() => handelVariants(variant)}
                        className="icon_action"
                        style={{ color: "green" }}
                      />
                      <FaTrashAlt
                        onClick={() => handleDelete(variant)}
                        className="icon_action"
                        style={{ color: "red", marginLeft: "1rem" }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Không có size
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={400}
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
      </div>
    </div>
  );
};

export default ProductDetail;
