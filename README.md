# checkout-api-example

![Main workflow](https://github.com/LindomarReitz/checkout-api-example/workflows/Main%20workflow/badge.svg)

Change the env `PACT_BROKER_URL` before publishing to Pact Broker.

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