// ══════════════════════════════════
//  ONBOARDING
// ══════════════════════════════════

function selectGoal(btn) {
  document.querySelectorAll('.goal-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.goal = btn.dataset.goal;
}

function selectToggle(btn, group) {
  btn.closest('.toggle-group').querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.budget = btn.textContent;
}

function goToDashboard() {
  const age = document.getElementById('inp-age').value;
  const weight = document.getElementById('inp-weight').value;

  // Update profile
  if (weight) {
    document.getElementById('pm-weight').textContent = weight;
    document.getElementById('profile-weight').textContent = weight;
  }

  const goalMap = { 'Weight Loss': 'WL', 'Muscle Gain': 'MG', 'Maintenance': 'MT' };
  document.getElementById('profile-goal-stat').textContent = goalMap[state.goal] || 'WL';

  document.getElementById('screen-onboard').classList.remove('active');
  document.getElementById('screen-app').classList.add('active');

  // Set greeting
  const hour = new Date().getHours();
  const tod = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
  document.getElementById('greeting-text').textContent = tod + ', Alexander 👋';

  showToast('✅ Profile saved! Welcome to NutriMind.', 'green');
}