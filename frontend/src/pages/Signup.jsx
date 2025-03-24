import { useEffect, useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";
console.log("Server URL:", SERVER_URL);

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      navigate("/dashboard"); // Redirect if already logged in
    }
  }, [navigate]); // Added dependency

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/v1/user/signup`,
        { username, firstName, lastName, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error.response ? error.response.data : error.message);
      alert("Signup failed: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />

          <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" label="First Name" />
          <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" label="Last Name" />
          <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="Email" label="Email" />
          <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="Password" label="Password" />

          <div className="pt-4">
            <Button onClick={handleSignup} label="Sign up" />
          </div>

          <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
        </div>
      </div>
    </div>
  );
};
