const API_URL = "https://ofertas-backend-3.onrender.com/ofertas";
const WHATSAPP_NUMBER = "5531996988232"; // <-- TROQUE PELO SEU

let ofertas = [];
let ofertaSelecionada = null;

async function carregarOfertas() {
  const res = await fetch(API_URL);
  ofertas = await res.json();
  renderizar(ofertas);
}

function renderizar(lista) {
  const container = document.getElementById("ofertas");
  container.innerHTML = "";

  lista.forEach(o => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${o.origem} → ${o.destino}</h2>
      <div class="empresa">${o.empresa}</div>
      <div class="preco-antigo">De R$ ${o.precoAntigo}</div>
      <div class="preco-novo">Por R$ ${o.precoAtual}</div>
      <a href="${o.link}" target="_blank">Ver oferta</a>
    `;

    card.addEventListener("click", () => {
      ofertaSelecionada = o;
      atualizarWhatsApp();
    });

    container.appendChild(card);
  });
}

/* FILTROS */
document.getElementById("origem").addEventListener("input", filtrar);
document.getElementById("destino").addEventListener("input", filtrar);
document.getElementById("ordenar").addEventListener("change", filtrar);

function filtrar() {
  let resultado = [...ofertas];

  const origem = document.getElementById("origem").value.toLowerCase();
  const destino = document.getElementById("destino").value.toLowerCase();
  const ordenar = document.getElementById("ordenar").value;

  if (origem) {
    resultado = resultado.filter(o =>
      o.origem.toLowerCase().includes(origem)
    );
  }

  if (destino) {
    resultado = resultado.filter(o =>
      o.destino.toLowerCase().includes(destino)
    );
  }

  if (ordenar === "menor") {
    resultado.sort((a, b) => a.precoAtual - b.precoAtual);
  }

  if (ordenar === "maior") {
    resultado.sort((a, b) => b.precoAtual - a.precoAtual);
  }

  renderizar(resultado);
}

/* WHATSAPP DINÂMICO */
function atualizarWhatsApp() {
  if (!ofertaSelecionada) return;

  const msg = `
Olá! Tenho interesse na oferta:
${ofertaSelecionada.origem} → ${ofertaSelecionada.destino}
Por R$ ${ofertaSelecionada.precoAtual}
Pode me ajudar?
  `.trim();

  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  document.getElementById("whatsappBtn").href = link;
}

carregarOfertas();

/* POPUP WHATSAPP */
setTimeout(() => {
  const popup = document.getElementById("popup");
  if (popup && !localStorage.getItem("popupFechado")) {
    popup.style.display = "flex";
  }
}, 5000);

function fecharPopup() {
  document.getElementById("popup").style.display = "none";
  localStorage.setItem("popupFechado", "true");
}


