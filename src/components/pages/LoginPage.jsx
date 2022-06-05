import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyToken } from "../../services/users";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import { Audio } from "react-loader-spinner";

export const LoginPage = (props) => {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));

  const { data, status } = useQuery("verifyToken", async () => {
    if (token) {
      await verifyToken(token);
    }
  });

  useEffect(() => {
    if (status === "success" && token) {
      props.setUserIsAuthenticated(true);
      navigate("/");
    }
  });

  if (status === "loading") {
    return (
      <div className="loader">
        <Audio />
      </div>
    );
  }

  return (
    <>
      <section className="login-container">
        <div className="login-register-box">
          <div className="image-box">
            <img src={require("../../assets/images/login.jpg")} alt="login" />
          </div>
          <div className="form-box">
            <form onSubmit={props.emailSubmit}>
              <h2>Sign In</h2>
              <input
                onChange={props.enterEmail}
                type="email"
                value={props.userEmail}
              />
              <button type="submit">Login</button>
            </form>
            <h5>Enter your email.</h5>
          </div>
        </div>
        <ToastContainer style={{ maxHeight: "100px" }} />
      </section>
    </>
  );
};
