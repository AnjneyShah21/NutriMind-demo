// ══════════════════════════════════
//  HISTORY
// ══════════════════════════════════

function selectDay(el) {
  document.querySelectorAll('.day-pill').forEach(d => d.classList.remove('active'));
  el.classList.add('active');
  showToast('📅 Viewing ' + el.querySelector('.dp-day').textContent + ' ' + el.querySelector('.dp-num').textContent);
}

// ══════════════════════════════════
//  TOAST UTILITY
// ══════════════════════════════════

function showToast(msg, type) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast' + (type === 'green' ? ' green' : '');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transition = 'opacity 0.3s';
    setTimeout(() => t.remove(), 300);
  }, 2800);
}