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
  { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', completed: true },
  { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', completed: true },
  { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', completed: true },
  { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', completed: false },
  { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', completed: true },
  { subject: 'CSE', number: 212, title: 'Programming with Data Structures', credits: 2, certificate: 'Web and Computer Programming', completed: false },
  { subject: 'CSE', number: 310, title: 'Applied Programming for Engineers', credits: 3, certificate: 'Web and Computer Programming', completed: false },
  { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, certificate: 'Web and Computer Programming', completed: false },
  { subject: 'WDD', number: 330, title: 'Web Frontend Development II', credits: 2, certificate: 'Web and Computer Programming', completed: false },
];

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