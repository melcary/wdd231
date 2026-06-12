
const hamBtn = document.querySelector('#ham-btn');
const mainNav = document.querySelector('#nav-links');
 
hamBtn.addEventListener('click', () => {
  hamBtn.classList.toggle('open');
  mainNav.classList.toggle('open');
});
 
 
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
    `Last Modification: ${document.lastModified}`;

document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});


function displaySubmission() {
  const container = document.getElementById('submission-summary');
  if (!container) return;

  try {
    const raw = localStorage.getItem('ls_last_recommendation');
    if (!raw) {
      container.innerHTML = '<p>No submission data found.</p>';
      return;
    }
    const data = JSON.parse(raw);
    const date = new Date(data.submitted).toLocaleString('en-US', {
      dateStyle: 'long', timeStyle: 'short'
    });

    container.innerHTML = `
      <table>
        ${[
          ['Name',         data.name],
          ['Email',        data.email],
          ['Neighborhood', data.neighborhood],
          ['Restaurant',   data.restaurant],
          ['Dish',         data.dish],
          ['Rating',       '⭐'.repeat(parseInt(data.rating))],
          ['Comments',     data.comments || '—'],
          ['Submitted',    date],
        ].map(([label, value]) => `
          <tr>
            <td>${label}</td>
            <td>${value}</td>
          </tr>
        `).join('')}
      </table>
    `;
  } catch (err) {
    container.innerHTML = '<p>Could not read submission data.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displaySubmission();
});

