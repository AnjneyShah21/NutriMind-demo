// ══════════════════════════════════
//  TAB NAVIGATION
// ══════════════════════════════════

function showTab(tabName, navEl) {
  // Close meal detail if open
  document.getElementById('main-topbar').style.display = 'flex';
  document.getElementById('meal-topbar').style.display = 'none';

  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById('tab-' + tabName).classList.add('active');
  if (navEl) navEl.classList.add('active');
}