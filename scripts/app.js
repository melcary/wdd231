const navbuttom = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

navbuttom.addEventListener('click', () => {
    navbuttom.classList.toggle('show');
    navBar.classList.toggle('show');
});

document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
    `Last Modification: ${document.lastModified}`;
  

const courses = [
  { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce students to programming. It covers basic concepts such as variables, conditionals, and loops.', technology: ['Python'], completed: true },
  { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course introduces students to the World Wide Web and how pages are built using HTML and CSS.', technology: ['HTML', 'CSS'], completed: true },
  { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will help students learn to create programs using functions and modular design.', technology: ['Python'], completed: true },
  { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce the notion of a class and object-oriented programming principles.', technology: ['Python'], completed: false },
  { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on previous HTML and CSS skills and introduces JavaScript for dynamic web content.', technology: ['HTML', 'CSS', 'JavaScript'], completed: true },
  { subject: 'CSE', number: 212, title: 'Programming with Data Structures', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will prepare students to understand and implement common data structures.', technology: ['Python'], completed: false },
  { subject: 'CSE', number: 310, title: 'Applied Programming for Engineers', credits: 3, certificate: 'Web and Computer Programming', description: 'This course covers real-world engineering problems solved through applied programming techniques.', technology: ['Python', 'JavaScript'], completed: false },
  { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on WDD 131 skills, covering responsive design and advanced JavaScript.', technology: ['HTML', 'CSS', 'JavaScript'], completed: false },
  { subject: 'WDD', number: 330, title: 'Web Frontend Development II', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on WDD 231 skills with advanced frontend frameworks and tooling.', technology: ['HTML', 'CSS', 'JavaScript'], completed: false },
];

const courseDetails = document.getElementById('course-details');
 
function displayCourseDetails(course) {
  courseDetails.innerHTML = '';
  courseDetails.innerHTML = `
    <button id="closeModal">✕ Close</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    <p><strong>Status</strong>: ${course.completed ? '✅ Completed' : '⏳ Pending'}</p>
  `;
  courseDetails.showModal();
 
  document.getElementById('closeModal').addEventListener('click', () => {
    courseDetails.close();
  });
 
 
  courseDetails.addEventListener('click', (e) => {
    if (e.target === courseDetails) {
      courseDetails.close();
    }
  });
}

const grid = document.getElementById('courses-grid');
const creditsEl = document.getElementById('credits-total');
 
function renderCourses(filter) {
  const filtered = filter === 'all'? courses : courses.filter(c => c.subject === filter);
 
  grid.innerHTML = '';
 
  filtered.forEach(course => {
    const card = document.createElement('div');
    card.className = `course-card${course.completed ? ' completed' : ''}`;
    card.textContent = `${course.subject} ${course.number}`;
    card.setAttribute('title', `${course.title} — ${course.credits} credits${course.completed ? ' (Completed)' : ''}`);
    card.addEventListener('click', () => {
      displayCourseDetails(course);
    });
    grid.appendChild(card);
  });
 
  const totalCredits = filtered.reduce((sum, c) => sum + c.credits, 0);
  creditsEl.textContent = `The total credits for courses listed above is ${totalCredits}`;
}

const filterBtns = document.querySelectorAll('.filter-btn');
 
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCourses(btn.dataset.filter);
  });
});
renderCourses('all');
