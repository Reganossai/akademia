import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Menu from "./Menu";
import { Link } from "react-router-dom";

const Previouseducation = () => {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
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
              <label htmlFor="password">Name of previous school</label>
              <input
                type="text"
                placeholder="Name of school"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="inp-2">
              <label htmlFor="class">Class Completed</label>
              <input
                type="text"
                placeholder="Class completed"
                name="class"
                required
                value={formData.class}
                onChange={handleChange}
              />
            </div>

            <div className="inp-2">
              <label htmlFor="result">Upload Previous Result</label>
              <input type="file" name="result" required />
            </div>
          </div>
          <button className="btn btn-primary" id="bt-next">
            <Link>Submit</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Previouseducation;
