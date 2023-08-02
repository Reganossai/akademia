import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Menu from "./Menu";
import { Link } from "react-router-dom";

const Guardianinformation = () => {
  const [formData, setFormData] = useState({
    guardianfirstname: "",
    guardianlastname: "",
    relationship: "",
    guardianemail: "",
    guardianphone: "",
    dob: "",
    nationality: "",
    guardianaddress: "",
    occupation: "",
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
              <label htmlFor="guardianfirstname">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                name="guardianfirstname"
                required
                value={formData.guardianfirstname}
                onChange={handleChange}
              />
            </div>

            <div className="inp-2">
              <label htmlFor="guardianlastname">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                name="guardianlastname"
                required
                value={formData.guardianlastname}
                onChange={handleChange}
              />
            </div>

            <div className="inp-2">
              <label htmlFor="relationship">Relationship</label>
              <input
                type="text"
                placeholder="Relationship"
                name="relationship"
                required
                value={formData.relationship}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="three-flex">
            <div className="inp-2">
              <label htmlFor="guardianemail">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="guardianemail"
                required
                value={formData.guardianemail}
                onChange={handleChange}
              />
            </div>

            <div className="inp-2">
              <label htmlFor="guardianphone">Phone</label>
              <input
                type="text"
                placeholder="+234 000 0000 000"
                name="guardianphone"
                required
                value={formData.guardianphone}
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
          </div>
          <div className="three-flex">
            <div className="inp-2">
              <label htmlFor="nationality">Nationality</label>
              <input
                type="text"
                placeholder="nationality"
                name="nationality"
                required
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>

            <div className="inp-2">
              <label htmlFor="guardianaddress">Address</label>
              <input
                type="text"
                placeholder="Address"
                name="guardianaddress"
                required
                value={formData.guardianaddress}
                onChange={handleChange}
              />
            </div>

            <div className="inp-2">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                placeholder="Occupation"
                name="occupation"
                required
                value={formData.occupation}
                onChange={handleChange}
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

export default Guardianinformation;
