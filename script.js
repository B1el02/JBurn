function lerDadosSalvos() {
  try {
    return JSON.parse(localStorage.getItem("jsBurnRate_pessoal")) || null;
  } catch (err) {
    console.error("Erro ao ler dados do localStorage:", err);
    return null;
  }
}

function salvarDadosPessoais(dados) {
  localStorage.setItem("jsBurnRate_pessoal", JSON.stringify(dados));
  renderDashboard(dados);
}

function fecharModais() {
  document.getElementById("modal-atualizar").style.display = "none";
  document.getElementById("modal-despesa").style.display = "none";
  const selectAcoes = document.getElementById("acoesRapidas");
  if (selectAcoes) selectAcoes.value = "";
  // also close gerenciamento panel if open
  const ger = document.getElementById("tela-gerenciamento");
  if (ger) ger.style.display = "none";
  const nav = document.getElementById("nav-select");
  if (nav) nav.value = "dashboard";
}

function abrirModalAtualizar() {
  const dados = lerDadosSalvos() || {
    entradas: { salario: 0 },
    saidas: { custosFixos: 0 },
  };
  document.getElementById("input-salario-base").value =
    dados.entradas?.salario ?? 0;
  document.getElementById("input-custos-base").value =
    dados.saidas?.custosFixos ?? 0;
  document.getElementById("modal-atualizar").style.display = "flex";
}

function abrirModalDespesa() {
  document.getElementById("input-nome-despesa").value = "";
  document.getElementById("input-valor-despesa").value = "";
  document.getElementById("modal-despesa").style.display = "flex";
}

function dispararAcao() {
  const select = document.getElementById("acoesRapidas");
  if (!select) return;

  if (select.value === "atualizar") {
    abrirModalAtualizar();
  } else if (select.value === "despesa-extra") {
    abrirModalDespesa();
  }

  select.value = "";
}

function salvarAtualizacaoBase() {
  const dados = lerDadosSalvos();
  if (!dados) return;

  dados.entradas = dados.entradas || {};
  dados.saidas = dados.saidas || {};
  dados.entradas.salario =
    Number(document.getElementById("input-salario-base").value) || 0;
  dados.saidas.custosFixos =
    Number(document.getElementById("input-custos-base").value) || 0;

  salvarDadosPessoais(dados);
  fecharModais();
}

function adicionarDespesaExtra() {
  const dados = lerDadosSalvos();
  if (!dados) return;

  const nome =
    document.getElementById("input-nome-despesa").value.trim() ||
    "Despesa extra";
  const valor =
    Number(document.getElementById("input-valor-despesa").value) || 0;

  if (valor <= 0) return;

  dados.saidas = dados.saidas || {};
  dados.saidas.parcelasEDividas =
    Number(dados.saidas.parcelasEDividas || 0) + valor;
  dados.despesasExtras = dados.despesasExtras || [];
  dados.despesasExtras.push({
    nome,
    valor,
    data: new Date().toLocaleString("pt-BR"),
  });

  salvarDadosPessoais(dados);
  fecharModais();
}

// Gerenciamento: salvar JSON editado pelo usuário
function salvarGerenciamento() {
  const text = document.getElementById("gerenciamento-json").value;
  try {
    const obj = JSON.parse(text);
    // basic shape validation
    const modelo = {
      disponivel: {
        contaCorrente: 0,
        guardadoPoupanca: 0,
        historicoSaldos: [0, 0],
      },
      entradas: { salario: 0, rendaExtra: 0, outros: 0 },
      saidas: {
        custosFixos: 0,
        assinaturas: 0,
        cartaoELazer: 0,
        parcelasEDividas: 0,
      },
      objetivo: { nome: "", valorTotal: 0, prazoMeses: 0 },
    };
    // Ensure keys exist
    for (const k of Object.keys(modelo)) {
      if (!obj[k]) obj[k] = modelo[k];
    }
    salvarDadosPessoais(obj);
    alert("Dados salvos com sucesso.");
    // close gerenciamento
    const ger = document.getElementById("tela-gerenciamento");
    if (ger) ger.style.display = "none";
    const nav = document.getElementById("nav-select");
    if (nav) nav.value = "dashboard";
  } catch (err) {
    alert("JSON inválido: " + err.message);
  }
}

// Renderiza o histórico de despesasExtras
function renderHistorico() {
  const dados = lerDadosSalvos() || {};
  const lista = document.getElementById("historico-list");
  if (!lista) return;
  lista.innerHTML = "";
  const items = dados.despesasExtras || [];
  if (!items.length) {
    const li = document.createElement("li");
    li.innerText = "Nenhuma despesa extra registrada.";
    lista.appendChild(li);
    return;
  }
  items
    .slice()
    .reverse()
    .forEach((it) => {
      const li = document.createElement("li");
      li.style.padding = "8px 0";
      li.style.borderBottom = "1px solid rgba(255,255,255,0.03)";
      li.innerHTML = `<strong>${it.nome}</strong> — R$ ${Number(it.valor).toFixed(2)} <div style="color:var(--muted);font-size:0.85rem">${it.data || ""}</div>`;
      lista.appendChild(li);
    });
}

// Navegação entre os passos do formulário
function proximoPasso(passo) {
  document
    .querySelectorAll(".passo-formulario")
    .forEach((div) => (div.style.display = "none"));
  document.getElementById(`passo-${passo}`).style.display = "block";
}

function passoAnterior(passo) {
  document
    .querySelectorAll(".passo-formulario")
    .forEach((div) => (div.style.display = "none"));
  document.getElementById(`passo-${passo}`).style.display = "block";
}

// Coleta e persistência dos dados do usuário
function finalizarSetup() {
  const dadosPessoais = {
    disponivel: {
      contaCorrente: Number(document.getElementById("saldoAtual").value) || 0,
      guardadoPoupanca:
        Number(document.getElementById("capitalGiro").value) || 0,
      historicoSaldos: [
        Number(document.getElementById("hist1").value) || 0,
        Number(document.getElementById("hist2").value) || 0,
      ],
    },
    entradas: {
      salario: Number(document.getElementById("mrr").value) || 0,
      rendaExtra: Number(document.getElementById("receitaPontual").value) || 0,
      outros: Number(document.getElementById("aportes").value) || 0,
    },
    saidas: {
      custosFixos: Number(document.getElementById("payroll").value) || 0,
      assinaturas: Number(document.getElementById("saas").value) || 0,
      cartaoELazer: Number(document.getElementById("marketing").value) || 0,
      parcelasEDividas: Number(document.getElementById("impostos").value) || 0,
    },
    objetivo: {
      nome: document.getElementById("nomeMeta").value || "Meta Pessoal",
      valorTotal: Number(document.getElementById("precoAlvoMeta").value) || 0,
      prazoMeses: Number(document.getElementById("prazoMeta").value) || 0,
    },
  };

  localStorage.setItem("jsBurnRate_pessoal", JSON.stringify(dadosPessoais));
  ativarPainelVisual();
  renderDashboard(dadosPessoais);
}

// Exibe o painel após o cadastro
function ativarPainelVisual() {
  document.getElementById("tela-coleta").style.display = "none";
  document.getElementById("tela-dashboard").style.display = "block";
  document.getElementById("corpo").classList.add("app-ativo");
}

// Renderiza os cards e métricas do dashboard
function renderDashboard(dados) {
  try {
    const d = dados || JSON.parse(localStorage.getItem("jsBurnRate_pessoal"));
    if (!d) return;

    // Disponível
    const disponivel = d.disponivel || {
      contaCorrente: 0,
      guardadoPoupanca: 0,
      historicoSaldos: [0, 0],
    };
    const totalDisponivel =
      Number(disponivel.contaCorrente || 0) +
      Number(disponivel.guardadoPoupanca || 0);
    const disponivelList = document.getElementById("disponivel-list");
    disponivelList.innerHTML = "";
    const itensDisp = {
      "Conta Corrente": disponivel.contaCorrente,
      "Guardado / Poupança": disponivel.guardadoPoupanca,
      "Histórico (últimos saldos)": (disponivel.historicoSaldos || []).join(
        ", ",
      ),
    };
    for (const k in itensDisp) {
      const li = document.createElement("li");
      li.innerText = `${k}: ${itensDisp[k]}`;
      disponivelList.appendChild(li);
    }

    // Entradas e Saídas
    const entradas = d.entradas || { salario: 0, rendaExtra: 0, outros: 0 };
    const saidas = d.saidas || {
      custosFixos: 0,
      assinaturas: 0,
      cartaoELazer: 0,
      parcelasEDividas: 0,
    };
    const totalEntradas =
      Number(entradas.salario || 0) +
      Number(entradas.rendaExtra || 0) +
      Number(entradas.outros || 0);
    const totalSaidas =
      Number(saidas.custosFixos || 0) +
      Number(saidas.assinaturas || 0) +
      Number(saidas.cartaoELazer || 0) +
      Number(saidas.parcelasEDividas || 0);
    const netBurn = totalSaidas - totalEntradas;

    const entradasList = document.getElementById("entradas-list");
    entradasList.innerHTML = "";
    for (const k in entradas) {
      const li = document.createElement("li");
      li.innerText = `${k}: ${entradas[k]}`;
      entradasList.appendChild(li);
    }

    const saidasList = document.getElementById("saidas-list");
    saidasList.innerHTML = "";
    for (const k in saidas) {
      const li = document.createElement("li");
      li.innerText = `${k}: ${saidas[k]}`;
      saidasList.appendChild(li);
    }

    // Objetivo
    const objetivo = d.objetivo || { nome: "", valorTotal: 0, prazoMeses: 0 };
    const parcelaMeta =
      objetivo.prazoMeses > 0
        ? Number(objetivo.valorTotal || 0) / Number(objetivo.prazoMeses)
        : 0;
    const impactoMeta =
      totalDisponivel > 0
        ? (Number(objetivo.valorTotal || 0) / totalDisponivel) * 100
        : Infinity;

    const objetivoContent = document.getElementById("objetivo-content");
    objetivoContent.innerHTML = `Nome: ${objetivo.nome} <br/> Valor alvo: R$ ${objetivo.valorTotal} <br/> Prazo (meses): ${objetivo.prazoMeses} <br/> Parcela mensal: R$ ${parcelaMeta.toFixed(2)} <br/> Impacto sobre reserva: ${isFinite(impactoMeta) ? impactoMeta.toFixed(2) + "%" : "N/A"}`;

    // Cálculos adicionais
    const runway = netBurn > 0 ? totalDisponivel / netBurn : Infinity;
    const runwayDisplay = isFinite(runway)
      ? `${runway.toFixed(1)} meses`
      : netBurn <= 0
        ? "Infinito (Superávit)"
        : "—";
    const breakEvenPoint = netBurn > 0 ? netBurn : 0;

    // Runway card
    const runwayContentEl = document.getElementById("runway-content");
    const runwayDescEl = document.getElementById("runway-desc");
    if (runwayContentEl) {
      runwayContentEl.innerText = runwayDisplay;
      runwayContentEl.style.color =
        isFinite(runway) && runway < 6 ? "var(--red)" : "var(--green)";
    }
    if (runwayDescEl) {
      runwayDescEl.innerText = `Saldo: R$ ${totalDisponivel.toFixed(2)}`;
    }

    // Resumo e status
    document.getElementById("resumo-text").innerText =
      `Meta: ${objetivo.nome} — R$ ${objetivo.valorTotal} em ${objetivo.prazoMeses} meses`;
    const statusBadge = document.getElementById("status-alert");
    if (statusBadge) {
      statusBadge.innerText = isFinite(runway)
        ? `${runway.toFixed(1)} meses`
        : "Superávit";
      statusBadge.className = "status-badge";
      if (isFinite(runway)) {
        if (runway < 6) statusBadge.classList.add("status-critical");
        else if (runway >= 12) statusBadge.classList.add("status-healthy");
        else statusBadge.classList.add("status-warning");
      } else {
        statusBadge.classList.add("status-healthy");
      }
    }

    // Balanco mensal
    const balEntradasEl = document.getElementById("bal-entradas");
    const balSaidasEl = document.getElementById("bal-saidas");
    const balNetEl = document.getElementById("bal-netburn");
    if (balEntradasEl)
      balEntradasEl.innerText = `R$ ${totalEntradas.toFixed(2)}`;
    if (balSaidasEl) balSaidasEl.innerText = `R$ ${totalSaidas.toFixed(2)}`;
    if (balNetEl)
      balNetEl.innerText = `${netBurn >= 0 ? "R$ " + netBurn.toFixed(2) : "Superávit R$ " + Math.abs(netBurn).toFixed(2)}`;

    // Break-even and meta impact block
    const metaBlockText = `Break-Even necessário: R$ ${breakEvenPoint.toFixed(2)}. Parcela mensal da meta: R$ ${parcelaMeta.toFixed(2)}.`;
    const metaValidator = (() => {
      const surplus = totalEntradas - totalSaidas;
      if (netBurn > 0) {
        return `Fluxo negativo. Pagar parcela de R$ ${parcelaMeta.toFixed(2)} comprometerá a reserva atual.`;
      } else {
        if (parcelaMeta <= surplus)
          return `OK: Parcela de R$ ${parcelaMeta.toFixed(2)} cabe no surplus mensal (R$ ${surplus.toFixed(2)}).`;
        if (parcelaMeta > surplus && totalDisponivel >= parcelaMeta)
          return `Cuidado: Parcela maior que surplus. Será preciso usar parte da reserva.`;
        return `Perigo: Parcela maior que reserva e surplus — risco de estourar a reserva.`;
      }
    })();

    const objetivoCard = document.getElementById("card-objetivo");
    if (objetivoCard) {
      const info = objetivoCard.querySelector("#objetivo-content");
      if (info && !info.innerHTML.includes("Break-Even"))
        info.insertAdjacentHTML(
          "beforeend",
          `<div style="margin-top:8px"><strong>${metaBlockText}</strong><div>${metaValidator}</div></div>`,
        );
    }

    document.getElementById("json-raw").innerText = JSON.stringify(d, null, 2);
  } catch (err) {
    console.error("Erro ao renderizar dashboard:", err);
  }
}

// Cria um card isolado para o simulador de lazer
function criarCardLazer() {
  const card = document.createElement("article");
  card.className = "card-dev";

  const id = `lazer-${Math.random().toString(36).slice(2, 8)}`;
  card.innerHTML = `
    <h3>Simulador de Economia de Cerveja / Lazer</h3>
    <p>Calcule o impacto anual de um hábito de lazer recorrente.</p>
    <label for="${id}-gasto">Gasto por rolê (R$)</label>
    <input id="${id}-gasto" type="number" min="0" step="0.01" value="80" />
    <label for="${id}-qtd">Quantidade de rolês no mês</label>
    <input id="${id}-qtd" type="number" min="0" step="1" value="4" />
    <button type="button">Calcular</button>
    <div class="output-dev">
      <strong>Gasto anual:</strong>
      <span id="${id}-res" class="result-value">R$ 0,00</span>
    </div>
  `;

  const gastoInput = card.querySelector(`#${id}-gasto`);
  const qtdInput = card.querySelector(`#${id}-qtd`);
  const output = card.querySelector(`#${id}-res`);
  const button = card.querySelector("button");

  const calcular = () => {
    const gastoPorRole = Number(gastoInput.value) || 0;
    const qtdRoles = Number(qtdInput.value) || 0;
    const totalAnual = gastoPorRole * qtdRoles * 12;
    output.textContent = `R$ ${totalAnual.toFixed(2)}`;
    output.classList.toggle("alert", totalAnual > 5000);
  };

  button.addEventListener("click", calcular);
  gastoInput.addEventListener("input", calcular);
  qtdInput.addEventListener("input", calcular);
  calcular();

  return card;
}

// Cria um card isolado para o simulador de sobrevivência
function criarCardSobrevivencia() {
  const card = document.createElement("article");
  card.className = "card-dev";

  const id = `sobrev-${Math.random().toString(36).slice(2, 8)}`;
  card.innerHTML = `
    <h3>Simulador de Dias de Sobrevivência</h3>
    <p>Quanto tempo um freela consegue sustentar seu custo de vida diário.</p>
    <label for="${id}-freela">Valor do freela (R$)</label>
    <input id="${id}-freela" type="number" min="0" step="0.01" value="1200" />
    <label for="${id}-custo">Custo de vida diário (R$)</label>
    <input id="${id}-custo" type="number" min="0" step="0.01" value="80" />
    <button type="button">Calcular</button>
    <div class="output-dev">
      <strong>Dias de sobrevivência:</strong>
      <span id="${id}-res" class="result-value">0,0 dias</span>
    </div>
  `;

  const freelaInput = card.querySelector(`#${id}-freela`);
  const custoInput = card.querySelector(`#${id}-custo`);
  const output = card.querySelector(`#${id}-res`);
  const button = card.querySelector("button");

  const calcular = () => {
    const valorFreela = Number(freelaInput.value) || 0;
    const custoDiario = Number(custoInput.value) || 0;
    const dias = custoDiario > 0 ? valorFreela / custoDiario : 0;
    output.textContent = `${dias.toFixed(1)} dias`;
    output.classList.toggle("alert", dias < 7);
  };

  button.addEventListener("click", calcular);
  freelaInput.addEventListener("input", calcular);
  custoInput.addEventListener("input", calcular);
  calcular();

  return card;
}

// Cria um card isolado para a calculadora de Burn Rate simples
function criarCardBurnRate() {
  const card = document.createElement("article");
  card.className = "card-dev";

  const id = `burn-${Math.random().toString(36).slice(2, 8)}`;
  card.innerHTML = `
    <h3>Burn Rate Simples</h3>
    <p>Calculadora de valor por dia baseada no valor total e no tempo.</p>
    <label for="${id}-valor">Valor total (R$)</label>
    <input id="${id}-valor" type="number" min="0" step="0.01" value="1000" />
    <label for="${id}-tempo">Tempo (dias)</label>
    <input id="${id}-tempo" type="number" min="1" step="1" value="30" />
    <button type="button">Calcular</button>
    <div class="output-dev">
      <strong>Valor por dia:</strong>
      <span id="${id}-res" class="result-value">R$ 0,00</span>
    </div>
  `;

  const valorInput = card.querySelector(`#${id}-valor`);
  const tempoInput = card.querySelector(`#${id}-tempo`);
  const output = card.querySelector(`#${id}-res`);
  const button = card.querySelector("button");

  const calcular = () => {
    const valorMes = Number(valorInput.value) || 0;
    const tempo = Number(tempoInput.value) || 1;
    const total = valorMes / tempo;
    output.textContent = `R$ ${total.toFixed(2)}`;
    output.classList.toggle("alert", total > 100);
  };

  button.addEventListener("click", calcular);
  valorInput.addEventListener("input", calcular);
  tempoInput.addEventListener("input", calcular);
  calcular();

  return card;
}

// Inicializa a grade do laboratório com os cards de exemplo
function inicializarLaboratorio() {
  const grid = document.getElementById("grid-laboratorio");
  if (!grid || grid.dataset.inicializado === "true") return;

  grid.dataset.inicializado = "true";
  grid.appendChild(criarCardLazer());
  grid.appendChild(criarCardSobrevivencia());
  grid.appendChild(criarCardBurnRate());

  const cardsVazios = [1, 2, 3].map(() => {
    const card = document.createElement("article");
    card.className = "card-dev";
    card.innerHTML = `
      <h3>Card Vazio</h3>
      <p>Espaço livre para testar novos exercícios ou ideias.</p>
    `;
    return card;
  });

  cardsVazios.forEach((card) => grid.appendChild(card));
}

// Alterna entre o painel financeiro e o laboratório dev
function trocarTela(valor) {
  const painel = document.getElementById("painel-financeiro");
  const laboratorio = document.getElementById("tela-laboratorio");
  const gerenciamento = document.getElementById("tela-gerenciamento");
  const historico = document.getElementById("tela-historico");
  const select = document.getElementById("nav-select");

  if (!painel || !laboratorio || !select) return;

  // hide all
  painel.style.display = "none";
  laboratorio.style.display = "none";
  if (gerenciamento) gerenciamento.style.display = "none";
  if (historico) historico.style.display = "none";

  if (valor === "laboratorio") {
    laboratorio.style.display = "block";
    inicializarLaboratorio();
  } else if (valor === "gerenciamento") {
    if (gerenciamento) {
      gerenciamento.style.display = "block";
      // populate textarea with current JSON
      const dados = lerDadosSalvos() || {};
      const area = document.getElementById("gerenciamento-json");
      if (area) area.value = JSON.stringify(dados, null, 2);
    }
  } else if (valor === "historico") {
    if (historico) {
      historico.style.display = "block";
      renderHistorico();
    }
  } else {
    painel.style.display = "block";
  }

  select.value = valor;
}

// Remove os dados salvos e reinicia a aplicação
function limparEConfigurar() {
  localStorage.removeItem("jsBurnRate_pessoal");
  window.location.reload();
}

// Inicializa a aplicação ao carregar a página
window.onload = function () {
  inicializarLaboratorio();

  const dadosGuardados = localStorage.getItem("jsBurnRate_pessoal");
  if (dadosGuardados) {
    ativarPainelVisual();
    renderDashboard(JSON.parse(dadosGuardados));
  }
};
