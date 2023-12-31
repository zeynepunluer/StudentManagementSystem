class Course {
  constructor(courseCode, courseName, credit, gradingScale) {
    this.courseCode = courseCode;
    this.courseName = courseName;        //Initializing course informations in this constructor
    this.credit = credit;
    this.gradingScale = parseInt(gradingScale); 
  }

  static addCourse(courseCode, courseName, credit, gradingScale) { //This method adds a new course to the storage
    let courses = JSON.parse(localStorage.getItem('courses')) || []; //Getting stored courses or creating an empty array
    const existingCourseIndex = courses.findIndex(course => course.courseCode === courseCode);
  
    if (existingCourseIndex !== -1) { //Checking if the course already exists
      alert('This course already exists.');
    } else {
      const newCourse = new Course(courseCode, courseName, credit, gradingScale); //Creating a new course object
      courses.push(newCourse); //adding the new course to the courses array
      localStorage.setItem('courses', JSON.stringify(courses));   //storing the courses array in local storage
    }
  }
  
  static updateCourse(courseCode, courseName, credit, gradingScale) {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];   
    const existingCourseIndex = courses.findIndex(course => course.courseCode === courseCode);
  
    if (existingCourseIndex !== -1) {
      courses[existingCourseIndex].courseName = courseName;  //This part updates course details in the courses array
      courses[existingCourseIndex].credit = credit;
      courses[existingCourseIndex].gradingScale = gradingScale;
  
      // Öğrenci bilgilerini güncelle
      let students = JSON.parse(localStorage.getItem('students')) || []; //getting student data
      students.forEach(student => {                  //In this part, corresponding course details get updated
        if (student.courseCode === courseCode) {
          student.courseName = courseName;
          student.credit = credit;
          student.gradingScale = gradingScale;
        }
      });
  
      localStorage.setItem('courses', JSON.stringify(courses)); //Storing updated courses and student infos in local storage
      localStorage.setItem('students', JSON.stringify(students));
    } else {
      console.log('Course not found');
    }
  }
  
}

function handleSubmit(event) {  
  event.preventDefault();

  const courseNumberInput = document.getElementById('courseNumber');          //getting course info from form inputs
  const courseNameInput = document.getElementById('courseName');
  const courseCreditInput = document.getElementById('courseCredit');
  const gradingScaleInput = document.getElementById('gradingScale');

  const courseCode = courseNumberInput.value;
  const courseName = courseNameInput.value;
  const courseCredit = courseCreditInput.value;
  const gradingScale = gradingScaleInput.value;

  Course.addCourse(courseCode, courseName, courseCredit, gradingScale);       //adding the course according to form inputs
  renderCourses();

  courseNumberInput.value = '';           //Clearing form inputs
  courseNameInput.value = '';
  courseCreditInput.value = '';
  gradingScaleInput.value = '';
}

function handleUpdate(event) {                  //This method follows similar steps as the method above
  event.preventDefault();     //but this is for updating course information

  const updateCourseNumberInput = document.getElementById('updateCourseNumber');
  const updateCourseNameInput = document.getElementById('updateCourseName');
  const updateCourseCreditInput = document.getElementById('updateCourseCredit');
  const updateGradingScaleInput = document.getElementById('updateGradingScale');

  const updateCourseNumber = updateCourseNumberInput.value;
  const updateCourseName = updateCourseNameInput.value;
  const updateCourseCredit = updateCourseCreditInput.value;
  const updateGradingScale = updateGradingScaleInput.value;

  Course.updateCourse(updateCourseNumber, updateCourseName, updateCourseCredit, updateGradingScale);
  renderCourses();

  updateCourseNumberInput.value = '';
  updateCourseNameInput.value = '';
  updateCourseCreditInput.value = '';
  updateGradingScaleInput.value = '';
}

function handleDelete(event) {    //With this method, courses can be deleted
  event.preventDefault();

  const deleteCourseNumberInput = document.getElementById('deleteCourseNumber');  //getting the course code to be deleted from input
  const deleteCourseNumber = deleteCourseNumberInput.value;

  let courses = JSON.parse(localStorage.getItem('courses')) || [];
  const filteredCourses = courses.filter(course => course.courseCode !== deleteCourseNumber);    //filtering the course with the specified course code from the courses array

  localStorage.setItem('courses', JSON.stringify(filteredCourses));  //updating stored courses by replacing them with the filtered list
  renderCourses();     //Constructoring the updated courses list

  deleteCourseNumberInput.value = '';
}

function renderCourses() {    //This method helps to manage list of courses
  let courses = JSON.parse(localStorage.getItem('courses')) || [];
  const tableBody = document.querySelector('#courseTable tbody');
  tableBody.innerHTML = '';

  courses.forEach(course => {    //looping through courses array and display every course with a new row using HTML elements
    const row = tableBody.insertRow();
    row.innerHTML = `                        
      <td>${course.courseCode}</td>
      <td>${course.courseName}</td>
      <td>${course.credit}</td>
      <td>${course.gradingScale}</td>
    `;
  });
}
document.addEventListener('DOMContentLoaded', initialize);  

function initialize() {      //This function manages event listeners
  const form = document.getElementById('courseForm');
  const updateForm = document.getElementById('updateCourseForm');  //getting the form elements for required acitons
  const deleteForm = document.getElementById('deleteCourseForm');

  form.addEventListener('submit', handleSubmit);
  updateForm.addEventListener('submit', handleUpdate);    //adding event listeners for updating, deleting, submitting actions
  deleteForm.addEventListener('submit', handleDelete);

  const coursesInLocalStorage = JSON.parse(localStorage.getItem('courses'));

  if (!coursesInLocalStorage || coursesInLocalStorage.length === 0) {
    // Checking if any course exists in local storage, if not add the courses below
    Course.addCourse('CS101', 'Data Structures', 6, 7);
    Course.addCourse('CS102', 'Alghoritms', 6, 7);
    Course.addCourse('CS103', 'Web Developing', 6, 10);

  }
  renderCourses();
}
document.addEventListener('DOMContentLoaded', function () {     //This event listener is for the sidebar to become visible
  const toggleButton = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');

  toggleButton.addEventListener('click', function () {   //we set event listener for sidebar button to extend or fold up
    sidebar.classList.toggle('collapsed');  // when the button is clicked, css class of sidebar called collapsed is added or removed
  });                                        //so sidebar becomes visible and invisible
});
