import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const PicturesForm = () => {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }
  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("http://localhost:5000/upload", formData)
      console.log("res", res);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <input type="file" name="image" onChange={saveFile} />
      <button onClick={uploadFile}>Upload</button>
      <p>{filename}</p>
    </div>
  )
}

export default PicturesForm;










// import React from 'react';
// import ImageUploading from 'react-images-uploading';

// const PicturesForm = () => {
//   const [images, setImages] = React.useState([]);
//   const maxNumber = 5;

//   const onChange = (imageList, addUpdateIndex) => {
//     // data for submit
//     console.log(imageList, addUpdateIndex);
//     setImages(imageList);
//   };

//   return (
//     <div className="img-container">
//       <ImageUploading
//         multiple
//         value={images}
//         onChange={onChange}
//         maxNumber={maxNumber}
//         dataURLKey="data_url"
//       >
//         {({
//           imageList,
//           onImageUpload,
//           onImageRemoveAll,
//           onImageUpdate,
//           onImageRemove,
//           isDragging,
//           dragProps,
//         }) => (
//           // write your building UI
//           <div className="upload__image-wrapper">
//             <button className="btn btn-outline-warning"
//               style={isDragging ? { color: 'red' } : undefined}
//               onClick={onImageUpload}
//               {...dragProps}
//             >
//               Click or Drop here
//             </button>
//             &nbsp;
//             <button onClick={onImageRemoveAll} className="btn btn-outline-warning">Remove all images</button> <br />
//             {imageList.map((image, index) => (
//               <div key={index} className="image-item">
//                 <div> 
//                 <img src={image['data_url']} alt="" width="300" /> </div> <br />
//                 <div className="image-item__btn-wrapper">
//                   <button className="btn btn-outline-warning" onClick={() => onImageRemove(index)}>Remove</button>
//                 </div><br/>
//                 <button className="btn btn-outline-warning" onClick={() => onImageUpdate(index)}>Update</button>

//               </div>
//             ))}
//           </div>
//         )}
//       </ImageUploading>
//     </div>
//   );
// }

// export default PicturesForm;