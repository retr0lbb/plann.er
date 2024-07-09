import fastify from "fastify";
import createTrip from "./routes/create-trip";
import confirmTrip from "./routes/confirm-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import cors from "@fastify/cors"
import confirmParticipantsInTrip from "./routes/confirm-participant";

const app = fastify()

app.register(cors, {
    origin: "*"
})
//adicionar esses dois plugins
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipantsInTrip)



app.listen({ port: 3333}).then(() => {
    console.log("server running")
})