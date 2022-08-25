import React from "react";

const PictureUpdate = () => {
  return (
    <div>
      <div className="card">
        <h1>✍</h1>
        <h3>Picture Update</h3>
        <div className="row">
          <form>
            <div className="form-group">
              <input type="file" multiple />
            </div>
            <div className="form-group">
              <button className="btn btn-warning" type="submit">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PictureUpdate;
