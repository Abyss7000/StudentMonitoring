const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const thesisRouter = require("./routes/thesis.route");
const courseRouter = require("./routes/course.route");
const thesisReviewRoute = require("./routes/thesisReview.route");
const supervisorRouter = require("./routes/supervisor.route");
const documentRouter = require("./routes/document.route");
const departmentRouter = require("./routes/department.route");
const meetingRouter = require("./routes/meeting.route");
const notificationRouter = require("./routes/notification.route");
const progressUpdateRouter = require("./routes/progressUpdate.route");
const courseRegistrationRouter = require("./routes/courseRegistration.route");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.MONGO_URL;
mongoose
  .connect(uri)
  .then(() => {
    console.log(`DB Connected to ${uri}`);
  })
  .catch((err) => {
    console.log(err.message);
  });

// routes
app.use("/api/course", courseRouter);
app.use("/api/course", courseRegistrationRouter);
app.use("/api/department", departmentRouter);
app.use("/api/document", documentRouter);
app.use("/api/meeting", meetingRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/progress", progressUpdateRouter);
app.use("/api/supervisor", supervisorRouter);
app.use("/api/thesis", thesisRouter);
app.use("/api/thesis-review", thesisReviewRoute);
app.use("/api/auth", userRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);

app.get("/", async (req, res) => {
  res.send("Server is Running");
});

app.all("*", (req, res) => {
  res.send("No Route Found");
});
