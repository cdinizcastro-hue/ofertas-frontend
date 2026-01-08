
const API_URL = "https://ofertas-backend-3.onrender.com/ofertas";

async function carregarOfertas() {
  const res = await fetch(API_URL);
  const ofertas = await res.json();

  const container = document.getElementById("ofertas");
  container.innerHTML = "";

  ofertas.forEach((o, i) => {
    const imagem = `https://picsum.photos/600/400?random=${i + 1}`;

    const desconto = Math.round(
      ((o.precoAntigo - o.precoAtual) / o.precoAntigo) * 100
    );

    const card = document.createElement("div");
    card.className = i === 0 ? "card destaque" : "card";

    card.innerHTML = `
      <div class="imagem-destino">
        ${i === 0 ? `<span class="badge-dia">OFERTA DO DIA</span>` : ""}
        <span class="badge-desconto">${desconto}% OFF</span>

        <div class="overlay-destino">
          <span>${o.destino}</span>
        </div>

        <img src="${imagem}" alt="${o.destino}">
      </div>

      <div class="conteudo-card">
        <h2>${o.origem} → ${o.destino}</h2>
        <div class="empresa">${o.empresa}</div>

        <div class="preco-antigo">De R$ ${o.precoAntigo}</div>
        <div class="preco-novo">Por R$ ${o.precoAtual}</div>

        <a href="${o.link}" target="_blank" class="btn-oferta">
          Ver oferta
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

carregarOfertas();
