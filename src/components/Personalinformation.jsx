import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Menu from "./Menu";
import { Link } from "react-router-dom";

const Personalinformation = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    othername: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    select: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="ovrl">
        <h1>Admission Form</h1>
        <h6>Start Applying for Admission </h6>
        <Menu />
        <form>
          <div className="three-flex">
            <div className="inp-2">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                required
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>

            <div className="inp-2">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                required
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>

            <div className="inp-2">
              <label htmlFor="othername">Other Name</label>
              <input
                type="text"
                placeholder="Other Name"
                name="othername"
                required
                value={formData.othername}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="three-flex">
            <div className="inp-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="inp-2">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                placeholder="+234 000 0000 000"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="inp-2">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                placeholder="Male"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="three-flex">
            <div className="inp-2">
              <label htmlFor="phone">Address</label>
              <input
                type="text"
                placeholder="Address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="inp-2">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="text"
                placeholder="01-09-2003"
                name="dob"
                required
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            <div className="inp-2">
              <label htmlFor="select">Select Class</label>
              <input
                type="text"
                placeholder="Select Class"
                name="select"
                required
                value={formData.select}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="inp-2">
            <div className="pass">
              <label htmlFor="passport">Upload Passport</label>
              <input
                type="file"
                placeholder="Passport"
                name="passport"
                required
              />
            </div>
          </div>

          <button className="btn btn-primary" id="bt-next">
            <Link to="guardian-information">Next</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Personalinformation;
