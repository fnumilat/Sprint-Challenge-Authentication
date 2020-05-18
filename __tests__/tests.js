const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")




afterAll(async () => {
    await db.destroy()
})



describe("testing the endpoints", () => {
    // beforeEach(async () => {
    //     await db("users").truncate()
    // })


    test("testing the register endpoint", async () => {
        const endpoint = "/api/auth/register"
        const status = 409
        const data = { username: "fnumilat2021", password: "2020rocking" }

        const res = await supertest(server).post(endpoint).send(data)
        // console.log(res)

        expect(res.statusCode).toBe(status)
        expect(res.type).toBe("application/json");
    })

    test("testing the login endpoint", async () => {
        const data = { username: "fnumilat2020", password: "2020rocking" }

        const res = await supertest(server).post("/api/auth/login").send(data)

        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json");
        expect(res.body.message).toBe("Invalid credentials!")
    })

    test("testing the jokes endpoint", async () => {
        const endpoint = "/api/jokes/"
        const status = 404

        const res = await supertest(server).post(endpoint)
        // console.log(res)

        expect(res.statusCode).toBe(status)
        expect(res.type).toBe("text/html");

    })
})