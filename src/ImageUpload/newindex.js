import React, { useState } from "react";
import storage from "../Firebase/index";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBProgress,
  MDBProgressBar,
  MDBContainer,
} from "mdb-react-ui-kit";

import FileUpload from "../file-upload/file-upload.component";

function Newindex() {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [numfiles, setNumfiles] = useState(0);

  const updateUploadedFiles = (files) => {
    setNewUserInfo({ ...newUserInfo, profileImages: files });
  };

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
    // get number of files
    setNumfiles(e.target.files.length);
  };

  const handleUpload = () => {
    const promises = [];
    images.map((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              setUrls((prevState) => [...prevState, urls]);
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => console.log("All images uploaded"))
      .catch((err) => console.log(err));
  };

  console.log("images: ", images);
  console.log("urls", urls);

  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic to handle form...
  };

  return (
    <div className="App mt-5">
      <form onSubmit={handleSubmit}>
        <MDBProgress height="20">
          <MDBProgressBar
            striped
            animated
            valuemin={0}
            valuemax={100}
            width={progress}
          >
            {progress}%
          </MDBProgressBar>
        </MDBProgress>

        <FileUpload
          accept=".jpg,.png,.jpeg,.pdf,.docx,.doc,.ppt,.pptx,.xls,.xlsx,.txt"
          label="Your Files"
          multiple
          updateFilesCb={updateUploadedFiles}
          onChange={handleChange}
        />
        <span>Selected {numfiles} files: </span>
        <button onClick={handleUpload} type="submit">
          UPLOAD
        </button>
      </form>

      <br />

      <MDBContainer>
        <MDBRow>
          {urls.map((url, i) => (
            <MDBCol xl="3" sm="3">
              <MDBCard style={{ width: "18rem" }} key={i}>
                <MDBCardImage
                  src={url || "http://via.placeholder.com/300"}
                  alt="your-file"
                  position="top"
                  width={250}
                  height={250}
                />
                <MDBCardBody>
                  <a href={url} download target="_blank">
                    <MDBBtn outline rounded className="mx-2" color="info">
                      Download
                    </MDBBtn>
                  </a>
                  {/* <MDBBtn floating tag="a">
                  <MDBIcon fas icon="download" />
                </MDBBtn> */}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Newindex;
