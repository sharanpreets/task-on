import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import "../../style/loginStyle.css";
import { getFromLocalStorage, saveToLocalStorage } from "@/utility/localStorageUtils";
import Link from "next/link";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter()

  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression for password validation
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
    return regex.test(password);
  };

  const handleSave = () => {
    // Perform validation
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      errors.password =
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    // Set errors
    setErrors(errors);



    // If no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      const userEmailPassword = getFromLocalStorage('userInfo');
      console.log(userEmailPassword?.email == formData?.email && userEmailPassword?.password == formData?.password, "userEmailPassword?.email == formData?.email && userEmailPassword?.password == formData?.password")
      if (userEmailPassword?.email == formData?.email && userEmailPassword?.password == formData?.password) {
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 1000
        })
        saveToLocalStorage("token", { token: true })
        router.push("/task")
      } else {
        toast.warning("Please enter valid email & password!", {
          position: "top-center",
          autoClose: 1000
        })
      }
    }
  };


  return (
    <div className="container">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Log in</h2>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <label htmlFor="username" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className={`form-control input-css ${errors.email ? "is-invalid" : ""
                    }`}
                  id="username"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className={`form-control input-css ${errors.password ? "is-invalid" : ""
                    }`}
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn text-light main-bg"
                  onClick={handleSave}
                >
                  Log in
                </button>
                <p style={{ fontSize: "14px", textAlign: "center", marginTop: "8px" }}>{`Don't have an account?`}
                  <Link href="/">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
