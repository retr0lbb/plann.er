import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import cors from "@fastify/cors"
import createTrip from "./routes/create-trip";
import confirmTrip from "./routes/confirm-trip";
import confirmParticipantsInTrip from "./routes/confirm-participant";
import createActivity from "./routes/activities/create-activity";
import getActivities from "./routes/activities/get-activities";
import createLink from "./routes/links/create-link";
import getLinks from "./routes/links/get-links";
import getParticipants from "./routes/get-participants";
import createInvite from "./routes/create-invite";

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
app.register(createActivity)
app.register(getActivities)
app.register(createLink)
app.register(getLinks)
app.register(getParticipants)
app.register(createInvite)


app.listen({ port: 3333}).then(() => {
    console.log("server running")
})