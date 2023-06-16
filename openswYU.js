const grades = JSON.parse(localStorage.getItem('grades')) || [];

function SaveGrades() {
  localStorage.setItem('grades', JSON.stringify(grades));
}

//학생 성적관리 시스템 생성
function CreateStudent(name, subject, score) {
  const grade = {
    name,
    subject,
    score
  };
  grades.push(grade);
  SaveGrades();
}

//업데이트 기능 
function UpdateStudent(index, UpdateStudent) {
  grades[index] = UpdateStudent;
  SaveGrades();
}

//삭제 기능
function DeleteStudent(index) {
  grades.splice(index, 1);
  SaveGrades();
}

//검색 기능
function ReadStudent() {
  if (grades.length === 0) {
    console.log("학생 정보가 없습니다.");
  } else {
    console.log("=======성적 관리=======");
    grades.forEach((grade, index) => {
      console.log(`번호: ${index}\n 이름: ${grade. name}\n 과목: ${grade.subject}\n 점수: ${grade.score}`);
    });
  }
}

//복사해서 크롬으로 열어야합니당