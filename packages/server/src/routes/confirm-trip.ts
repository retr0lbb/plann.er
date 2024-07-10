import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { getMailClient } from "../lib/mail";
import { dayjs } from "../lib/dayjs-config"
import nodemailer from "nodemailer"
import { ClientError } from "../errors/client-error";


export default async function confirmTrip(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get("/trips/:tripId/confirm", {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            })
        }
    }, async (request, reply) => {

        const { tripId } = request.params

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            },
            include: {
                participants: {
                    where: {
                        is_owner: false
                    }
                }
            }
        })

        if(!trip){
            throw new ClientError("Trip not found")
        }

        if(trip.is_confirmed){
            return reply.redirect(`http://localhost:3000/trips/${trip.id}`)
        }


        await prisma.trip.update({
            where: {
                id: trip.id
            },
            data: {
                is_confirmed: true
            }
        })



        const formatedStartsDate = dayjs(trip.starts_at).format("LL")
        const formatedEndsDate = dayjs(trip.ends_at).format("LL")
        const mail = await getMailClient()

        await Promise.all(
            trip.participants.map(async(participant) => {
                const confirmLinktrip = `http://localhost:3333/participants/${participant.id}/confirm`
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
            })
        )

        return reply.status(301).redirect(`http://localhost:3000/trips/${trip.id}`)
    })
}