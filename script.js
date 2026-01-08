const API_URL = "https://ofertas-backend-3.onrender.com/ofertas";

async function carregarOfertas() {
  const res = await fetch(API_URL);
  const ofertas = await res.json();

  const container = document.getElementById("ofertas");
  container.innerHTML = "";

  ofertas.forEach(o => {
    const imagemDestino = `https://source.unsplash.com/featured/?${encodeURIComponent(o.destino)}`;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="imagem-destino" style="background-image: url('${imagemDestino}')"></div>

      <div class="conteudo-card">
        <h2>${o.origem} → ${o.destino}</h2>
        <div class="empresa">${o.empresa}</div>

        <div class="precos">
          <div class="preco-antigo">De R$ ${o.precoAntigo}</div>
          <div class="preco-novo">Por R$ ${o.precoAtual}</div>
        </div>

        <a href="${o.link}" target="_blank" class="btn-oferta">
          Ver oferta
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

carregarOfertas();

