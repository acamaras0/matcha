import React, { useState } from "react";
import { deletePicture } from "../service/user";

const EditPictures = ({ pics, user }) => {
  const [message1, setMessage1] = useState();
  const [message, setMessage] = useState();

  const deletePic = async (pic_id) => {
    try {
      const response = await deletePicture(pic_id);
      setMessage1(response.msg);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.msg);
      }
    }
  };
  return (
    <div className="card-pictures">
      <h3 className="mt-3">✍ Edit Pictures</h3>
      {message1 ? (
        <p className="error">{message1}</p>
      ) : (
        <p className="error">{message}</p>
      )}
      {pics.length > 0 ? (
        <div className="uploaded-pics">
          {pics
            ? pics.map((pic) => (
                <div className="images" key={pic.id}>
                  <img className="img-top" src={pic.img} alt="uploaded-pic" />
                  <div className="delete-button">
                    <button
                      className="btn btn-danger"
                      onClick={() => deletePic(pic.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : null}
        </div>
      ) : (
        <img alt="backup" className="profile-picture" src={user.profile_pic} />
      )}
    </div>
  );
};

export default EditPictures;
