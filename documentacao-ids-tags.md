# Documentação de IDs e tags — JBurn

Este arquivo centraliza os principais elementos HTML, suas IDs e onde cada um é utilizado no projeto.

## Arquivos principais

- [index.html](index.html): estrutura da interface, formulário, header e dashboard.
- [script.js](script.js): manipula os elementos por ID para renderizar o painel e alternar telas.
- [style.css](style.css): estiliza as classes, IDs e layout geral.

## IDs utilizadas

| ID                  | Elemento | Para que serve                                                         | Onde é usada                                     |
| ------------------- | -------- | ---------------------------------------------------------------------- | ------------------------------------------------ |
| `corpo`             | body     | Marca o corpo da página e recebe a classe `app-ativo` após o cadastro. | [index.html](index.html), [script.js](script.js) |
| `tela-coleta`       | section  | Agrupa o formulário inicial de onboarding.                             | [index.html](index.html), [script.js](script.js) |
| `passo-1`           | section  | Bloco do passo 1 do formulário.                                        | [index.html](index.html)                         |
| `passo-2`           | section  | Bloco do passo 2 do formulário.                                        | [index.html](index.html)                         |
| `passo-3`           | section  | Bloco do passo 3 do formulário.                                        | [index.html](index.html)                         |
| `passo-4`           | section  | Bloco do passo 4 do formulário.                                        | [index.html](index.html)                         |
| `saldoAtual`        | input    | Guarda o saldo atual disponível.                                       | [index.html](index.html), [script.js](script.js) |
| `capitalGiro`       | input    | Guarda o valor reservado/poupança.                                     | [index.html](index.html), [script.js](script.js) |
| `hist1`             | input    | Armazena o saldo do mês passado.                                       | [index.html](index.html), [script.js](script.js) |
| `hist2`             | input    | Armazena o saldo de dois meses atrás.                                  | [index.html](index.html), [script.js](script.js) |
| `mrr`               | input    | Valor do salário ou renda fixa mensal.                                 | [index.html](index.html), [script.js](script.js) |
| `receitaPontual`    | input    | Renda extra média mensal.                                              | [index.html](index.html), [script.js](script.js) |
| `aportes`           | input    | Outros recebimentos do mês.                                            | [index.html](index.html), [script.js](script.js) |
| `payroll`           | input    | Custos fixos mensais.                                                  | [index.html](index.html), [script.js](script.js) |
| `saas`              | input    | Gastos com assinaturas.                                                | [index.html](index.html), [script.js](script.js) |
| `marketing`         | input    | Gastos variáveis e cartão.                                             | [index.html](index.html), [script.js](script.js) |
| `impostos`          | input    | Dívidas e parcelas ativas.                                             | [index.html](index.html), [script.js](script.js) |
| `nomeMeta`          | input    | Nome da meta/objetivo.                                                 | [index.html](index.html), [script.js](script.js) |
| `precoAlvoMeta`     | input    | Valor total da meta.                                                   | [index.html](index.html), [script.js](script.js) |
| `prazoMeta`         | input    | Prazo em meses para alcançar a meta.                                   | [index.html](index.html), [script.js](script.js) |
| `tela-dashboard`    | section  | Container do painel principal após o cadastro.                         | [index.html](index.html), [script.js](script.js) |
| `header-runway`     | div      | Mostra o runway calculado no cabeçalho.                                | [index.html](index.html), [script.js](script.js) |
| `header-saldo`      | div      | Mostra o saldo total no cabeçalho.                                     | [index.html](index.html), [script.js](script.js) |
| `nav-select`        | select   | Alterna entre o painel financeiro e o laboratório dev.                 | [index.html](index.html), [script.js](script.js) |
| `painel-financeiro` | main     | Área do dashboard financeiro principal.                                | [index.html](index.html), [script.js](script.js) |
| `tela-laboratorio`  | main     | Área da tela de laboratório dev.                                       | [index.html](index.html), [script.js](script.js) |
| `card-resumo`       | div      | Card de resumo geral.                                                  | [index.html](index.html)                         |
| `card-disponivel`   | div      | Card com os valores disponíveis.                                       | [index.html](index.html)                         |
| `card-balanco`      | div      | Card com entradas, saídas e net burn.                                  | [index.html](index.html)                         |
| `card-objetivo`     | div      | Card com objetivo e impacto da meta.                                   | [index.html](index.html)                         |
| `resumo-text`       | p        | Texto do resumo do dashboard.                                          | [index.html](index.html), [script.js](script.js) |
| `status-alert`      | div      | Badge de status do runway.                                             | [index.html](index.html), [script.js](script.js) |
| `disponivel-list`   | ul       | Lista com os valores de disponibilidade.                               | [index.html](index.html), [script.js](script.js) |
| `entradas-list`     | ul       | Lista das entradas mensais.                                            | [index.html](index.html), [script.js](script.js) |
| `saidas-list`       | ul       | Lista das saídas mensais.                                              | [index.html](index.html), [script.js](script.js) |
| `bal-entradas`      | strong   | Valor total das entradas.                                              | [index.html](index.html), [script.js](script.js) |
| `bal-saidas`        | strong   | Valor total das saídas.                                                | [index.html](index.html), [script.js](script.js) |
| `bal-netburn`       | strong   | Valor do net burn.                                                     | [index.html](index.html), [script.js](script.js) |
| `objetivo-content`  | div      | Conteúdo do objetivo e meta.                                           | [index.html](index.html), [script.js](script.js) |
| `json-raw`          | pre      | Exibe o JSON bruto dos dados salvos.                                   | [index.html](index.html), [script.js](script.js) |

## Tags principais e usos

| Tag         | Uso principal                                                   | Onde aparece             |
| ----------- | --------------------------------------------------------------- | ------------------------ |
| `section`   | Organiza o formulário, cada passo, o dashboard e o laboratório. | [index.html](index.html) |
| `header`    | Cabeçalho fixo com logo, métricas e seletor de navegação.       | [index.html](index.html) |
| `main`      | Define as áreas principais de conteúdo do dashboard.            | [index.html](index.html) |
| `input`     | Captura dados do usuário no formulário.                         | [index.html](index.html) |
| `button`    | Navegação entre passos, envio do formulário e reset.            | [index.html](index.html) |
| `select`    | Troca entre visualizações do painel.                            | [index.html](index.html) |
| `img`       | Exibe o logo do projeto.                                        | [index.html](index.html) |
| `ul` / `li` | Lista os valores de disponibilidade, entradas e saídas.         | [index.html](index.html) |
| `pre`       | Exibe o conteúdo bruto do objeto JSON.                          | [index.html](index.html) |
| `div`       | Estruturação geral de cards, blocos e containers.               | [index.html](index.html) |

## Observação

Se você quiser, no próximo passo eu posso transformar essa documentação em uma versão ainda mais completa, com os nomes das funções do JavaScript relacionando cada ID ao código que a manipula.
