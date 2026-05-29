const hamBtn  = document.querySelector('#ham-btn');
const mainNav = document.querySelector('#main-nav');
 
hamBtn.addEventListener('click', () => {
  hamBtn.classList.toggle('open');
  mainNav.classList.toggle('open');
});
 
document.querySelectorAll('nav ul li a').forEach(link => {
  if (link.href === window.location.href) link.classList.add('active');
});
 
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
    `Last Modification: ${document.lastModified}`;

const params = new URLSearchParams(window.location.search);
 
const fields = {
  'fname':     's-fname',
  'lname':     's-lname',
  'email':     's-email',
  'phone':     's-phone',
  'org':       's-org',
  'timestamp': 's-timestamp',
};
 
for (const [param, elId] of Object.entries(fields)) {
  const el  = document.getElementById(elId);
  const val = params.get(param);
  if (el && val) el.textContent = decodeURIComponent(val);
}