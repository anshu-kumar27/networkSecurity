import { useState } from "react";
import axios from "axios";
import "./App.css";
import "./PasswordManager.css";

export default function PasswordManager() {
  const [name, setName] = useState(""); // New state for 'name'
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle file upload (POST request)
  const handleUpload = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addpassword",
        { name, password }
      );
      setMessage(response.data.message); // Display success message
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message); // Display error message from backend
      } else {
        setMessage("Error uploading password");
      }
    }
  };

  // Handle password update (PUT request)
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8000/api/updatepassword",
        {
          name,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage(
        response.data.message
          ? "Password updated successfully!"
          : "Error updating password"
      );
    } catch (error) {
      setMessage("Error updating password");
    }
  };

  // Handle password delete (DELETE request)
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/deletepassword",
        {
          data: { name, password },
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage(
        response.data.message
          ? "Password deleted successfully!"
          : "Error deleting password"
      );
    } catch (error) {
      setMessage("Error deleting password");
    }
  };

  return (
    <div className="password-manager-container">
      <h1>Password Manager</h1>

      {/* Name input */}
      <div className="input-container">
        <label htmlFor="name">Service Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter service name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Password input */}
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="button-container">
        <button className="button" onClick={handleUpload}>
          Upload
        </button>
        <button className="button" onClick={handleUpdate}>
          Update
        </button>
        <button className="button" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {/* Message or Error Display */}
      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}
    </div>
  );
}
