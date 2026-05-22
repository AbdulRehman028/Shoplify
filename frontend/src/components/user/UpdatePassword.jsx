import React, { useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserLayout from "../layout/UserLayout";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // --- ADD THESE STATES ---
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Password Updated");
      navigate("/me/profile");
    }
  }, [error, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const userData = {
      oldPassword,
      password,
      confirmPassword,
    };

    updatePassword(userData);
  };

  return (
    <UserLayout>
      <div className="row wrapper mt-0">
        <div className="col-10 col-lg-8">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Update Password</h2>

            {/* --- OLD PASSWORD FIELD --- */}
            <div className="mb-3 position-relative">
              <label htmlFor="old_password_field" className="form-label">
                Old Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span
                className="password-toggle-icon position-absolute"
                style={{ right: "15px", top: "42px", cursor: "pointer" }}
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* --- NEW PASSWORD FIELD --- */}
            <div className="mb-3 position-relative">
              <label htmlFor="new_password_field" className="form-label">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password-toggle-icon position-absolute"
                style={{ right: "15px", top: "42px", cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* --- CONFIRM PASSWORD FIELD --- */}
            <div className="mb-3 position-relative">
              <label htmlFor="confirm_password_field" className="form-label">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="password-toggle-icon position-absolute"
                style={{ right: "15px", top: "42px", cursor: "pointer" }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="btn update-btn w-100"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdatePassword;
