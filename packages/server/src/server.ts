import fastify from "fastify";

const app = fastify()



app.get("/", () => {
    return "Welcome to my api"
})

app.listen({ port: 3333}).then(() => {
    console.log("server running")
})