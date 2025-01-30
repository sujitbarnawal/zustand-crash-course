
import { useState } from "react";
import useCourseStore from "../app/courseStore";

const CourseForm = () => {
  const addCourse = useCourseStore((state) => state.addCourse);

  const [courseTitle, setCourseTItle] = useState("");

  const handleCourseSubmit = () => {
    if (!courseTitle) return alert("Please add a course title");
    addCourse({
      id: Math.ceil(Math.random() * 1000000),
      title: courseTitle,
    });
    setCourseTItle("");
  };

  return (
    <div className="form-container">
      <input
        onChange={(e) => setCourseTItle(e.target.value)}
        type="text"
        className="form-input"
        value={courseTitle}
      />
      <button onClick={() => handleCourseSubmit()} className="form-submit-btn">
        Add Course
      </button>
    </div>
  );
};

export default CourseForm;
