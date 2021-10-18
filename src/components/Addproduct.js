import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import placeholder1 from "../img/placeholder1.png";
import "./file.css";
import { Country, State, City } from "country-state-city";
let csc;
const Addproduct = () => {
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

  const onchnagehandler = (e) => {
    setproductdata({
      ...productdata,
      [e.target.name]: e.target.value,
    });
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

    await axios.post("http://localhost:8080/registration", {
      name: productdata.name,
      email: productdata.email,
      address: productdata.address,
      image: Math.floor(Date.now() / 100000) + "--" + file.img1.name,
      country: productdata.country,
      state: productdata.state,
      city: productdata.city,
    });

    await fetch("http://localhost:5000/single", {
      method: "POST",
      body: data,
    });

    // setproductdata({
    //   name: "",
    //   email: "",
    //   address: "",
    //   country: "",
    //   state: "",
    //   city: "",
    // });
    // setfile({
    //   img1: null,
    // });
    history.push("/add");
  };

  return (
    <div>
      <form onSubmit={submitHandler} action="/single">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
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
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
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

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
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
        <div className="mb-3 ">
          <div className="row">
            <div className="col-sm-4">
              <select
                className="form-select"
                aria-label="Default select example"
                name="country"
                onChange={onchnagehandler}
                defaultValue="defualt"
              >
                <option selected vocab="defualt">
                  Country
                </option>
                {Country.getAllCountries().map((data) => {
                  return (
                    <>
                      <option key={data.isoCode} value={data.isoCode}>
                        {data.name}
                      </option>
                      {(csc = data.isoCode)}
                    </>
                  );
                })}
              </select>
            </div>
            <div className="col-sm-4">
              <select
                className="form-select"
                aria-label="Default select example"
                name="state"
                onChange={onchnagehandler}
                defaultValue="defualt1"
              >
                <option selected value="defualt1">
                  state
                </option>
                {State.getAllStates().map((data1) => {
                  if (productdata.country == data1.countryCode) {
                    return (
                      <>
                        <option key={data1.isoCode} value={data1.isoCode}>
                          {data1.name}
                        </option>
                      </>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-sm-4">
              <select
                className="form-select"
                aria-label="Default select example"
                name="city"
                onChange={onchnagehandler}
                defaultValue="defualt2"
              >
                <option selected value="defualt2">
                  city
                </option>
                {City.getCitiesOfState(
                  productdata.country,
                  productdata.state
                ).map((data1) => {
                  return (
                    <>
                      <option key={data1.countryCode} value={data1.name}>
                        {data1.name}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="mb-3 demo">
          <div className="my-3">
            <div className="row ">
              <label htmlFor="exampleInputEmail1" className="form-label">
                {" "}
                profile pic
              </label>
            </div>
          </div>
          <img
            src={src1}
            alt={alt1}
            className="form-img__img-preview  rounded-circle my-2 pointer1"
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addproduct;
