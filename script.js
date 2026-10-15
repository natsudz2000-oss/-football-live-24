const matches = [
 {league:"الدوري الإنجليزي", time:"20:00", status:"upcoming", label:"قادمة", home:"فريق تجريبي 1", away:"فريق تجريبي 2", h:"🔴", a:"🔵", score:"— : —"},
 {league:"الدوري الإسباني", time:"مباشر تجريبي", status:"live", label:"مباشر تجريبي", home:"فريق تجريبي 3", away:"فريق تجريبي 4", h:"⚪", a:"🟡", score:"1 : 0"},
 {league:"الدوري الإيطالي", time:"انتهت (مثال)", status:"finished", label:"منتهية تجريبية", home:"فريق تجريبي 5", away:"فريق تجريبي 6", h:"⚫", a:"🟣", score:"2 : 2"},
 {league:"دوري أبطال أوروبا", time:"21:45", status:"upcoming", label:"قادمة", home:"فريق تجريبي 7", away:"فريق تجريبي 8", h:"🟠", a:"🔵", score:"— : —"},
 {league:"الدوري الجزائري", time:"غداً", status:"upcoming", label:"قادمة", home:"فريق تجريبي 9", away:"فريق تجريبي 10", h:"🟢", a:"⚪", score:"— : —"},
 {league:"الدوري الألماني", time:"انتهت (مثال)", status:"finished", label:"منتهية تجريبية", home:"فريق تجريبي 11", away:"فريق تجريبي 12", h:"🔴", a:"⚫", score:"0 : 1"}
];
const list = document.getElementById("matchList");
let activeFilter = "all", showAll = false;
function renderMatches(){
  const filtered = matches.filter(m => activeFilter === "all" || m.status === activeFilter);
  const shown = showAll ? filtered : filtered.slice(0,4);
  list.innerHTML = shown.map(m => `<article class="match-card">
    <div class="match-meta"><span>${m.league}</span><span class="status ${m.status}">${m.label}</span></div>
    <div class="teams">
      <div class="team"><span class="crest">${m.h}</span><span>${m.home}</span></div>
      <div class="score">${m.score}<small>${m.time}</small></div>
      <div class="team"><span>${m.away}</span><span class="crest">${m.a}</span></div>
    </div>
  </article>`).join("");
  if (!shown.length) list.innerHTML = '<p class="table-note">ما كاين حتى مباراة في هذا التصنيف حالياً.</p>';
  document.getElementById("showMore").style.display = filtered.length > 4 ? "block" : "none";
  document.getElementById("showMore").textContent = showAll ? "عرض أقل" : "عرض المزيد";
}
document.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  btn.classList.add("active"); activeFilter = btn.dataset.filter; showAll = false; renderMatches();
}));
document.getElementById("showMore").addEventListener("click", () => {showAll = !showAll; renderMatches();});
document.getElementById("menuBtn").addEventListener("click", () => document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => document.getElementById("mainNav").classList.remove("open")));
const date = new Intl.DateTimeFormat("ar-DZ", {timeZone:"Africa/Algiers", weekday:"long", day:"numeric", month:"long"}).format(new Date());
document.getElementById("todayDate").textContent = date + " · توقيت الجزائر";
document.getElementById("year").textContent = new Date().getFullYear();
renderMatches();
