import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { dayjs } from "../../lib/dayjs-config"
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";


export default async function updateActivity(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().put("/trips/:tripId/activities/:activityId", {
        schema: {
            body: z.object({
                title: z.string(),
                occurs_at: z.coerce.date()
            }),
            params: z.object({
                tripId: z.string().uuid(),
                activityId: z.string().uuid()
            })
        }
    }, async(request, reply)=>{

        const {activityId, tripId} = request.params;
        const {occurs_at, title} = request.body;

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
            return new ClientError("Trip or activity not found")
        }

        const updatedActivity = await prisma.activity.update({
            data: {
                title,
                occurs_at: dayjs(occurs_at).toISOString()
            },
            where: {
                id: activityId
            }
        })


        return reply.status(200).send({data: updatedActivity})
    });
}