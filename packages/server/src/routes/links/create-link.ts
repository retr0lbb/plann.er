import { FastifyInstance} from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { prisma } from "../../lib/prisma";



export default async function createLink(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post("/trips/:tripId/links", {
        schema: {
            body: z.object({
                title: z.string(),
                url: z.string().url(),
            }),
            params: z.object({
                tripId: z.string().uuid()
            })
        }
    } ,async (request, reply) => {

        const {url, title} = request.body;
        const {tripId} = request.params;

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }
        })

        if(!trip){
            throw new Error("Trip not found.")
        }

        const link = await prisma.link.create({
            data: {
                title,
                url,
                trip_id: tripId
            }
        })

        return reply.status(201).send({linkId: link.id})
    })
}

