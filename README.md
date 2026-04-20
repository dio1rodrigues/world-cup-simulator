# World Cup Simulator

Aplicação web desenvolvida para simular uma Copa do Mundo.

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
- Vitest

## 3. Escopo da aplicação

A aplicação foi planejada para atender às regras do teste técnico, com foco em:

- clareza de código;
- boa separação de responsabilidades;
- interface organizada;
- legibilidade dos dados;
- facilidade de manutenção;
- previsibilidade da regra de negócio.

## 4. Funcionalidades

### Funcionalidades obrigatórias

- consumo da API de seleções;
- uso do header `git-user` nas chamadas da API;
- validação da resposta da API;
- validação explícita de 32 seleções;
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
- definição do campeão;
- envio do resultado da final para a API.

### Qualidade e suporte

- tratamento de erro para falha de rede;
- tratamento de timeout nas requisições;
- tratamento de resposta inválida da API;
- suíte de testes automatizados para a engine e para o payload final.

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
│     ├─ finalResult.js
│     └─ useTournament.js
├─ tests/
│  ├─ finalResult.test.js
│  └─ tournament.engine.test.js
├─ App.jsx
├─ main.jsx
└─ index.css
```

## 6. Configuração do ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
VITE_GIT_USER=seu_usuario_git
VITE_API_BASE_URL=https://development-internship-api.geopostenergy.com
```

### Variáveis

- `VITE_GIT_USER`: usuário do GitHub, GitLab ou Bitbucket utilizado na entrega do teste. Essa variável é usada para preencher o header obrigatório `git-user`.
- `VITE_API_BASE_URL`: URL base da API do desafio.

## 7. Como executar

```bash
npm install
npm run dev
```

## 8. Como rodar os testes

```bash
npm run test
```

## 9. Como validar a aplicação

```bash
npm run lint
npm run build
```

## 10. Fluxo da aplicação

1. Carregar seleções  
2. Sortear grupos  
3. Gerar partidas da fase de grupos  
4. Simular fase de grupos  
5. Gerar mata-mata  
6. Simular fases finais  
7. Enviar resultado final  

## 11. Regras implementadas

### Fase de grupos

- 8 grupos de 4 seleções;
- 3 rodadas por grupo;
- 2 jogos por rodada;
- vitória vale 3 pontos;
- empate vale 1 ponto para cada equipe;
- critérios de desempate:
  1. pontos
  2. saldo de gols
  3. sorteio

### Mata-mata

- oitavas de final;
- quartas de final;
- semifinal;
- final;
- em caso de empate, a classificação é decidida por pênaltis.

## 12. Testes adicionados

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

## 13. Observações

- o projeto depende da configuração correta do `.env.local`;
- o header `git-user` é obrigatório para a integração com a API;
- os testes foram escritos sobre a regra de negócio, priorizando previsibilidade e legibilidade;
- o foco da implementação foi clareza de código, separação de responsabilidades e aderência às regras do desafio.