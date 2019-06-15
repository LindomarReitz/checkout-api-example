describe('User API', () => {
    let url = "http://localhost";
    const getUserByUsername = require("../index").getUserByUsername
    const path = require('path')
    const { Pact } = require('@pact-foundation/pact')

    let username = "wecclesall2"

    const port = 1234;
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
        provider: 'User'
    });

    const EXPECTED_BODY =
    {
        "id": 3,
        "username": username,
        "email": "etoomey2@unc.edu",
        "billingAddress": "1255 Old Shore Trail",
        "shippingAddress": "716 Dexter Park"
    }

    beforeAll(done => {
        provider.setup().then(() => done())
    })

    afterAll(done => {
        provider.finalize().then(() => done())
    })

    describe('Gets an user by username', () => {
        beforeEach(() => {
            const interaction = {
                uponReceiving: 'Get an user by username',
                withRequest: {
                    method: 'GET',
                    path: `/users/${username}`,
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
            return getUserByUsername({
                url,
                port,
                username
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