import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const LeaveFeedback = () => {
  const { user, token } = useContext(AuthContext);
  const [thesisList, setThesisList] = useState([]);
  const [selectedThesis, setSelectedThesis] = useState({});
  const [comments, setComments] = useState("");

  useEffect(() => {
    const fetchTheses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/thesis/${user.userID}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setThesisList(response.data.thesis);
      } catch (error) {
        console.error("Error fetching theses", error);
      }
    };

    fetchTheses();
  }, [user.userID]);

  const handleThesisChange = (thesisID) => {
    const selectedThesisData = thesisList.find(
      (thesis) => thesis._id === thesisID
    );
    setSelectedThesis(selectedThesisData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/thesis-review/send-review",
        {
          thesisID: selectedThesis._id,
          studentID: user.userID,
          comments: comments,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success(res.data.message);
      setComments("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md mt-8 shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Leave Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="thesis"
            className="block text-sm font-medium text-gray-600"
          >
            Select Thesis
          </label>
          <select
            id="thesis"
            name="thesis"
            onChange={(e) => handleThesisChange(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="" disabled>
              Select Thesis
            </option>
            {thesisList.map((thesis) => (
              <option key={thesis._id} value={thesis._id}>
                {thesis.title}
              </option>
            ))}
          </select>
        </div>
        {Object.keys(selectedThesis).length ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Student Name
            </label>
            <p className=" text-sm font-medium text-gray-600">
              {selectedThesis?.student[0]?.name}
            </p>
          </div>
        ) : (
          <p></p>
        )}

        <div className="mb-4">
          <label
            htmlFor="details"
            className="block text-sm font-medium text-gray-600"
          >
            Thesis Details
          </label>
          <textarea
            id="details"
            name="details"
            value={selectedThesis.details || ""}
            readOnly
            rows={4}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="comments"
            className="block text-sm font-medium text-gray-600"
          >
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit Feedback
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LeaveFeedback;
