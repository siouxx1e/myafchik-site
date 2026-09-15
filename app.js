'use strict';
const photoButtons = [...document.querySelectorAll('.photo-button')];
const modal = document.querySelector('.lightbox');
const fullPhoto = document.querySelector('#full-photo');
let currentPhoto = 0;
function displayPhoto(index) {
  currentPhoto = (index + photoButtons.length) % photoButtons.length;
  const trigger = photoButtons[currentPhoto];
  const source = trigger.querySelector('img');
  fullPhoto.src = source.src;
  fullPhoto.alt = source.alt;
  document.querySelector('#photo-caption').textContent = trigger.parentElement.querySelector('figcaption').textContent.replace(/^\d+/, '').trim();
  document.querySelector('#photo-count').textContent = `${currentPhoto + 1} / ${photoButtons.length}`;
}
photoButtons.forEach((button, index) => button.addEventListener('click', () => {
  displayPhoto(index); modal.showModal(); document.body.classList.add('modal-open');
}));
document.querySelector('#close-photo').addEventListener('click', () => modal.close());
document.querySelector('#previous-photo').addEventListener('click', () => displayPhoto(currentPhoto - 1));
document.querySelector('#next-photo').addEventListener('click', () => displayPhoto(currentPhoto + 1));
modal.addEventListener('close', () => document.body.classList.remove('modal-open'));
modal.addEventListener('click', (event) => { if (event.target === modal) { const r = modal.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) modal.close(); } });
modal.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') { event.preventDefault(); displayPhoto(currentPhoto + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); displayPhoto(currentPhoto - 1); }
});
