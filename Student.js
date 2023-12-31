class Student {
  constructor(studentID, studentName, studentSurname, midtermGrade, finalGrade, courseCode) {
    this.studentID = studentID;
    this.studentName = studentName;
    this.studentSurname = studentSurname;            //This constructor is for creating instance of student related features
    this.courseCode = courseCode;
    this.midtermGrade = midtermGrade;
    this.finalGrade = finalGrade;
    }
  }


  function getLocalCourses() {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];  //getting courses from local storage
    return courses;
  }
  
  function getLocalStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || [];          //getting stored student informations
    return students;
}

function updateLocalStudents(student) {      //Updating local storage with a new student
  let students = getLocalStudents();
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));
}

  document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');            //This part is for the extending or closing the sidebar
    const toggleButton = document.querySelector('.sidebar-toggle');
  
    toggleButton.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
    });

    initializeCourseSelection();

    var addStudentButton = document.getElementById('addStudentButton');   //when user clicks on the addStudentButton, new student will be added to the system
    addStudentButton.addEventListener('click', addStudent);
    updateStudentTable();    //after adding, student table will be updated
    

    document.getElementById('studentNameFilter').addEventListener('input', function() {
      var studentNameFilter = document.getElementById('studentNameFilter').value;
      var courseNameFilter = document.getElementById('courseNameFilter').value;    //This part is for filtering students and updating student table based on this search.
      updateStudentTable(studentNameFilter, courseNameFilter);
    });
  
    document.getElementById('courseNameFilter').addEventListener('input', function() {   //similar to above, but filtering courses this time and updating student table
      var studentNameFilter = document.getElementById('studentNameFilter').value;
      var courseNameFilter = document.getElementById('courseNameFilter').value;
      updateStudentTable(studentNameFilter, courseNameFilter);
    });
    document.getElementById('studentNameFilter').addEventListener('input', function() {
      calculateClassAverage();                                                           //With these functionalities, class average grade can be calculated when filtering is done
    });
    
    document.getElementById('courseNameFilter').addEventListener('input', function() {
      calculateClassAverage();
    });

    addInitialStudents();
});


function initializeCourseSelection() {  //With this function, we get stored courses and we create option element to store each course
  var courses = getLocalCourses();
  var courseSelection = document.getElementById('courseSelection');    //we set value of option courseCode and the context courseName

  courses.forEach(function(course) {
      var option = document.createElement('option');    //and we add these option elements into courseSelection so course can be selected when enrolling a student
      option.value = course.courseCode;
      option.textContent = course.courseName;
      courseSelection.appendChild(option);
  });
}

function addStudent() {    //adding new student
  var studentId = document.getElementById('studentId').value;
  var studentName = document.getElementById('studentName').value;
  var studentSurname = document.getElementById('studentSurname').value;
  var midtermGrade = document.getElementById('midtermGrade').value;
  var finalGrade = document.getElementById('finalGrade').value;
  var courseSelection = document.getElementById('courseSelection');
  var selectedCourseCode = courseSelection.options[courseSelection.selectedIndex].value;


  if (isStudentAlreadyEnrolled(selectedCourseCode, studentId)) {    //we check if the student already enrolled into specific class
    alert("This student already enrolled into this course.");
    return; 
  }


  if (!isGradeValid(midtermGrade) || !isGradeValid(finalGrade)) {      //Checking if the grade is valid or not
    alert("Midterm and final grades should be between 0 and 100.");
    return; 
  }

  var newStudent = new Student(studentId, studentName, studentSurname, midtermGrade, finalGrade, selectedCourseCode);
  updateLocalStudents(newStudent);        //creating object for new student and updating local storage and student table with that
  updateStudentTable();

  console.log("Student added!:", newStudent);
}


function addInitialStudents() {
  let students = getLocalStudents();

  // Check if any student exists in local storage, if not add the initial students below
  if (students.length === 0) {
    const initialStudents = [
      new Student("1", "John", "Doe", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("2", "Jane", "Smith", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("3", "Michael", "Johnson", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("4", "Emily", "Williams", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("5", "David", "Brown", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("6", "Sophia", "Jones", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("7", "Matthew", "Miller", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("8", "Olivia", "Davis", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("9", "James", "Garcia", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("10", "Emma", "Martinez", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("11", "William", "Rodriguez", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("12", "Ava", "Hernandez", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("13", "Alexander", "Lopez", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("14", "Ella", "Gonzalez", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("15", "Daniel", "Perez", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("16", "Mia", "Taylor", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("17", "Christopher", "Moore", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("18", "Sofia", "Miller", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("19", "Andrew", "White", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("20", "Isabella", "Anderson", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("21", "Liam", "Thomas", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("22", "Olivia", "Lee", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("23", "Noah", "Jackson", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("24", "Emma", "Harris", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("25", "Sophia", "Clark", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("26", "Lucas", "Lewis", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("27", "Ava", "King", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("28", "Liam", "Ward", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("29", "Ella", "Green", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("30", "Mason", "Smith", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("31", "Aiden", "Anderson", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("32", "Chloe", "Ward", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("33", "Elijah", "Fisher", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("34", "Grace", "Collins", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("35", "Carter", "Stewart", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("36", "Hannah", "Lopez", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("37", "Liam", "Young", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("38", "Zoe", "Hill", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("39", "Grayson", "Martin", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("40", "Nora", "Gonzalez", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("41", "Ethan", "Baker", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("42", "Aria", "Foster", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("43", "Mason", "Barnes", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("44", "Avery", "Howard", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("45", "Logan", "Reed", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("46", "Lily", "Cooper", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("47", "Jackson", "Wright", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("48", "Scarlett", "Bennett", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("49", "Lucas", "Murphy", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("50", "Layla", "Simmons", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("51", "Aiden", "Sullivan", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("52", "Evelyn", "Fisher", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("53", "Mason", "Jenkins", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("54", "Aria", "Harper", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("55", "Carter", "Davis", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("56", "Scarlett", "Martinez", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("57", "Elijah", "Ward", getRandomGrade(), getRandomGrade(), "CS103"),
      new Student("58", "Emma", "Martin", getRandomGrade(), getRandomGrade(), "CS101"),
      new Student("59", "Logan", "Perez", getRandomGrade(), getRandomGrade(), "CS102"),
      new Student("60", "Zoe", "Smith", getRandomGrade(), getRandomGrade(), "CS103"),
    ];

    // adding these students to local storage
    initialStudents.forEach(student => {
      students.push(student);
    });

    //updating local storage
    localStorage.setItem('students', JSON.stringify(students));
  }
}

function getRandomGrade() {
  return Math.floor(Math.random() * 51) + 50; // Return random numbers
}


function isGradeValid(grade) {
  var numericGrade = parseFloat(grade);
  return !isNaN(numericGrade) && numericGrade >= 0 && numericGrade <= 100;   //This is the function that checks if the grade is between 0 and 100
}



function isStudentAlreadyEnrolled(courseCode, studentId) {  //This function gets stored students
  var students = getLocalStudents();                        //And checks if any student exists who have course code that match with the course code in the parameter
                                                              //after that it checks if student id in the parameter exists in these filtered students or not

  var enrolledStudents = students.filter(function(student) {
      return student.courseCode === courseCode;
  });

  
  return enrolledStudents.some(function(student) {
      return student.studentID === studentId;
  });
}

function updateStudentTable(filterStudentName = '', filterCourseName = '', filterCourseCode = '') {
  var students = getLocalStudents();
  var filteredStudents = students.filter(function(student) {
    var studentName = (student.studentName + ' ' + student.studentSurname).toLowerCase();    //filtering students 
    var courseName = getCourseName(student.courseCode).toLowerCase();

    return studentName.includes(filterStudentName.toLowerCase()) && courseName.includes(filterCourseName.toLowerCase());   //filtering based on course name and student name
  }).filter(function(student) {
    return filterCourseCode === '' || student.courseCode === filterCourseCode;
  });

  var studentTableBody = document.getElementById('studentTableBody');
  studentTableBody.innerHTML = ''; 

  filteredStudents.forEach(function(student) {
    var totalGrade = calculateTotalGrade(student.midtermGrade, student.finalGrade);   //In this part, filtered students will be added in the student table
    var gradingScaleInput = getCourseGradingScale(student.courseCode);              
    var gradingScale = parseInt(gradingScaleInput);
    var letterGrade = calculateLetterGradeFromTotal(totalGrade, gradingScale);
    var studentGPA = calculateGPA(student.studentID);
    var status = letterGrade === 'F' ? 'Failed' : 'Passed'; 

    var row = document.createElement('tr');                    //creating a row for each student and adding related information
    row.innerHTML = `
      <td>${student.studentID}</td>
      <td>${student.studentName}</td>
      <td>${student.studentSurname}</td>
      <td>${student.courseCode}</td>
      <td>${getCourseName(student.courseCode)}</td>
      <td>${getCourseCredit(student.courseCode)}</td>
      <td>${gradingScale}</td>
      <td>${student.midtermGrade}</td>
      <td>${student.finalGrade}</td>
      <td>${totalGrade.toFixed(2)}</td>
      <td>${letterGrade}</td>
      <td>${status}</td>
      <td>${studentGPA || 'N/A'}</td>
      <td><button onclick="editStudentGrade('${student.studentID}' ,'${student.courseCode}')">Update Grades</button></td>   
      <td><button onclick="changeStudentName('${student.studentID}','${student.courseCode}')">Update Student Info</button></td>              
      <td><button onclick="deleteStudent('${student.studentID}')">Delete</button></td>
      
    `;
    studentTableBody.appendChild(row);
  });

  
  updatePassedFailedStudentsTables(filteredStudents);               //updating passed and failed students tables based on filtered students
 


}

function getCourseName(courseCode) {       //In this code,  we get the course code that matches with the given course code
  let courses = getLocalCourses();           //then return the course name if the course code exists in the first place
  let course = courses.find(course => course.courseCode === courseCode);
  return course ? course.courseName : '';
}

function getCourseCredit(courseCode) {    //getting the credit information based on the given course code
  let courses = getLocalCourses();         //then return the credit information
  let course = courses.find(course => course.courseCode === courseCode);
  return course ? course.credit : '';
}

function getCourseGradingScale(courseCode) {           //getting the grading scale based on the given course code then returning it
  let courses = getLocalCourses();
  let course = courses.find(course => course.courseCode === courseCode);
  
  return course ? course.gradingScale : ''; 
}


function calculateTotalGrade(midtermGrade, finalGrade) {      //this method calculates total grade of the student 
                                                              //which is made by %40 midterm and %60 final grades
  return parseFloat(midtermGrade) * 0.4 + parseFloat(finalGrade) * 0.6;
}

function calculateLetterGradeFromTotal(totalGrade, gradingScale) {
  gradingScale = parseInt(gradingScale);
  //this method helps to call the functions that calculate letter grades
  if (gradingScale === 7) {
      return calculateLetterGrade7(totalGrade);     //if the choosen grading scale is 7, this method calls appropriate function
  } else if (gradingScale === 10) {                 //if grading scale is 10, this method calls calculateLetterGrade10 function
      return calculateLetterGrade10(totalGrade);
  } else {
      console.log("Invalid grading scale.");
      return '';
  }
}

function calculateLetterGrade7(totalGrade) {  //This function calculates the letter grade based on grading scale 7
  let letterGrade = '';
  if (totalGrade >= 93) {
      letterGrade = 'A';
  } else if (totalGrade >= 85) {
      letterGrade = 'B';
  } else if (totalGrade >= 77) {
      letterGrade = 'C';
  } else if (totalGrade >= 70) {
      letterGrade = 'D';
  } else {
      letterGrade = 'F';
  }
  return letterGrade;
}

function calculateLetterGrade10(totalGrade) {    //This function calculates the letter grade based on grading scale 10
  let letterGrade = '';
  if (totalGrade >= 90) {                   //The scaling and the gaps between grades is determined according to the project conditions given 
      letterGrade = 'A';
  } else if (totalGrade >= 80) {
      letterGrade = 'B';
  } else if (totalGrade >= 70) {
      letterGrade = 'C';
  } else if (totalGrade >= 60) {
      letterGrade = 'D';
  } else {
      letterGrade = 'F';
  }
  return letterGrade;
}

function editStudentGrade(studentID, courseCode) {
  var students = getLocalStudents();           //finding the student who have specified course ID and course code
  var studentToUpdate = students.find(student => student.studentID === studentID && student.courseCode === courseCode);

  if (!studentToUpdate) {
    console.log('Student cannot be found.');
    return;
  }

  var updatedMidtermGrade = prompt("Latest Midterm Grade:", studentToUpdate.midtermGrade);   //getting the changed midterm and final grades from user
  var updatedFinalGrade = prompt("Latest Final Grade:", studentToUpdate.finalGrade);


  studentToUpdate.midtermGrade = updatedMidtermGrade;   //updating grades of the selected student
  studentToUpdate.finalGrade = updatedFinalGrade;


  localStorage.setItem('students', JSON.stringify(students));     //storing the updated student into local storage

 
  updateStudentTable();      //updating the student table
}




function changeStudentName(studentID, courseCode) {
  var students = getLocalStudents();
  var studentIndex = students.findIndex(student => student.studentID === studentID && student.courseCode === courseCode);

  if (studentIndex !== -1) {
    var updatedStudentName = prompt("Latest First Name:", students[studentIndex].studentName);   //This code is similar to the above, we get the student who have specified student id and course code
    var updatedStudentSurname = prompt("Latest Last Name:", students[studentIndex].studentSurname);    //then get the updated name and surname from user

    
    students[studentIndex].studentName = updatedStudentName;      //then update the first name and the last name of the student
    students[studentIndex].studentSurname = updatedStudentSurname;


    localStorage.setItem('students', JSON.stringify(students));   //and store the student into local storage

    updateStudentTable();   // then finally update the student table
  } else {
    console.log("Student cannot be found.");
  }
}

function deleteStudent(studentID) {
  var students = getLocalStudents();
  var studentToRemove = students.find(student => student.studentID === studentID);   //finding the student to be deleted

  if (!studentToRemove) {
    console.log('Student cannot be found.');
    return;
  }

 
  var coursesWithStudent = students.filter(student => student.studentID === studentID).map(student => student.courseCode);       // finding all courses where the student is enrolled

  // removing the student from each course separately
  coursesWithStudent.forEach(courseCode => {
    var updatedStudents = students.filter(student => !(student.studentID === studentID && student.courseCode === courseCode));
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    updateStudentTable('', '', courseCode); // Updating the table for each course
    updateStudentTable();
  });
}

function calculateClassAverage() {
  var students = getLocalStudents();  //getting all students from local storage
  var filteredStudents = students.filter(function(student) {
    var studentName = (student.studentName + ' ' + student.studentSurname).toLowerCase();    //filtering students based on given student name and course name
    var courseName = getCourseName(student.courseCode).toLowerCase();
    var filterStudentName = document.getElementById('studentNameFilter').value.toLowerCase();
    var filterCourseName = document.getElementById('courseNameFilter').value.toLowerCase();
    return studentName.includes(filterStudentName) && courseName.includes(filterCourseName);
  });

  if (filteredStudents.length > 0) {
    var totalGradesSum = filteredStudents.reduce(function(acc, student) {       //calculating sum of total grades for filtered students
      var totalGrade = calculateTotalGrade(student.midtermGrade, student.finalGrade);    //using the reduce function to create one single value which is sum of total grades
      return acc + totalGrade;
    }, 0);

    var classAverage = totalGradesSum / filteredStudents.length;    //then dividing sum of total grades by student amount
    document.getElementById('classAverageValue').textContent = classAverage.toFixed(2);   //finally we assign the class average text context to the result founded
  } else {
    document.getElementById('classAverageValue').textContent = 'N/A';
  }
}
function countPassedStudents(filteredStudents) {   //In this function, we get filteredStudents which is an array 
  return filteredStudents.filter(student => {      //Filter function returns an array from the students which do not have any F grade 
    var totalGrade = calculateTotalGrade(student.midtermGrade, student.finalGrade);
    var gradingScale = getCourseGradingScale(student.courseCode);              //In this part, we get midterm and final grades of student then calculate total grade
    var letterGrade = calculateLetterGradeFromTotal(totalGrade, gradingScale);   // then we get grading scale and calculate letter grade with these
    return letterGrade !== 'F';                       //then check if the letter grade is F or not
  }).length;
}

function countFailedStudents(filteredStudents) {   //This function is similar to the above, but this time filter function returns an array of students if students have F grade
  return filteredStudents.filter(student => {            //so condition for filter function is opposite this time.
    var totalGrade = calculateTotalGrade(student.midtermGrade, student.finalGrade);
    var gradingScale = getCourseGradingScale(student.courseCode);
    var letterGrade = calculateLetterGradeFromTotal(totalGrade, gradingScale);
    return letterGrade === 'F';
  }).length;
}

function updatePassedFailedStudentsTables(filteredStudents) {
  var passedStudentsTableBody = document.getElementById('passedStudentsTableBody');   //getting HTML tables which contain the passed/failed student tables 
  var failedStudentsTableBody = document.getElementById('failedStudentsTableBody');

  passedStudentsTableBody.innerHTML = ''; 
  failedStudentsTableBody.innerHTML = ''; // Clearing the passed failed student tables

  filteredStudents.forEach(function(student) {
    var totalGrade = calculateTotalGrade(student.midtermGrade, student.finalGrade);   //calculating total grade and letter grade based on filtered students
    var gradingScaleInput = getCourseGradingScale(student.courseCode);
    var gradingScale = parseInt(gradingScaleInput);
    var letterGrade = calculateLetterGradeFromTotal(totalGrade, gradingScale);

    var status = letterGrade === 'F' ? 'Failed' : 'Passed';    //determining the status of student for the class, as passed or failed
    //creating a new table row
    var row = document.createElement('tr');
    row.innerHTML = `                        
      <td>${student.studentID}</td>
      <td>${student.studentName}</td>
      <td>${student.studentSurname}</td>
      <td>${student.courseCode}</td>
      <td>${getCourseName(student.courseCode)}</td>
      <td>${getCourseCredit(student.courseCode)}</td>
      <td>${gradingScale}</td>
      <td>${student.midtermGrade}</td>
      <td>${student.finalGrade}</td>
      <td>${totalGrade.toFixed(2)}</td>
      <td>${letterGrade}</td>
      <td>${status}</td>
    `;

    if (letterGrade === 'F') {
     
      failedStudentsTableBody.appendChild(row);    //add the student to the proper table according to letter grade
    } else {
     
      passedStudentsTableBody.appendChild(row);
    }
  });

  // Calculating number of passed/failed students
  var passedStudentCount = countPassedStudents(filteredStudents);
  var failedStudentCount = countFailedStudents(filteredStudents);

  // binding the number of passed/failed students with the html element
  var passedStudentCountDisplay = document.getElementById('passedStudentCount');
  passedStudentCountDisplay.textContent = passedStudentCount;

  var failedStudentCountDisplay = document.getElementById('failedStudentCount');
  failedStudentCountDisplay.textContent = failedStudentCount;
}

function calculateGPA(studentID) {
  var students = getLocalStudents();        //getting all stored students and finding the student who have matching student id with the given one
  var filteredStudent = students.find(student => student.studentID === studentID);

  if (!filteredStudent) {
    console.log('Student cannot be found.');
    return;
  }

  var totalCredits = 0;
  var totalGradePoints = 0;

 
  students.forEach(function(student) {              //checking the courses that student enrolled 
    if (student.studentID === studentID) {            //for every course, calculating total grade and letter grade 
      var courseCredit = parseFloat(getCourseCredit(student.courseCode));
      var totalGrade = calculateTotalGrade(student.midtermGrade, student.finalGrade);
      var letterGrade = calculateLetterGradeFromTotal(totalGrade, getCourseGradingScale(student.courseCode));

     
      var gradeValue = convertLetterGradeToValue(letterGrade);  //converting the letter grade to a numeric value


      totalCredits += courseCredit;
      totalGradePoints += courseCredit * gradeValue;        //calculating total credits and total grade points based on course credit and numeric grade
    }
  });

  
  var gpa = totalGradePoints / totalCredits;         //finally, dividing total grade points by total credits then finding the GPA

  return gpa.toFixed(2); // expressing the gpa result as two point decimal value
}

function convertLetterGradeToValue(letterGrade) {
  
  switch (letterGrade) {       //This function converts letter grade to numeric value
    case 'A':
      return 4.00;
    case 'B':
      return 3.00;
    case 'C':
      return 2.00;
    case 'D':
      return 1.00;
    case 'F':
      return 0.00;
    default:
      return 0.00;
  }
}




















