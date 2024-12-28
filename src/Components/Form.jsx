import { useEffect, useState } from "react";
import { postData } from "../api/PostApi";
import PropTypes from "prop-types";

export const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (updateDataApi) {
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
    }
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    try {
      const res = await postData(addData);
      console.log("res", res);

      if (res.status === 200) {
        setData([...data, res.data]);
        setAddData({ title: "", body: "" });
        setUpdateDataApi(null);
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPostData();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Add Post"
          id="body"
          name="body"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

// Add PropTypes for validation
Form.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  updateDataApi: PropTypes.object,
  setUpdateDataApi: PropTypes.func.isRequired,
};
