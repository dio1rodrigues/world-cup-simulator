# World Cup Simulator

Aplicação web desenvolvida para simular uma Copa do Mundo completa.

O projeto consome uma API externa para obter as 32 seleções participantes, realiza o sorteio dos grupos, simula a fase de grupos, gera o chaveamento do mata-mata, define o campeão e envia o resultado final para a API.

## Objetivo

Implementar uma aplicação capaz de:

- consumir da API a lista com as 32 seleções;
- distribuir as seleções de forma randômica em 8 grupos de 4 equipes;
- gerar os confrontos da fase de grupos;
- simular os resultados da fase de grupos;
- calcular a classificação de cada grupo;
- definir os classificados para o mata-mata;
- simular oitavas, quartas, semifinal e final;
- decidir empates do mata-mata por disputa de pênaltis;
- enviar o resultado da final para a API.

## Tecnologias utilizadas

- React
- JavaScript
- Tailwind CSS
- Vite
- Vitest

## Funcionalidades implementadas

- consumo da API de seleções;
- envio do header obrigatório `git-user`;
- validação da resposta da API;
- validação explícita de 32 seleções;
- sorteio randômico dos grupos A até H;
- exibição dos grupos na interface;
- geração das três rodadas da fase de grupos;
- simulação de todos os jogos da fase de grupos;
- cálculo de pontuação, saldo de gols e classificação;
- aplicação dos critérios de desempate;
- classificação dos dois melhores de cada grupo;
- geração do chaveamento do mata-mata;
- simulação de oitavas, quartas, semifinal e final;
- simulação de disputa por pênaltis em empates no mata-mata;
- definição do campeão;
- envio do resultado final para a API.

## Regras implementadas

### Fase de grupos

- 8 grupos com 4 seleções cada;
- 3 rodadas por grupo;
- 2 jogos por rodada;
- vitória vale 3 pontos;
- empate vale 1 ponto para cada equipe;
- critérios de desempate:
  1. pontos;
  2. saldo de gols;
  3. sorteio.

### Mata-mata

- oitavas de final;
- quartas de final;
- semifinal;
- final;
- em caso de empate, a classificação é decidida por pênaltis.

## Estrutura do projeto

```text
src/
├─ components/
│  ├─ ActionPanel.jsx
│  ├─ ChampionCard.jsx
│  ├─ GroupCard.jsx
│  ├─ GroupTable.jsx
│  ├─ KnockoutBracket.jsx
│  ├─ MatchList.jsx
│  └─ StatusBanner.jsx
├─ features/
│  └─ tournament/
│     ├─ api.js
│     ├─ engine.js
│     ├─ finalResult.js
│     └─ useTournament.js
├─ tests/
│  ├─ finalResult.test.js
│  └─ tournament.engine.test.js
├─ App.jsx
├─ index.css
└─ main.jsx
```

## Configuração do ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
VITE_GIT_USER=seu_usuario_git
VITE_API_BASE_URL=https://development-internship-api.geopostenergy.com
```

### Variáveis

- `VITE_GIT_USER`: usuário do GitHub, GitLab ou Bitbucket utilizado na entrega do teste. Essa variável é usada para preencher o header obrigatório `git-user`.
- `VITE_API_BASE_URL`: URL base da API do desafio.

## Instalação

```bash
npm install
```

## Execução

```bash
npm run dev
```

## Testes

```bash
npm run test
```

## Validação

```bash
npm run lint
npm run build
```

## Fluxo da aplicação

1. carregar seleções da API;
2. sortear os grupos;
3. gerar as rodadas da fase de grupos;
4. simular os jogos da fase de grupos;
5. calcular a classificação dos grupos;
6. montar o chaveamento do mata-mata;
7. simular as fases finais;
8. enviar o resultado da final para a API.

## Testes implementados

A suíte cobre:

- distribuição das 32 seleções em 8 grupos de 4;
- geração correta das rodadas da fase de grupos;
- confrontos sem repetição indevida;
- contabilização de pontos;
- saldo de gols;
- ordenação por desempate;
- classificação dos dois primeiros;
- montagem das oitavas de final;
- decisão por pênaltis no mata-mata;
- localização da final;
- formatação do payload enviado para a API.

## Observações

- o projeto depende da configuração correta do `.env.local`;
- o header `git-user` é obrigatório para a integração com a API;
- os testes foram escritos com foco na regra de negócio principal;
- o projeto foi organizado separando interface, integração com API, regras do torneio e testes.