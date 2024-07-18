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
import UpdateTrip from "./routes/update-trip";
import getTripDetails from "./routes/get-trip-details";
import getParticipant from "./routes/get-participant";
import { errorHandler } from "./error-handler";
import { env } from "./env";

const app = fastify()

app.register(cors, {
    origin: "*",
})
//adicionar esses dois plugins
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler)


app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipantsInTrip)
app.register(createActivity)
app.register(getActivities)
app.register(createLink)
app.register(getLinks)
app.register(getParticipants)
app.register(createInvite)
app.register(UpdateTrip)
app.register(getTripDetails)
app.register(getParticipant)


app.get("/", () => {
    return "welcome to api"
})

app.listen({ port: env.PORT, host: "0.0.0.0"}).then(() => {
    console.log("server running")
})