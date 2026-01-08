const container = document.getElementById("ofertas");
const filtroOrigem = document.getElementById("filtro-origem");
const filtroDestino = document.getElementById("filtro-destino");

let ofertasGlobais = [];

fetch("https://ofertas-backend-3.onrender.com/ofertas")
  .then(res => res.json())
  .then(ofertas => {
    ofertasGlobais = ofertas;
    renderizar(ofertasGlobais);
  });

function badgeAleatoria() {
  const badges = ["🔥 Promoção Relâmpago", "💰 Melhor Preço", "⏰ Últimas Vagas"];
  return badges[Math.floor(Math.random() * badges.length)];
}

function renderizar(lista) {
  container.innerHTML = "";

  if (lista.length === 0) {
    container.innerHTML = "<p>Nenhuma oferta encontrada.</p>";
    return;
  }

  lista.forEach(oferta => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <span class="badge">${badgeAleatoria()}</span>
      <h2>${oferta.origem} → ${oferta.destino}</h2>
      <p class="empresa">${oferta.empresa}</p>
      <p class="preco-antigo">De R$ ${oferta.precoAntigo}</p>
      <p class="preco">Por R$ ${oferta.precoAtual}</p>
      <a href="${oferta.link}" target="_blank" class="btn">Ver oferta</a>
    `;

    container.appendChild(card);
  });
}

function aplicarFiltro() {
  const origem = filtroOrigem.value.toLowerCase();
  const destino = filtroDestino.value.toLowerCase();

  const filtradas = ofertasGlobais.filter(o =>
    o.origem.toLowerCase().includes(origem) &&
    o.destino.toLowerCase().includes(destino)
  );

  renderizar(filtradas);
}

filtroOrigem.addEventListener("input", aplicarFiltro);
filtroDestino.addEventListener("input", aplicarFiltro);
