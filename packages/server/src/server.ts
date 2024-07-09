import fastify from "fastify";
import CreateTrip from "./routes/create-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

const app = fastify()

//adicionar esses dois plugins
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register(CreateTrip)



app.listen({ port: 3333}).then(() => {
    console.log("server running")
})