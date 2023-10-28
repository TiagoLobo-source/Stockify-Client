import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import "./PersonalDetails.css";

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005'

function PersonalDetails() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [editedUserData, setEditedUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/user/${id}`)
      .then((oneUser) => {
        setUserData(oneUser.data);
        setEditedUserData(oneUser.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    axios
      .put(`${API_URL}/api/user/${id}/edit`, editedUserData)
      .then((response) => {
        console.log("Data saved", response.data);

        setUserData(editedUserData);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (

    <div className="container">
      <h2>Personal Details</h2>
      {isEditing ? (
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editedUserData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Mobile Phone:
            <input
              type="text"
              name="mobilePhone"
              value={editedUserData.mobilePhone}
              onChange={handleInputChange}
            />
          </label>{" "}
          {user.userPermission === "supplier" ||
            user.userPermission === "admin" ? (
            <label>
              <>Date founded:</>
              <input
                type="text"
                name="dateOfBirth"
                value={editedUserData.dateOfBirth}
                onChange={handleInputChange}
              />
            </label>
          ) : (
            <label>
              <>Date of birth:</>
              <input
                type="text"
                name="dateOfBirth"
                value={editedUserData.dateOfBirth}
                onChange={handleInputChange}
              />
            </label>
          )}
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={editedUserData.address}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Post Code:
            <input
              type="text"
              name="postCode"
              value={editedUserData.postCode}
              onChange={handleInputChange}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={editedUserData.city}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Region:
            <input
              type="text"
              name="region"
              value={editedUserData.region}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              name="country"
              value={editedUserData.country}
              onChange={handleInputChange}
            />
          </label>
          <button type="button" onClick={handleSaveClick}>
            Save
          </button>
        </form>
      ) : (
        <div className="content">
          <p>Name: {userData.name}</p>
          <p>Mobile Phone: {userData.mobilePhone}</p>
          <p>
            {(user.userPermission === "supplier" ||
              user.userPermission === "admin" )? (
              <>Date founded:</>
            ) : (
              <>Date of birth:</>
            )}{" "}

            {userData.dateOfBirth && (
              <p>Date of birth: {userData.dateOfBirth.slice(0, 10)}</p>
            )}

            {/* {userData.dateOfBirth.slice(0, 10)} */}
            {/* {userData.dateOfBirth} */}
          </p>
          <p>Address: {userData.address}</p>
          <p>Post Code: {userData.postCode}</p>
          <p>City: {userData.city}</p>
          <p>Region: {userData.region}</p>
          <p>Country: {userData.country}</p>
          {/* Renderize outros campos de dados */}
          <button className="edit-button" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default PersonalDetails;
