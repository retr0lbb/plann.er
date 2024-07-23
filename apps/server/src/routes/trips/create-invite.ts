import { FastifyInstance} from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { prisma } from "../../lib/prisma";
import {dayjs} from "../../lib/dayjs-config"
import { getMailClient } from "../../lib/mail";
import nodemailer from "nodemailer";
import { ClientError } from "../../errors/client-error";
import { env } from "../../env";


export default async function createInvite(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post("/trips/:tripId/invite", {
        schema: {
            body: z.object({
                email: z.string().email()
            }),
            params: z.object({
                tripId: z.string().uuid()
            })
        }
    } ,async (request, reply) => {

        const {email} = request.body;
        const {tripId} = request.params;

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }
        })

        if(!trip){
            throw new ClientError("Trip not found.")
        }

        const participant = await prisma.participant.create({
            data: {
                email,
                trip_id: tripId
            }
        })

        const formatedStartsDate = dayjs(trip.starts_at).format("LL")
        const formatedEndsDate = dayjs(trip.ends_at).format("LL")
        const mail = await getMailClient()


        const confirmLinktrip = `${env.API_BASE_URL}/participants/${participant.id}/confirm`
            const message = await mail.sendMail({
                from: {
                    name: "Equipe Passegure",
                    address: "fake@faker.xyz"
                },
                to: participant.email,
                subject: `Confirme sua presença na viagem para ${trip.destination} em ${formatedStartsDate}`,
                html: `
                    <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                    <p>Você foi convidado(a) para participar de uma viagem para <strong>${trip.destination}</strong> nas datas de <strong>${formatedStartsDate}</strong> a <strong>${formatedEndsDate}</strong></p>
                    <p></p>
                    <p>Para confirmar sua prensença na viagem, clique no link abaixo</p>
                    <p></p>
                    <a href="${confirmLinktrip}">Confirmar Viagem</a>
                    <p></p>
                    <p></p>
                    <p>Caso você não saiba do que se trata esse email apenas ignore</p>
                    </div>
                `.trim()
            })
            
    
            console.log(nodemailer.getTestMessageUrl(message))

        return reply.status(201).send({participantId: participant.id})
    })
}

