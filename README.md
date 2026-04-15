```md
# World Cup Simulator

Aplicação web desenvolvida como solução para a avaliação técnica do processo seletivo de Estágio em Desenvolvimento de Software 2026.

O projeto simula uma Copa do Mundo completa a partir da API fornecida no desafio, realizando o sorteio dos grupos, a simulação da fase de grupos, o chaveamento do mata-mata, a definição do campeão e o envio do resultado final para a API.

## 1. Objetivo

Construir uma aplicação web capaz de:

- consumir da API a lista com as 32 seleções;
- distribuir as seleções de forma randômica em 8 grupos (A até H);
- gerar e simular os confrontos da fase de grupos;
- calcular a classificação de cada grupo;
- definir os classificados para o mata-mata;
- simular oitavas, quartas, semifinal e final;
- decidir empates do mata-mata por disputa de pênaltis;
- enviar o resultado da final para a API.

## 2. Tecnologias utilizadas

- React
- JavaScript
- TailwindCSS
- Vite

## 3. Escopo da aplicação

A aplicação foi planejada para atender às regras do teste técnico, com foco em:

- clareza de código;
- boa separação de responsabilidades;
- interface organizada;
- legibilidade dos dados;
- facilidade de manutenção.

## 4. Funcionalidades

### Funcionalidades obrigatórias

- consumo da API de seleções;
- uso do header `git-user` nas chamadas da API;
- sorteio randômico dos grupos A até H;
- exibição dos grupos na interface;
- geração das três rodadas da fase de grupos;
- simulação de todos os resultados da fase de grupos;
- cálculo de pontuação por equipe;
- aplicação dos critérios de desempate;
- classificação dos dois melhores de cada grupo;
- geração do chaveamento do mata-mata;
- simulação das oitavas, quartas, semifinal e final;
- simulação de pênaltis em empates no mata-mata;
- envio do resultado da final para a API.

## 5. Arquitetura do projeto

A arquitetura foi definida de forma enxuta, com poucos arquivos e responsabilidades bem separadas.

```text
src/
├─ assets/
├─ components/
│  ├─ ActionPanel.jsx
│  ├─ GroupCard.jsx
│  ├─ GroupTable.jsx
│  ├─ MatchList.jsx
│  ├─ KnockoutBracket.jsx
│  ├─ ChampionCard.jsx
│  └─ StatusBanner.jsx
├─ features/
│  └─ tournament/
│     ├─ api.js
│     ├─ engine.js
│     ├─ standings.js
│     └─ useTournament.js
├─ App.jsx
├─ main.jsx
└─ index.css
```

## 6. Como executar

```bash
npm install
npm run dev
```