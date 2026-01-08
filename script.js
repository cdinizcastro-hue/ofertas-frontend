const container = document.getElementById("ofertas");
const filtroOrigem = document.getElementById("filtro-origem");
const filtroDestino = document.getElementById("filtro-destino");
const ordenacao = document.getElementById("ordenacao");

let ofertasGlobais = [];

// gera um tempo aleatório entre 10 e 60 minutos
function gerarExpiracao() {
  const agora = new Date().getTime();
  const minutos = Math.floor(Math.random() * 50) + 10;
  return agora + minutos * 60 * 1000;
}

fetch("https://ofertas-backend-3.onrender.com/ofertas")
  .then(res => res.json())
  .then(ofertas => {
    ofertasGlobais = ofertas.map(o => ({
      ...o,
      expiraEm: gerarExpiracao()
    }));
    aplicarTudo();
    setInterval(atualizarTimers, 1000);
  });

function badgeAleatoria() {
  const badges = ["🔥 Promoção Relâmpago", "💰 Melhor Preço", "⏰ Últimas Vagas"];
  return badges[Math.floor(Math.random() * badges.length)];
}

function aplicarTudo() {
  let lista = [...ofertasGlobais];

  const origem = filtroOrigem.value.toLowerCase();
  const destino = filtroDestino.value.toLowerCase();

  if (origem) lista = lista.filter(o => o.origem.toLowerCase().includes(origem));
  if (destino) lista = lista.filter(o => o.destino.toLowerCase().includes(destino));

  if (ordenacao.value === "preco") {
    lista.sort((a, b) => a.precoAtual - b.precoAtual);
  }

  if (ordenacao.value === "desconto") {
    lista.sort(
      (a, b) => (b.precoAntigo - b.precoAtual) - (a.precoAntigo - a.precoAtual)
    );
  }

  renderizar(lista);
}

function formatarTempo(ms) {
  if (ms <= 0) return "Encerrada";

  const totalSeg = Math.floor(ms / 1000);
  const min = Math.floor(totalSeg / 60);
  const seg = totalSeg % 60;

  return `${min}m ${seg < 10 ? "0" : ""}${seg}s`;
}

function renderizar(lista) {
  container.innerHTML = "";

  if (lista.length === 0) {
    container.innerHTML = "<p>Nenhuma oferta encontrada.</p>";
    return;
  }

  lista.forEach((oferta, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index;

    card.innerHTML = `
      <span class="badge">${badgeAleatoria()}</span>
      <h2>${oferta.origem} → ${oferta.destino}</h2>
      <p class="empresa">${oferta.empresa}</p>

      <div class="timer" id="timer-${index}">
        ⏳ Expira em ${formatarTempo(oferta.expiraEm - Date.now())}
      </div>

      <p class="preco-antigo">De R$ ${oferta.precoAntigo}</p>
      <p class="preco">Por R$ ${oferta.precoAtual}</p>
      <a href="${oferta.link}" target="_blank" class="btn">Ver oferta</a>
    `;

    container.appendChild(card);
  });
}

function atualizarTimers() {
  ofertasGlobais.forEach((oferta, index) => {
    const el = document.getElementById(`timer-${index}`);
    if (!el) return;

    const restante = oferta.expiraEm - Date.now();
    el.textContent = `⏳ Expira em ${formatarTempo(restante)}`;

    if (restante <= 0) {
      el.textContent = "❌ Oferta encerrada";
      el.style.color = "#ff8a8a";
    }
  });
}

filtroOrigem.addEventListener("input", aplicarTudo);
filtroDestino.addEventListener("input", aplicarTudo);
ordenacao.addEventListener("change", aplicarTudo);
