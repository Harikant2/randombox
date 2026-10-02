(() => {
  const key = "randombox_items_v1";
  const defaults = window.DEFAULT_ITEMS || [];
  let items = JSON.parse(localStorage.getItem(key) || "null") || defaults;
  const $ = id => document.getElementById(id);
  const labels = {fun:"😂 Fun",brain:"🧠 Brain",facts:"🤯 Facts",challenge:"🎯 Challenge",knowledge:"📚 Knowledge",question:"💭 Question"};

  function save(){localStorage.setItem(key,JSON.stringify(items));render();}
  function render(){
    $("count").textContent = `${items.length} items`;
    const box = $("items");
    if(!items.length){box.innerHTML='<div class="empty">अभी कोई item नहीं है।</div>';return;}
    box.innerHTML = items.map(x=>`
      <div class="item">
        <div class="e">${escapeHtml(x.emoji)}</div>
        <div><h3>${escapeHtml(x.title)}</h3><p>${labels[x.category]||x.category} · ${escapeHtml(x.text)}</p></div>
        <button class="delete" data-id="${x.id}">Delete</button>
      </div>`).join("");
    box.querySelectorAll(".delete").forEach(b=>b.addEventListener("click",()=>{
      items=items.filter(x=>x.id!==b.dataset.id);save();
    }));
  }
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
  $("itemForm").addEventListener("submit",e=>{
    e.preventDefault();
    items.unshift({
      id: Date.now().toString(),
      category:$("category").value, emoji:$("emoji").value.trim(),
      title:$("title").value.trim(), text:$("text").value.trim()
    });
    save(); e.target.reset(); $("emoji").value="🎲";
  });
  $("resetBtn").addEventListener("click",()=>{
    if(confirm("Demo data वापस लाएँ? आपके इस browser के custom items हटेंगे.")){
      items=defaults;save();
    }
  });
  render();
})();
