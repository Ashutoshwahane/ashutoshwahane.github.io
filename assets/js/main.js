'use strict';
const power = document.querySelector('#power');
const screen = document.querySelector('#screen');
const content = document.querySelector('#screen-content');
const led = document.querySelector('#led');
const sections = [
  { title: 'DEVELOPER', icon: '⌘', text: 'Mobile apps, useful tools & motion experiments. Take a look at my project archive.', link: 'https://github.com/Ashutoshwahane', label: 'VIEW GITHUB ↗' },
  { title: 'DANCE & CREATIVE', icon: '✳', text: 'Code is one way I create. Movement is another. Find a little more of my world.', link: 'https://www.instagram.com/ashutoshwahane/', label: 'INSTAGRAM ↗' },
  { title: 'BUILDING NEXT', icon: '↗', text: 'Exploring what it takes to build a startup of my own. The next chapter is taking shape.', link: 'mailto:ashutosh.wahane10@gmail.com', label: 'EXCHANGE AN IDEA ↗' },
  { title: 'ABOUT / CONTACT', icon: '☺', text: 'Hey, I’m Ashutosh. Developer, dancer & creative. Curious about what comes next.', link: 'mailto:ashutosh.wahane10@gmail.com', label: 'SAY HELLO ↗' }
];
let on = false, view = 'off', selected = 0, bootTimer;
function render() {
  power.setAttribute('aria-pressed', String(on));
  power.setAttribute('aria-label', on ? 'Power off portfolio' : 'Power on portfolio');
  screen.classList.toggle('powered', on);
  led.classList.toggle('on', on);
  screen.classList.toggle('booting', view === 'boot');
  if (!on) { content.innerHTML = ''; return; }
  if (view === 'boot') {
    content.innerHTML = '<div class="boot"><div class="boot-mark">AW.</div><div class="pixel-line">POCKET PORTFOLIO</div><span class="blink">PRESS START</span></div>';
  } else if (view === 'menu') {
    content.innerHTML = '<div class="lcd-heading">ASHUTOSH’S WORLD</div><div class="lcd-greeting">CHOOSE YOUR NEXT DIRECTION</div>' + sections.map((item, i) => `<button class="menu-item ${i === selected ? 'selected' : ''}" data-item="${i}" aria-label="Open ${item.title}" ${i === selected ? 'aria-current="true"' : ''}>${i === selected ? '▶' : '·'} ${item.title}</button>`).join('') + '<div class="lcd-status"><span>↑↓ SELECT · A OPEN</span><span>01 / 01</span></div>';
  } else {
    const item = sections[selected];
    const details = [
      '<p>I build mobile apps and explore ways to make software feel useful and expressive.</p><div class="detail-links"><a href="https://github.com/Ashutoshwahane/Animator">Animator — Compose animations ↗</a><a href="https://github.com/CyberNerd404/StickyNotes-App">Sticky Notes — offline notes ↗</a></div>',
      '<p>Dance and creative work are part of who I am, alongside development. This is my space for movement and ideas beyond the code.</p><div class="insta-profile"><span>INSTAGRAM</span><strong>@ashutoshwahane</strong><a href="https://www.instagram.com/ashutoshwahane/" target="_blank" rel="noopener noreferrer">Visit my Instagram profile ↗</a></div>',
      '<p>I’m exploring building a startup of my own: turning ideas into something useful, one experiment at a time.</p><p>Have an idea or want to compare notes? Get in touch.</p>',
      '<p>Developer, dancer, and creative. I’m curious about software, movement, and what to build next.</p><div class="detail-links"><a href="mailto:ashutosh.wahane10@gmail.com">Email me ↗</a><a href="https://www.linkedin.com/in/ashutoshwahane/">Connect on LinkedIn ↗</a><a href="https://github.com/Ashutoshwahane">Find me on GitHub ↗</a></div>'
    ];
    content.innerHTML = `<div class="lcd-detail"><div class="lcd-heading">${item.title}</div><div class="detail-icon" aria-hidden="true">${item.icon}</div>${details[selected]}${selected === 1 ? '' : `<a class="detail-primary" href="${item.link}">${item.label}</a>`}<div class="lcd-back">B / ESC · BACK TO MENU</div></div>`;
  }
}
function turnOn() { on = true; view = 'boot'; render(); clearTimeout(bootTimer); bootTimer = setTimeout(() => { if (on && view === 'boot') { view = 'menu'; render(); } }, 1800); }
function openSelected() { if (!on) { turnOn(); return; } view = view === 'boot' ? 'menu' : 'detail'; render(); }
function goBack() { if (!on) return; view = 'menu'; render(); }
function move(delta) { if (!on) { turnOn(); return; } view = 'menu'; selected = (selected + delta + sections.length) % sections.length; render(); }
power.addEventListener('click', () => { clearTimeout(bootTimer); if (on) { on = false; view = 'off'; render(); } else turnOn(); });
document.querySelectorAll('[data-move]').forEach(button => button.addEventListener('click', () => move(Number(button.dataset.move))));
document.querySelector('#open').addEventListener('click', openSelected);
document.querySelector('#start').addEventListener('click', () => { if (!on) turnOn(); else { view = 'menu'; render(); } });
document.querySelector('#back').addEventListener('click', goBack);
document.querySelector('#select').addEventListener('click', () => move(1));
content.addEventListener('click', event => { const button = event.target.closest('[data-item]'); if (button) { selected = Number(button.dataset.item); view = 'detail'; render(); } });
// Keyboard shortcuts belong to the handheld; ordinary page links keep native behavior.
document.querySelector('.console').addEventListener('keydown', event => {
  if (event.target.closest('a')) return;
  if (['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Escape'].includes(event.key) || (event.target === screen && event.key === 'Enter')) {
    event.preventDefault();
    if (event.key === 'Escape') goBack();
    else if (event.key === 'Enter') openSelected();
    else move(['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1);
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
render();
