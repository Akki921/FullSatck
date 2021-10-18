import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import placeholder1 from "../img/placeholder1.png";
import "./file.css";
import { Country, State, City } from "country-state-city";
let csc;
const EditProduct = () => {
  const [productdata, setproductdata] = useState({
    name: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
  });
  const [{ alt1, src1 }, setImg1] = useState({
    src1: placeholder1,
    alt1: "Upload an Image",
  });

  const [file, setfile] = useState({
    img1: null,
  });

  const history = useHistory();
  const { id } = useParams();

  const onchnagehandler = (e) => {
    setproductdata({
      ...productdata,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getProductById();
  }, []);
  const getProductById = async () => {
    const response = await axios.get(
      `http://localhost:8080/registration/${id}`
    );
  };

  const onchnagehandler1 = (e) => {
    setfile({ ...file, [e.target.name]: e.target.files[0] });
    setImg1({
      src1: URL.createObjectURL(e.target.files[0]),
      alt1: e.target.files[0].name,
    });
  };

  console.log(productdata.state);
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("img1", file.img1);

    console.log(data);

    await axios.patch(`http://localhost:8080/registration/${id}`, {
      name: productdata.name,
      email: productdata.email,
      address: productdata.address,
      image: file.img1.name,
      country: productdata.country,
      state: productdata.state,
      city: productdata.city,
    });
    await axios.post("http://localhost:5000/single", {
      body: data,
    });
    history.push("/add");
  };

  const removename = () => {
    setImg1({
      src1: placeholder1,
      alt1: "Upload an Image",
    });
    setfile({
      img1: "",
    });
  };

  return (
    <div>
      <form onSubmit={submitHandler} action="/single">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="title"
            value={productdata.name}
            aria-describedby="emailHelpId"
            placeholder="name"
            onChange={onchnagehandler}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="price"
            value={productdata.email}
            onChange={onchnagehandler}
            aria-describedby="emailHelpId"
            placeholder="email"
          />
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            name="address"
            id="price"
            value={productdata.address}
            onChange={onchnagehandler}
            aria-describedby="emailHelpId"
            placeholder="Address"
          />
        </div>
        <div class="mb-3 ">
          <div className="row">
            <div className="col-sm-4">
              <select
                class="form-select"
                aria-label="Default select example"
                name="country"
                onChange={onchnagehandler}
              >
                <option selected>Country</option>
                {Country.getAllCountries().map((data) => {
                  return (
                    <>
                      <option value={data.isoCode}>{data.name}</option>
                      {(csc = data.isoCode)}
                    </>
                  );
                })}
              </select>
            </div>
            <div className="col-sm-4">
              <select
                class="form-select"
                aria-label="Default select example"
                name="state"
                onChange={onchnagehandler}
              >
                <option selected>state</option>
                {State.getAllStates().map((data1) => {
                  if (productdata.country == data1.countryCode) {
                    return (
                      <>
                        <option value={data1.isoCode}>{data1.name}</option>
                      </>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-sm-4">
              <select
                class="form-select"
                aria-label="Default select example"
                name="city"
                onChange={onchnagehandler}
              >
                <option selected>city</option>
                {City.getCitiesOfState(
                  productdata.country,
                  productdata.state
                ).map((data1) => {
                  return (
                    <>
                      <option value={data1.name}>{data1.name}</option>
                    </>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <div className="my-3">
            <div className="row my-3">
              <label className="form-label"> profile pic</label>
            </div>
            <div className="row">
              <div className="col-sm-1">
                <button
                  className="label btn  btn-danger btn-small"
                  onClick={removename}
                >
                  <span className="label">
                    {" "}
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </div>
              <div className="col-sm-3">
                <span className="form-label">
                  {file.img1 === null ? "no image to display" : file.img1.name}
                </span>
              </div>
            </div>
          </div>
          <img
            src={src1}
            alt={alt1}
            className="form-img__img-preview my-1 rounded-circle my-3"
            width={100}
            height={100}
          />
          <input
            input
            type="file"
            name="img1"
            className="file"
            onChange={onchnagehandler1}
            aria-describedby="emailHelpId"
            placeholder="price"
            //style={{ visibility: "hidden" }}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
