import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

function ModelAddVariant({
  toast,
  setVariant,
  fetchProducts,
  variant,
  idProduct,
  setShowModelAddVariant,
  showModelAddVariant,
}) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [cookies] = useCookies();

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleClose = () => {
    setShowModelAddVariant(false);
    reset(); // Reset form khi đóng modal
  };
  const handleShow = () => {
    setVariant({
      _id: "",
      product_id: "",
      color: "",
      size: "",
      price: "",
      quantity: "",
    });
    setShowModelAddVariant(true);
  };

  useEffect(() => {
    if (!variant) return;
    setValue("color", variant?.color);
    setValue("size", variant?.size);
    setValue("price", variant?.price);
    setValue("quantity", variant?.quantity);
  }, [variant]);

  // tạo or cập nhật
  const handleVariant = async (data, url, text, method = "post") => {
    try {
      const response = await axios({
        method: method,
        url: url,
        data: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.admin_token,
        },
      });

      if (response.status === 200) {
        toast.success(`${text}`);
        reset();
        handleClose();
        fetchProducts();
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra trong quá trình xử lý.");
    }
  };

  const onSubmit = (data) => {
    const variantDataUpdate = {
      ...data,
      _id: variant?._id,
      product_id: idProduct,
    };
    const variantDataCreate = {
      ...data,
      product_id: idProduct,
    };
    if (variant.color !== "") {
      handleVariant(
        variantDataUpdate,
        "http://localhost:5050/variants",
        "Cập nhật thành công",
        "put"
      );
    } else {
      handleVariant(
        variantDataCreate,
        "http://localhost:5050/variants",
        "Tạo mới thành công",
        "post"
      );
    }
  };

  return (
    <>
      <i onClick={handleShow} className="fas fa-plus-square"></i>

      <Modal
        id="variant-product"
        show={showModelAddVariant}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "1rem" }}>
            {variant.color !== null ? (
              <>Cập Nhật Biến Thể Sản Phẩm</>
            ) : (
              <>Thêm Biến Thể Sản Phẩm</>
            )}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Màu sắc</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập màu"
                {...register("color", { required: "Vui lòng chọn màu sắc" })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Kích thước</label>
              <select
                className="form-control"
                {...register("size", { required: "Vui lòng chọn kích thước" })}
              >
                <option value="">Chọn kích thước</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Số lượng</label>
              <input
                type="number"
                className="form-control"
                placeholder="Nhập số lượng"
                {...register("quantity", {
                  required: "Vui lòng nhập số lượng",
                  min: { value: 1, message: "Số lượng phải lớn hơn 0" },
                })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Giá</label>
              <input
                type="number"
                className="form-control"
                placeholder="Nhập giá sản phẩm"
                {...register("price", {
                  required: "Vui lòng nhập giá",
                  min: { value: 0, message: "Giá phải lớn hơn hoặc bằng 0" },
                })}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
            {variant.color !== "" ? (
              <Button variant="success" type="submit">
                Update
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Thêm
              </Button>
            )}
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ModelAddVariant;
