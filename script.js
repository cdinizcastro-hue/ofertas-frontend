const API_URL = "https://ofertas-backend-3.onrender.com/ofertas";

async function carregarOfertas() {
  const res = await fetch(API_URL);
  const ofertas = await res.json();

  const container = document.getElementById("ofertas");
  container.innerHTML = "";

  ofertas.forEach(o => {
    const msg = `
Olá! Tenho interesse na oferta:
${o.origem} → ${o.destino}
Por R$ ${o.precoAtual}
    `.trim();

    const linkWhats = `https://wa.me/5531996988232?text=${encodeURIComponent(msg)}`;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${o.origem} → ${o.destino}</h2>
      <div class="empresa">${o.empresa}</div>
      <div class="preco-antigo">De R$ ${o.precoAntigo}</div>
      <div class="preco-novo">Por R$ ${o.precoAtual}</div>
      <a href="${linkWhats}" target="_blank">Falar no WhatsApp</a>
    `;

    container.appendChild(card);
  });
}

/* POPUP */
setTimeout(() => {
  if (!localStorage.getItem("popupFechado")) {
    document.getElementById("popup").style.display = "flex";
  }
}, 4000);

function fecharPopup() {
  document.getElementById("popup").style.display = "none";
  localStorage.setItem("popupFechado", "true");
}

carregarOfertas();
