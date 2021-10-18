import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./file.css";
const Products = (props) => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const products = await axios.get("http://localhost:8080/registration");
    setproducts(products.data);
  };
  const deletedata = async (id) => {
    var pp = window.confirm("Are you sure ?");

    if (pp) {
      await axios.delete(` http://localhost:8080/registration/${id}`);
      getProducts();
      console.log("delete work");
    } else {
      console.log("delete dont work");
      getProducts();
    }
  };
  console.log(products);
  return (
    <div>
      <Link to="/" className="btn btn-info my-4">
        {" "}
        Add
      </Link>
      <table className="table is-striped is-fullwidth has-background-success-light">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* <h3> {data.length === 0 && "No Notes To Dispay"}</h3> */}
          {products.map((data, id) => (
            <tr key={data.id}>
              <td>{id + 1}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.address}</td>
              <td>{data.city}</td>
              <td>
                <img
                  src={process.env.PUBLIC_URL + `/uploads/${data.image}`}
                  height={50}
                  width={50}
                />
              </td>
              <td>
                <Link
                  to={`edit/${data.id}`}
                  type="button"
                  name=""
                  id=""
                  className=" btn btn-small btn-success"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  name=""
                  id=""
                  className=" btn btn-small btn-danger mx-2 confirm-bg"
                  onClick={(id) => deletedata(data.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
