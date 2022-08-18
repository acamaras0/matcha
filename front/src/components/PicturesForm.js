import React from 'react';
import ImageUploading from 'react-images-uploading';

const PicturesForm = () => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="img-container">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button className="btn btn-outline-warning"
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll} className="btn btn-outline-warning">Remove all images</button> <br />
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <div> 
                <img src={image['data_url']} alt="" width="300" /> </div> <br />
                <div className="image-item__btn-wrapper">
                  <button className="btn btn-outline-warning" onClick={() => onImageUpdate(index)}>Update</button>
                  <button className="btn btn-outline-warning" onClick={() => onImageRemove(index)}>Remove</button>
                </div><br/>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default PicturesForm;