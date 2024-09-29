import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function FormProduct({ title, isUpdate = false }) {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [statusCode, setsStatusCode] = useState();
  const urlUpdate = useParams();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
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
      discount: "",
      category_id: "",
      brand_id: "",
      image: "",
      stock: 1,
    },
  });
  // gán giá trị cho form cập nhật
  useEffect(() => {
    if (isUpdate) {
      fetch(`http://localhost:5050/Products/${urlUpdate.productId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.user_token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setValue("name", res.data.name);
        });
    }
  }, [isUpdate, urlUpdate]);

  //URL API
  const urlApiCreatProduct = "http://localhost:5050/products";

  const urlApiUpdateProduct = `http://localhost:5050/Products/${urlUpdate.productId}`;

  // Form chung
  const CreatUpdateProduct = (data, method, urlApi, success, error) => {
    const formData = new FormData();

    if (data.name) {
      formData.append("name", data.name);
    }
    if (data.prices) {
      formData.append("prices", data.prices);
    }
    if (data.discount) {
      formData.append("discount", data.discount);
    }
    if (data.category_id) {
      formData.append("category_id", data.category_id);
    }
    if (data.brand_id) {
      formData.append("brand_id", data.brand_id);
    }
    if (data.stock) {
      formData.append("stock", data.stock);
    }
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    // Chú ý: data.avatar là một mảng, chúng ta cần lấy phần tử đầu tiên

    fetch(urlApi, {
      method: method,
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + cookies.user_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status_code === 200) {
          setsStatusCode(res.status_code);
          toast.success(() => <p style={{ paddingTop: "1rem" }}>{success}</p>);
        } else {
          // Xử lý các lỗi nếu có
          toast.error(() => <p style={{ paddingTop: "1rem" }}>{error}</p>);
        }
      });
  };
  //Thêm Product
  const createProduct = (data) => {
    console.log(data);
    CreatUpdateProduct(
      data,
      "POST",
      urlApiCreatProduct,
      "Thêm mới thành công",
      "Thêm mới thất bại"
    );
  };

  //Cập nhật Product
  const updateProduct = async (data) => {
    console.log(data);
    CreatUpdateProduct(
      data,
      "PUT",
      urlApiUpdateProduct,
      "Cập nhật thành công",
      "Cập nhật thất bại"
    );
  };

  useEffect(() => {
    if (statusCode === 200) {
      const timeout = setTimeout(() => {
        navigate("/Products");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [statusCode]);

  useEffect(() => {
    fetch(`http://localhost:5050/categories`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //Authorization: "Bearer " + cookies.Product_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.data);
      });
  }, []);

  const categorieList = categories.map((categorie) => (
    <option key={categorie._id} value={categorie._id}>
      {categorie.name}
    </option>
  ));

  useEffect(() => {
    fetch(`http://localhost:5050/brands`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //Authorization: "Bearer " + cookies.Product_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setBrands(res.data);
      });
  }, []);
  const brandList = brands.map((brand) => {
    return (
      <option key={brand._id} value={brand._id}>
        {brand.name}
      </option>
    );
  });
  return (
    <form onSubmit={handleSubmit(isUpdate ? updateProduct : createProduct)}>
      <div className="element__form">
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
        <div className="element__form-header">
          <p>{title}</p>
        </div>
        <div className="element__form-body">
          {/* name */}
          <div className="nameProduct mt-2">
            <label htmlFor="Name">
              {" "}
              Tên sản phẩm <i className="fas fa-star-of-life"></i>
            </label>{" "}
            <br />
            <input
              type="text"
              name="name"
              id="Name"
              {...register(
                "name",
                !isUpdate && {
                  required: "Vui lòng nhập tên sản phẩm",
                }
              )}
            />
            {errors.name && (
              <p className={"text-danger fw-bold"}>{errors.name.message}</p>
            )}
          </div>

          {/* prices */}
          <div className="pricesProduct mt-2">
            <label htmlFor="Prices">
              Giá sản phẩm <i className="fas fa-star-of-life"></i>
            </label>
            <br />
            <input
              type="text"
              name="prices"
              id="Prices"
              {...register(
                "prices",
                !isUpdate && {
                  required: "Vui lòng nhập giá sản phẩm!",
                }
              )}
            />
            {errors.prices && (
              <p className={"text-danger fw-bold"}>{errors.prices.message}</p>
            )}
          </div>

          {/* discount */}
          <div className="discountProduct mt-2">
            <label htmlFor="discount">Mã giảm giá</label> <br />
            <input
              type="text"
              name="discount"
              id="discount"
              {...register("discount")}
            />
          </div>

          {/* image */}
          <div className="mt-3">
            <label htmlFor="formFile" className="form-label">
              <label htmlFor="Image">Ảnh sản phẩm</label>
            </label>
            <input
              className="form-control"
              type="file"
              id="Image"
              name="image"
              {...register(
                "image",
                !isUpdate && {
                  required: "Vui lòng chọn ảnh!",
                }
              )}
            />
            {errors.image && (
              <p className={"text-danger fw-bold"}>{errors.image.message}</p>
            )}
          </div>
          {/* categorie */}
          <div className=" categories mt-2">
            <label htmlFor="Categories">Danh Mục</label> <br></br>
            <select
              {...register(
                "category_id",
                !isUpdate && {
                  required: "Vui lòng chọn danh mục!",
                }
              )}
              id="Categories"
            >
              <option value="">Chọn danh mục</option>
              {categorieList}
            </select>
            {errors.category_id && (
              <p className={"text-danger fw-bold"}>
                {errors.category_id.message}
              </p>
            )}
          </div>
          {/* Brands */}
          <div className=" brands mt-2">
            <label htmlFor="Brands">Thương hiệu</label> <br></br>
            <select
              {...register(
                "brand_id",
                !isUpdate && {
                  required: "Vui lòng chọn thương hiệu!",
                }
              )}
              id="Brands"
            >
              <option value="">Chọn thương hiệu</option>
              {brandList}
            </select>
            {errors.brand_id && (
              <p className={"text-danger fw-bold"}>{errors.brand_id.message}</p>
            )}
          </div>
          {/* stock */}
          <div className="pricesProduct mt-2">
            <label htmlFor="Prices">
              Số lượng sản phẩm <i className="fas fa-star-of-life"></i>
            </label>
            <br />
            <input
              type="text"
              name="stock"
              id="Stock"
              {...register(
                "stock",
                !isUpdate && {
                  required: "Vui lòng nhập giá tổng số lượng sản phẩm!",
                }
              )}
            />
            {errors.stock && (
              <p className={"text-danger fw-bold"}>{errors.stock.message}</p>
            )}
          </div>
        </div>
        <div className="element__form-footer">
          {(() => {
            if (isUpdate) {
              return <button className={"btn btn-success"}>Cập nhật</button>;
            }
            return <button className={"btn btn-primary"}>Thêm mới</button>;
          })()}
        </div>
      </div>
    </form>
  );
}

export default FormProduct;
