import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const result = (e) => {
    e.preventDefault();
    setLoading(true);
    setFormData({
      fullname: "",
      email: "",
      password: "",
    });

    const body = {
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
    };

    axios({
      method: "post",
      url: "https://kinkiverse.onrender.com/users/signup",
      data: body,
    })
      .then((response) => {
        if (response.data.success === true) {
          console.log(response.data);
          history.push("/registrationsuccessfull");
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "User Sign up failed due to some reason. Make sure you provided a valid email/password. This could also be as a result that the email/phone number provided is already taken"
        );
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <h1 className="login-loading">
        Please wait while your input is being validated
      </h1>
    );
  }

  return (
    <div className="register-div">
      <div className="bg"></div>
      <div className="bgg">
        <div className="register-header">
          <img
            src="https://s3-alpha-sig.figma.com/img/3d3d/4674/322bf368d5461362a8ce46f551647e93?Expires=1691971200&Signature=JWmP8Maf3cRiJEqDIAr93zMTJMbOq90Zi7Ub6rE8Q~SyLpKaK9C4imMXEqKCQiIWETwrzX5e3Rab6dUYJXcku70v1G1On8hg31EW5nQbbXDVurvjNPEBg3F9io4vEZpB0UCr07oei28wUiRvz44hE5uqAboNJ7sECLr2vswJBwhLynJXp1meeT8ibnfZNf3fxeORYzV9ASxPpP4YsCrr1TXkts0QDgXvSHRiKI4R4ZonDGfqbPk~1TcivL7IfUjfvi~4lTMVwRDChRtaQNgTv3NnIfAPVioW1X79~~Y42eivx7eLDEi2qeAnDr124CGv3BhYKj1zpx7axenz0zTh~A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            className="akademia"
            alt="background"
          />
          <h2>Sign Up</h2>
        </div>
        <form onSubmit={result}>
          <div className="inp-4 ">
            <label htmlFor="city">Full Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              name="fullname"
              required
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>

          <div className="inp-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="inp-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button id="login-btn" className="btn btn-primary">
            Sign Up
          </button>
          <div className="reg-to-login">
            <Link className="first-link" to="/login">
              Have an account?
            </Link>{" "}
            <span className="register-login-span">
              <Link to="/login">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
