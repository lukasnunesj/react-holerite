# react-holerite

[![CI/CD](https://github.com/lukasnunesj/react-holerite/actions/workflows/main.yml/badge.svg)](https://github.com/lukasnunesj/react-holerite/actions/workflows/main.yml)

Previsão de folha de pagamento: o usuário informa salário, horas extras e noturnas, dias úteis, domingos e feriados e
descontos, e vê o holerite estimado, com INSS, IRRF e o valor líquido.

Feito para ajudar uma pessoa a calcular, de forma aproximada, quanto receberia de salário.

**Aplicação:** <https://react-holerite.fly.dev>

O cálculo não é feito no navegador. O front chama a API [api-holerite](https://github.com/lukasnunesj/api-holerite)
(C# / .NET 8), que concentra as regras e as tabelas de INSS e IRRF de 2026.

> Valores aproximados. Não substitui o holerite: sem dependentes, 13º, férias ou pensão.

## Stack

React 18, Vite, Tailwind CSS, Axios, `react-number-format` e `react-text-mask` (máscaras de moeda e hora). Testes com Jest.

## Como rodar

Com a API rodando localmente (`dotnet run --project HoleriteAPI.Consumer`, porta 5042):

```sh
yarn install
yarn dev
```

A URL da API vem de `VITE_API_URL`: `.env` aponta para `http://localhost:5042` e `.env.production` para a API publicada.
Esses arquivos só têm URLs, não há segredos.

## Testes

```sh
yarn test
```

Cobrem as funções de apoio (soma de horas e conversão do valor mascarado em moeda). As regras de cálculo são testadas
na API.

## Deploy

A cada push na `main`, o GitHub Actions roda os testes e o build e, se passarem, publica no Fly.io
(secret `FLY_API_TOKEN`). Pull requests só rodam testes e build.
