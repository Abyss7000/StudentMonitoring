import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";

const FeedBack = () => {
  const { user, token } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/thesis-review/${user?.userID}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [user]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md mt-8 shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Feedback</h2>
      {reviews.map((review) => (
        <div key={review._id} className="mb-4">
          <p className="text-gray-600 mb-2">
            {" "}
            Review Date: {formatDate(review.reviewDate)}
          </p>
          <div className="bg-gray-100 p-4 rounded-md">
            {review.comments.map((comment, index) => (
              <p key={index} className="mb-2">
                {comment}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedBack;
