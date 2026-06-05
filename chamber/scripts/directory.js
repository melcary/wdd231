const navbuttom = document.querySelector('#ham-btn');
const navBar = document.querySelector('#main-nav');

navbuttom.addEventListener('click', () => {
    navbuttom.classList.toggle('open');
    navBar.classList.toggle('open');
});
const navLinks = document.querySelectorAll('nav ul li a');

document.querySelectorAll('nav ul li a').forEach(link => {
  if (link.href === window.location.href) link.classList.add('active');
});
 

const container = document.getElementById('members-container');
const btnGrid   = document.getElementById('btn-grid');
const btnList   = document.getElementById('btn-list');

let currentView = localStorage.getItem('directoryView') || 'grid';
 
function setView(view) {
  currentView = view;
  localStorage.setItem('directoryView', view);
 
  if (view === 'grid') {
    container.classList.remove('list-view');
    container.classList.add('grid-view');
    btnGrid.classList.add('active');
    btnList.classList.remove('active');
  } else {
    container.classList.remove('grid-view');
    container.classList.add('list-view');
    btnGrid.classList.remove('active');
    btnList.classList.add('active');
  }
}
 
btnGrid.addEventListener('click', () => setView('grid'));
btnList.addEventListener('click', () => setView('list'));


function getBadge(level) {
  if (level === 3) return `<span class="badge badge-gold">⭐ Gold</span>`;
  if (level === 2) return `<span class="badge badge-silver">🥈 Silver</span>`;
  return `<span class="badge badge-member">Member</span>`;
}
function createCard(m, index) {
  const loadAttr = index < 3 ? 'eager' : 'lazy';
  const imgContent = `<img src="images/${m.image}" alt="${m.name} logo" loading="${loadAttr}" width="200" height="150">`;
 
  return `
    <article class="member-card">
      <div class="card-img-wrap">${imgContent}</div>
      <div class="card-body">
        <div class="card-header-row">
          <h2 class="card-name">${m.name}</h2>
          ${getBadge(m.membershipLevel)}
        </div>
        <p class="card-tagline">${m.tagline || ''}</p>
        <div class="card-info">
        <div class="card-info-row"><span>${m.address}</span></div>
        <div class="card-info-row"><span>${m.phone}</span></div>
        <div class="card-info-row">
        <a href="${m.website}" target="_blank" rel="noopener">
            ${m.website.replace(/^https?:\/\//, '')} </a>        
            </div>
         </div>
    </article>`;
}

function createListItem(m) {
    return `
    <div class="member-list-item">
      <div class="list-name">${m.name} ${getBadge(m.membershipLevel)}</div>
      <div class="list-details">
        <span class="list-address">${m.address}</span>
        <span class="list-phone">${m.phone}</span>
        <span class="list-url"><a href="${m.website}" target="_blank" rel="noopener">${m.website.replace(/^https?:\/\//, '')}</a></span>
      </div>
    </div>`;
}

function renderMembers(members) {
  const html = currentView === 'grid'
    ? members.map((m, i) => createCard(m, i)).join('')
    : members.map(createListItem).join('');
  container.innerHTML = html;
}
async function loadMembers() {
  container.innerHTML = `
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading member directory…</p>
    </div>`;
 
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const members = await res.json();
 
    setView(currentView);
    renderMembers(members);
 
    btnGrid.addEventListener('click', () => renderMembers(members));
    btnList.addEventListener('click', () => renderMembers(members));
 
  } catch (err) {
    container.innerHTML = `
      <div class="loading-state">
        <p style="color:#c0392b;">⚠️ Could not load the directory. Make sure members.json is available.</p>
        <p style="font-size:0.8rem;margin-top:0.5rem;color:#888">${err.message}</p>
      </div>`;
  }
}

     document.getElementById('currentyear').textContent = new Date().getFullYear();
      document.getElementById('lastModified').textContent =
    `Last Modification: ${document.lastModified}`;


setView(currentView);
loadMembers();
 