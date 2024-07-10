import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { prisma } from "../lib/prisma";
import {dayjs} from "../lib/dayjs-config"
import { ClientError } from "../errors/client-error";


export default async function UpdateTrip(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().put("/trips/:tripId", {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            }),
            body: z.object({
                destination: z.string().min(3).max(200),
                starts_at: z.coerce.date(),
                ends_at: z.coerce.date(),
            })
        }
    } ,async (request, reply) => {
        const {destination, ends_at, starts_at} = request.body
        const {tripId} = request.params

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }
        })

        if(!trip){
            throw new ClientError("Trip not found.")
        }

        if(dayjs(starts_at).isBefore(new Date())){
            throw new ClientError("Invalid trip start date.")
        }

        if(dayjs(ends_at).isBefore(starts_at)){
            throw new ClientError("Invalid trip end date.")
        }

        await prisma.trip.update({
            data: {
                destination,
                starts_at,
                ends_at
            },
            where: {id: tripId}
        })

      
        return reply.status(201).send({message: "Trip Update with sucess", data: trip.id})
    })
}

