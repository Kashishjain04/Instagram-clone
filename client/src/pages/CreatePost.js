import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions/index";

const CreatePost = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(""),
    [body, setBody] = useState(""),
    [image, setImage] = useState(""),
    [pic, setPic] = useState("");

  useEffect(() => {
    if (pic) {
      dispatch(actions.createPost(title, body, pic));
    }
    // eslint-disable-next-line
  }, [pic]);

  const post = () => {
    console.log("object");
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "kashish");
    fetch("https://api.cloudinary.com/v1_1/kashish/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card post-input">
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        onClick={post}
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
      >
        {" "}
        Post{" "}
      </button>
    </div>
  );
};

export default CreatePost;
