// ══════════════════════════════════
//  MEAL DETAIL
// ══════════════════════════════════

const mealData = {
  salmon:    { name: 'Zesty Salmon & Quinoa Superbowl',  emoji: '🍣', bg: 'linear-gradient(135deg,#fff3e0,#ffe0b2)' },
  avocado:   { name: 'Avocado & Egg Power Bowl',         emoji: '🥑', bg: 'linear-gradient(135deg,#e8f5e9,#c8e6c9)' },
  chickpea:  { name: 'Tuscan Chickpea Salad',            emoji: '🥗', bg: 'linear-gradient(135deg,#e3f2fd,#bbdefb)' },
  bean:      { name: 'Slow-Cooker Bean Medley',          emoji: '🫘', bg: 'linear-gradient(135deg,#fce4ec,#f8bbd0)' },
  breakfast: { name: 'Balanced Breakfast Bowl',          emoji: '🥣', bg: 'linear-gradient(135deg,#f3e5f5,#e1bee7)' },
  lunch:     { name: 'Post-Workout Lunch',               emoji: '🥙', bg: 'linear-gradient(135deg,#e0f2f1,#b2dfdb)' },
  dinner:    { name: 'Recovery Dinner',                  emoji: '🍽️', bg: 'linear-gradient(135deg,#ede7f6,#d1c4e9)' },
};

function openMealDetail(mealKey) {
  const meal = mealData[mealKey] || mealData.salmon;
  document.getElementById('meal-detail-name').textContent = meal.name;

  const hero = document.getElementById('meal-hero-emoji');
  hero.textContent = '';
  hero.style.background = meal.bg;
  hero.style.fontSize = '80px';
  hero.textContent = meal.emoji;

  // Reset state
  state.mealLogged = false;
  state.favSaved = false;
  document.getElementById('main-log-btn').textContent = '📊 Log this Meal';
  document.getElementById('main-log-btn').classList.remove('logged');
  document.getElementById('fav-btn').textContent = '🤍 Save to Favorites';
  document.getElementById('fav-btn').classList.remove('saved');

  // Reset servings
  state.servings = 2;
  document.getElementById('serving-count').textContent = 2;
  renderIngredients();

  // Show meal tab
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('tab-meal').classList.add('active');
  document.getElementById('main-topbar').style.display = 'none';
  document.getElementById('meal-topbar').style.display = 'flex';
}

function closeMealDetail() {
  document.getElementById('main-topbar').style.display = 'flex';
  document.getElementById('meal-topbar').style.display = 'none';
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-dashboard').classList.add('active');
  document.getElementById('nav-dashboard').classList.add('active');
}

// ── SERVINGS ──
function adjustServings(delta) {
  state.servings = Math.max(1, Math.min(10, state.servings + delta));
  document.getElementById('serving-count').textContent = state.servings;
  renderIngredients();
}

function renderIngredients() {
  const list = document.getElementById('ingredient-list');
  list.innerHTML = state.baseIngredients.map(ing => {
    let amt = ing.perServing ? (ing.base * state.servings) : ing.base;
    let amtStr = Number.isInteger(amt) ? amt : amt.toFixed(1);
    return `<li><span class="ing-name">${ing.name}</span><span class="ing-amt">${amtStr} ${ing.unit}</span></li>`;
  }).join('');
}

// ── LOG / FAV ──
function logMeal(btn) {
  btn.classList.add('logged');
  btn.textContent = '✓ Logged';
  showToast('✅ Meal logged! +8 pts earned', 'green');
}

function logThisMeal() {
  const btn = document.getElementById('main-log-btn');
  if (state.mealLogged) return;
  state.mealLogged = true;
  btn.textContent = '✅ Meal Logged!';
  btn.classList.add('logged');

  // Update daily goal bar
  const newPct = Math.min(100, 82 + 28);
  document.getElementById('daily-goal-pct').textContent = newPct + '%';
  document.getElementById('daily-goal-bar').style.width = newPct + '%';
  document.getElementById('daily-goal-nums').textContent = '2,300 / 2,250 kcal';

  showToast('🎯 Meal logged! Daily goal 110% achieved!', 'green');
}

function toggleFav() {
  state.favSaved = !state.favSaved;
  const btn = document.getElementById('fav-btn');
  btn.textContent = state.favSaved ? '❤️ Saved to Favorites' : '🤍 Save to Favorites';
  if (state.favSaved) { btn.classList.add('saved'); showToast('❤️ Added to favorites!'); }
  else { btn.classList.remove('saved'); }
}

function toggleHeart(el) {
  el.textContent = el.textContent === '🤍' ? '❤️' : '🤍';
  if (el.textContent === '❤️') showToast('❤️ Saved to favorites!');
}
