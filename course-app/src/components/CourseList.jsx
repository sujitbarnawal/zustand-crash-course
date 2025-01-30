import useCourseStore from "../app/courseStore";

const CourseList = () => {
  const courses = useCourseStore((state) => state.courses);
  const removeCourse = useCourseStore((state) => state.removeCourse);
  const toggleCourseStatus = useCourseStore((state) => state.toggleCourseStatus);

  return (
    <ul>
      {courses.map((course, i) => (
        <li
          key={i}
          className="course-item"
          style={{ backgroundColor: course.completed ? "#00ff0044" : "white" }}
        >
          <span className="course-item-col-1">
            <input 
              checked={course.completed} 
              onChange={() => toggleCourseStatus(course.id)} 
              type="checkbox" 
            />
          </span>
          <span style={{color:"black"}}>{course?.title}</span>
          <button onClick={() => removeCourse(course.id)} className="delete-btn">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CourseList;
