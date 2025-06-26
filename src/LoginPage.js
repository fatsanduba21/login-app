import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuthAction = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? "/auth/signup" : "/auth/login";
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        if (isSignUp) {
          alert("Signup successful! Please log in.");
          setIsSignUp(false);
        } else {
          const { token } = await response.json();
          localStorage.setItem("token", token);
          navigate("/dashboard");
        }
      } else {
        const data = await response.json();
        alert(`Authentication failed: ${data.error}`);
      }
    } catch (error) {
      alert(`Authentication failed: ${error.message}`);
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:5000/auth/${provider}`;
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>{isSignUp ? "Create Account" : "Sign In"}</h2>
        <p>
          {isSignUp
            ? "Enter your email to sign up for this app"
            : "Enter your credentials to sign in"}
        </p>
        <form onSubmit={handleAuthAction}>
          <input
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            {isSignUp ? "Sign up with email" : "Sign in"}
          </button>
        </form>
        <div className="divider">
          <span>or continue with</span>
        </div>
        <div className="social-logins">
          <button className="social-btn google" onClick={() => handleSocialLogin("google")}>
            <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google" />
          </button>
          <button className="social-btn apple" onClick={() => handleSocialLogin("apple")}>
            <img src="https://www.vectorlogo.zone/logos/apple/apple-icon.svg" alt="Apple" />
          </button>
          <button className="social-btn github" onClick={() => handleSocialLogin("github")}>
            <img src="https://www.vectorlogo.zone/logos/github/github-icon.svg" alt="GitHub" />
          </button>
          <button className="social-btn facebook" onClick={() => handleSocialLogin("facebook")}>
            <img src="https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg" alt="Facebook" />
          </button>
        </div>
        <p className="toggle-auth">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <a href="#" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Sign in" : "Sign up"}
          </a>
        </p>
        <p className="terms">
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;