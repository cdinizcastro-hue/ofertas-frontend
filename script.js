let todasOfertas = [];
let ofertasFiltradas = [];

fetch('http://localhost:3000/ofertas')
  .then(res => res.json())
  .then(dados => {
    todasOfertas = dados;
    ofertasFiltradas = dados;
    mostrarOfertas(dados);
  });

function mostrarOfertas(lista) {
  const div = document.getElementById('ofertas');
  div.innerHTML = '';

  lista.forEach(oferta => {
    div.innerHTML += `
      <div class="card">
        <h2>${oferta.origem} → ${oferta.destino}</h2>
        <p class="preco-antigo">De R$ ${oferta.precoOriginal}</p>
        <p class="preco-novo">Por R$ ${oferta.precoAtual}</p>
        <a href="${oferta.link}" target="_blank">Comprar</a>
      </div>
    `;
  });
}

// FILTRO POR ORIGEM
document.getElementById('filtro').addEventListener('change', (e) => {
  const origem = e.target.value;

  if (!origem) {
    ofertasFiltradas = [...todasOfertas];
  } else {
    ofertasFiltradas = todasOfertas.filter(o => o.origem === origem);
  }

  aplicarOrdenacao();
});

// ORDENAÇÃO POR PREÇO
document.getElementById('ordenacao').addEventListener('change', () => {
  aplicarOrdenacao();
});

function aplicarOrdenacao() {
  const tipo = document.getElementById('ordenacao').value;
  let lista = [...ofertasFiltradas];

  if (tipo === 'menor') {
    lista.sort((a, b) => a.precoAtual - b.precoAtual);
  } else if (tipo === 'maior') {
    lista.sort((a, b) => b.precoAtual - a.precoAtual);
  }

  mostrarOfertas(lista);
}

