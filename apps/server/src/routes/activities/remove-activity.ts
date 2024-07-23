import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma"
import { ClientError } from "../../errors/client-error";


export default async function removeActivity(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().delete("/trips/:tripId/activities/:activityId", {
        schema: {
            params: z.object({
                tripId: z.string().uuid(),
                activityId: z.string().uuid()   
            })
        }
    } ,async (request, reply) => {
        const {tripId, activityId} = request.params

        const tripWithActivity = await prisma.trip.findUnique({
            where: {
                id: tripId
            },
            include: {
                activities: {
                    where: {
                        id: activityId
                    }
                }
            }
        })

        if(tripWithActivity === null || tripWithActivity.activities.length <= 0){
            return new ClientError("Activity Not found")
        }

        await prisma.activity.delete({
            where: {
                id: activityId
            }
        })

        return reply.status(200).send("")
    })
}

