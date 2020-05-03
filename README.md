# checkout-api-example

![Main workflow](https://github.com/LindomarReitz/checkout-api-example/workflows/Main%20workflow/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/7ecd76068ae95cd18112/maintainability)](https://codeclimate.com/github/LindomarReitz/checkout-api-example/maintainability)

Change the env `PACT_BROKER_URL` before publishing to Pact Broker. If you want to use [PactFlow](https://pactflow.io/) change the env `PACT_BROKER_TOKEN`.

Run using docker-compose:

```
docker-compose up -d
docker-compose exec checkout_api bash
```

Install the dependencies:

```
npm install
```

Run the consumer tests:

```
npm run pactTest
```

Publish pacts to Pact Broker:

```
npm run publish:pact
```