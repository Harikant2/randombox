(() => {
  const key = "randombox_items_v1";
  const defaults = window.DEFAULT_ITEMS || [];
  let items = JSON.parse(localStorage.getItem(key) || "null") || defaults;
  if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(items));
  const labels = {surprise:"SURPRISE",fun:"FUN",brain:"BRAIN",facts:"WEIRD FACT",challenge:"CHALLENGE",knowledge:"KNOWLEDGE",question:"QUESTION"};
  let current = null;

  const $ = id => document.getElementById(id);
  function pick(cat="surprise"){
    const pool = cat === "surprise" ? items : items.filter(x => x.category === cat);
    if (!pool.length) return null;
    let next = pool[Math.floor(Math.random()*pool.length)];
    if (pool.length > 1 && current) {
      while(next.id === current.id) next = pool[Math.floor(Math.random()*pool.length)];
    }
    return next;
  }
  function show(cat="surprise"){
    const item = pick(cat);
    if (!item) {
      $("resultType").textContent = labels[cat] || "RANDOM";
      $("resultEmoji").textContent = "😅";
      $("resultTitle").textContent = "इस category में अभी कुछ नहीं है";
      $("resultText").textContent = "Admin में जाकर नया item जोड़ें।";
      return;
    }
    current = item;
    $("resultType").textContent = labels[item.category] || item.category.toUpperCase();
    $("resultEmoji").textContent = item.emoji;
    $("resultTitle").textContent = item.title;
    $("resultText").textContent = item.text;
  }
  $("randomBtn").addEventListener("click",()=>show("surprise"));
  document.querySelectorAll("[data-cat]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.cat)));
  $("copyBtn").addEventListener("click",async()=>{
    if(!current) return;
    const value = `${current.emoji} ${current.title}\n${current.text}\n— RandomBox`;
    try{await navigator.clipboard.writeText(value);$("copyBtn").textContent="✅ Copied";setTimeout(()=>$("copyBtn").textContent="📋 Copy",1200)}
    catch{alert("Copy नहीं हो पाया।")}
  });
  $("year").textContent = new Date().getFullYear();
  show("surprise");
})();
