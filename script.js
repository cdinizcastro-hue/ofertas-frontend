const API_URL = "https://ofertas-backend-3.onrender.com/ofertas";

async function carregarOfertas() {
  const res = await fetch(API_URL);
  const ofertas = await res.json();

  const container = document.getElementById("ofertas");
  container.innerHTML = "";

  ofertas.forEach(o => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${o.origem} → ${o.destino}</h2>
      <div class="empresa">${o.empresa}</div>
      <div class="preco-antigo">De R$ ${o.precoAntigo}</div>
      <div class="preco-novo">Por R$ ${o.precoAtual}</div>
      <a href="${o.link}" target="_blank" class="btn-oferta">
        Ver oferta
      </a>
    `;

    // TRACKING DO CLIQUE
    card.querySelector(".btn-oferta").addEventListener("click", () => {
      // Meta Pixel
      if (typeof fbq === "function") {
        fbq("track", "Lead", {
          origem: o.origem,
          destino: o.destino,
          preco: o.precoAtual
        });
      }

      // Google Analytics (GA4)
      if (typeof gtag === "function") {
        gtag("event", "click_oferta", {
          origem: o.origem,
          destino: o.destino,
          value: o.precoAtual
        });
      }
    });

    container.appendChild(card);
  });
}

carregarOfertas();

