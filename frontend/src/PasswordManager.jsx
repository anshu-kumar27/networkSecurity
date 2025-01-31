import { useState } from "react";
import axios from "axios";
import "./App.css";
import "./PasswordManager.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPlus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function PasswordManager() {
  const [fields, setFields] = useState([
    {
      name: "",
      password: "",
      uploaded: false,
      showPassword: false,
      passwordStrength: "",
    },
  ]);
  const [message, setMessage] = useState("");

  // Toggle password visibility
  const togglePasswordVisibility = (index) => {
    const newFields = [...fields];
    newFields[index].showPassword = !newFields[index].showPassword;
    setFields(newFields);
  };

  // Handle field change for service name and password
  const handleFieldChange = (index, e) => {
    const newFields = [...fields];
    newFields[index][e.target.name] = e.target.value;
    setFields(newFields);
    evaluatePasswordStrength(index, e.target.value);
  };

  // Handle add new field container
  const handleAddField = () => {
    setFields([
      ...fields,
      {
        name: "",
        password: "",
        uploaded: false,
        showPassword: false,
        passwordStrength: "",
      },
    ]);
  };

  // Handle password strength analysis
  const evaluatePasswordStrength = (index, password) => {
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const mediumPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    const newFields = [...fields];
    if (strongPassword.test(password)) {
      newFields[index].passwordStrength = "strong";
    } else if (mediumPassword.test(password)) {
      newFields[index].passwordStrength = "medium";
    } else {
      newFields[index].passwordStrength = "weak";
    }
    setFields(newFields);
  };

  // Handle file upload (POST request)
  const handleUpload = async (index) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addpassword",
        { name: fields[index].name, password: fields[index].password }
      );
      const newFields = [...fields];
      newFields[index].uploaded = true;
      setFields(newFields);
      setMessage(response.data.message); // Display success message
    } catch (error) {
      setMessage("Error uploading password");
    }
  };

  // Handle password update (PUT request)
  const handleUpdate = async (index) => {
    try {
      const response = await axios.put(
        "http://localhost:8000/api/updatepassword",
        {
          name: fields[index].name,
          password: fields[index].password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("Password updated successfully!");
    } catch (error) {
      setMessage("Error updating password");
    }
  };

  // Handle password delete (DELETE request)
  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/deletepassword",
        {
          data: { name: fields[index].name, password: fields[index].password },
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const newFields = [...fields];
      newFields.splice(index, 1);
      setFields(newFields);
      setMessage("Password deleted successfully!");
    } catch (error) {
      setMessage("Error deleting password");
    }
  };

  return (
    <div className="password-manager-container">
      <h1>Password Manager</h1>

      <div className="input-group-container">
        {fields.map((field, index) => (
          <div key={index} className="input-field-container">
            <div className="input-field">
              <label>Service Name</label>
              <input
                type="text"
                placeholder="Enter service name"
                name="name"
                value={field.name}
                onChange={(e) => handleFieldChange(index, e)}
              />
            </div>

            <div className="input-field password-field">
              <label>Password</label>
              <div className="password-container">
                <input
                  type={field.showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={field.password}
                  onChange={(e) => handleFieldChange(index, e)}
                />
                <button
                  className="eye-btn"
                  onClick={() => togglePasswordVisibility(index)}
                >
                  <FontAwesomeIcon
                    icon={field.showPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              {field.password && (
                <div className={`password-strength ${field.passwordStrength}`}>
                  Password Strength: {field.passwordStrength.toUpperCase()}
                </div>
              )}
            </div>

            <div className="buttons-container">
              {!field.uploaded && (
                <button
                  className="upload-btn"
                  onClick={() => handleUpload(index)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              )}

              {field.uploaded && (
                <>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(index)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        <button className="add-field-btn" onClick={handleAddField}>
          Add New Service
        </button>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
