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

// TIMESTAMP 
const tsField = document.getElementById('timestamp');
if (tsField) {
  tsField.value = new Date().toLocaleString('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}

// MODALS 
document.querySelectorAll('.learn-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.getElementById(btn.dataset.modal);
    if (modal) modal.showModal();
  });
}); 
 
document.querySelectorAll('.modal-close-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.getElementById(btn.dataset.close);
    if (modal) modal.close();
  });
});

document.querySelectorAll('.level-modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.close();
  });
});