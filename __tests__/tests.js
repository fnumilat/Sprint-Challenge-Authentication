const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")


// beforeEach(async () => {
//     await db.seed.run()
// })

afterAll(async () => {
    await db.destroy()
})



describe("testing the endpoints", () => {
    test("testing the register endpoint", async () => {
        const endpoint  = "/api/auth/register"
        const status = 409
        const data = { username: "fnumilat2021", password: "2020rocking" }

        const res = await supertest(server).post(endpoint).send(data)
        // console.log(res)
        
        expect(res.statusCode).toBe(status)
        expect(res.type).toBe("application/json");
    })

    // test("testing the login endpoint", async () => {
    //     const endpoint  = "/api/auth/login"
    //     const status = 200
    //     const data = { username: "fnumilat2021", password: "2020rocking" }

    //     const res = await supertest(server).post(endpoint).send(data)
    //     // console.log(res)
        
    //     // expect(res.statusCode).toBe(status)
    //     // // expect(res.type).toBe("application/json");
    //     // expect(res.body.message).toBe("You logged in successfuly!")
    // })

        test("testing the jokes endpoint", async () => {
        const endpoint  = "/api/jokes/"
        const status = 404

        const res = await supertest(server).post(endpoint)
        // console.log(res)
        
        expect(res.statusCode).toBe(status)
        expect(res.type).toBe("text/html");
        
    })
})