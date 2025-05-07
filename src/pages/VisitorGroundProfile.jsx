import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { storage } from ".//firebase";
import { getStorage, deleteObject } from "firebase/storage";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setGroundId,
  setAddress,
  setOwnerName,
  setEmail,
  setPhone,
  setGroundName,
} from "../redux/slices/groundSlice";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";

function VisitorGroundprofile() {
  const history = useHistory();
  const { localStorage } = window;
  const [id, setID] = useState(localStorage.getItem("visitorID"));
  const [groundName, setGroundName] = useState(
    window.localStorage.getItem("visitiorName")
  );

  useEffect(() => {
    setDp();
    setCover();
  });
  //Dp
  const [dp_Url, setDpUrl] = useState(localStorage.getItem("visitordpUrl"));

  useEffect(() => {
    setTimeout(() => {
      setDpUrl(localStorage.getItem("visitordpUrl"));
    }, 1000);
  }, [dp_Url]);

  //Cover
  const [cover_Url, setCoverUrl] = useState(
    localStorage.getItem("visitorcoverUrl")
  );

  useEffect(() => {
    setTimeout(() => {
      setCoverUrl(localStorage.getItem("visitorcoverUrl"));
    }, 1000);
  }, [cover_Url]);

  //Timeline
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, `groundtimeline/${id}`);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          let AllURL = imageList;
          AllURL.push(url);
          setImageList([...AllURL]);
        });
      });
    });
  }, []);

  const setDp = () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `grounddp/${id}`))
      .then((url) => {
        localStorage.setItem("visitordpUrl", url);
      })
      .catch((err) => console.log(err));
  };

  const setCover = (groundId) => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `groundcover/${id}`))
      .then((url) => {
        console.log("Cover URL: ", url);
        localStorage.setItem("visitorcoverUrl", url);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="ground-page">
      {/* Hero Section with Cover Photo */}
      <div className="ground-hero-section">
        <div className="ground-cover-container">
          {cover_Url ? (
            <a href={cover_Url} target="_blank" rel="noopener noreferrer">
              <img
                src={cover_Url}
                className="ground-cover-image"
                alt="Ground Cover"
              />
            </a>
          ) : (
            <div className="ground-cover-placeholder">
              {/* <span>Add a cover photo for your ground</span> */}
            </div>
          )}

          {/* <div className="ground-cover-controls">
              <input
                type="file"
                id="select-image2"
                className="ground-file-input"
                onChange={(event) => {
                  setCoverUpload(event.target.files[0]);
                }}
              />
              <label htmlFor="select-image2" className="me-2">
                <span className="btn btn-outline-light ground-select-btn">
                  <i className="bi bi-file-earmark me-1"></i> Select Cover
                </span>
              </label>
              <button
                className="btn btn-success ground-upload-btn"
                onClick={uploadCover}
              >
                <i className="bi bi-cloud-arrow-up-fill me-1"></i> Upload Cover
              </button>
            </div> */}
        </div>
      </div>

      <div className="container ground-content-container">
        <div className="row">
          {/* Left Column - Ground Profile Info */}
          <div className="col-md-4">
            <div className="ground-profile-card">
              <div className="ground-dp-section">
                <div className="ground-dp-container">
                  {dp_Url ? (
                    <a href={dp_Url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={dp_Url}
                        className="ground-dp-image"
                        alt="Ground Logo"
                      />
                    </a>
                  ) : (
                    <div className="ground-dp-placeholder">
                      <i className="bi bi-image"></i>
                    </div>
                  )}
                </div>

                {/* <div className="ground-dp-controls">
                    <input
                      type="file"
                      id="select-image"
                      className="ground-file-input"
                      onChange={(event) => {
                        setDpUpload(event.target.files[0]);
                      }}
                    />
                    <label htmlFor="select-image" className="me-2">
                      <span className="btn btn-outline-dark btn-sm ground-select-btn">
                        <i className="bi bi-file-earmark me-1"></i> Select Image
                      </span>
                    </label>
                    <button
                      className="btn btn-success btn-sm ground-upload-btn"
                      onClick={uploadDp}
                    >
                      <i className="bi bi-cloud-arrow-up-fill me-1"></i> Upload
                      Logo
                    </button>
                  </div> */}
              </div>

              <div className="ground-info-section">
                <h1 className="ground-name">{groundName}</h1>
                <p className="ground-description">
                  Best Ground in Twin Cities
                  <br />
                  Here to achieve your dreams
                </p>

                <div className="ground-action-buttons">
                  <button
                    className="btn btn-primary ground-msg-btn"
                    onClick={() => {
                      window.open("http://localhost:3001/", "_blank");
                    }}
                  >
                    <i className="bi bi-chat-dots-fill me-2"></i>Message
                  </button>
                  <button className="btn btn-info ground-booking-btn">
                    <Link to="/booking">
                      <i className="bi bi-calendar-check me-2"></i>Bookings{" "}
                    </Link>
                  </button>
                  <button
                    className="btn btn-secondary ground-academy-btn"
                    onClick={() => history.push("/academyuser", { groundName })}
                  >
                    <i className="bi bi-trophy me-2"></i>Academy
                  </button>

                  {/* <button className="btn btn-success ground-location-btn">
                    <i className="bi bi-geo-alt-fill me-2"></i>Location
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Timeline Gallery */}
          <div className="col-md-8">
            <div className="ground-timeline-section">
              <div className="ground-timeline-header">
                <h2 className="ground-timeline-title">
                  <i className="bi bi-images me-2"></i>Ground Timeline
                </h2>
                {/* <div className="ground-timeline-upload">
                    <input
                      type="file"
                      id="timeline-image-upload"
                      className="ground-file-input"
                      onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                      }}
                    />
                    <label htmlFor="timeline-image-upload" className="me-2">
                      <span className="btn btn-outline-dark ground-select-btn">
                        <i className="bi bi-file-earmark-image me-1"></i> Select
                        Photo
                      </span>
                    </label>
                    <button
                      className="btn btn-success ground-upload-btn"
                      onClick={uploadImage}
                    >
                      <i className="bi bi-cloud-arrow-up-fill me-1"></i> Add to
                      Timeline
                    </button>
                  </div> */}
              </div>

              <div className="ground-timeline-gallery">
                <div className="row g-4">
                  {imageList.length > 0 &&
                    imageList.map((url, index) => (
                      <div key={index} className="col-lg-4 col-md-6">
                        <div className="ground-gallery-item">
                          <div className="ground-gallery-image-container">
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={url}
                                className="ground-gallery-image"
                                alt="Timeline"
                              />
                            </a>
                          </div>
                          {/* <div className="ground-gallery-actions">
                              <button
                                className="btn btn-danger ground-delete-btn"
                                onClick={(e) => deletePicture(e, index)}
                              >
                                <i className="bi bi-trash me-1"></i> Remove
                              </button>
                            </div> */}
                        </div>
                      </div>
                    ))}

                  {imageList.length === 0 && (
                    <div className="ground-empty-gallery">
                      <div className="text-center p-5">
                        <i className="bi bi-camera-fill ground-empty-icon"></i>
                        <h4>No Images in Timeline</h4>
                        <p>
                          Upload your first image to start building your
                          ground's timeline.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorGroundprofile;
