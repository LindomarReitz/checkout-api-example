describe('Product API', () => {
    let url = "http://localhost";
    const port = 2345;
    
    const getProductById = require("../index").getProductById
    let productId = 592

    const path = require('path')
    const { Pact } = require('@pact-foundation/pact')

    const provider = new Pact({
        port: port,
        log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
        dir: path.resolve(process.cwd(), 'pacts'),
        spec: 2,
        cors: true,
        host: '0.0.0.0',
        logLevel: 'INFO',
        pactfileWriteMode: 'update',
        consumer: 'Checkout',
        provider: 'Product'
    });
    
    beforeAll(done => {
        provider.setup().then(() => done())
    })
    
    afterAll(done => {
        provider.finalize().then(() => done())
    })

    const EXPECTED_BODY =
    {
        "id": productId,
        "description": "Mushroom - Morels, Dry",
        "price": 320.44
    }

    describe('Gets a product by id', () => {
        beforeEach(() => {
            const interaction = {
                uponReceiving: 'Get a product by ID',
                withRequest: {
                    method: 'GET',
                    path: `/products/${productId}`,
                    headers: {
                        Accept: 'application/json'
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: EXPECTED_BODY
                }
            };

            return provider.addInteraction(interaction)
        });

        it("calls the API", done => {
            return getProductById({
                url,
                port,
                productId
            })
                .then(response => {
                    expect(response.headers["content-type"]).toEqual("application/json")
                    expect(response.data).toEqual(EXPECTED_BODY)
                    expect(response.status).toEqual(200)
                    done()
                })
                .then(() => provider.verify())
        });
    });
});