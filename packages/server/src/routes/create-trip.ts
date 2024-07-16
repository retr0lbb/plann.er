import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { prisma } from "../lib/prisma";
import { getMailClient } from "../lib/mail";
import nodemailer from "nodemailer"
import {dayjs} from "../lib/dayjs-config"
import { ClientError } from "../errors/client-error";
import { env } from "../env";


export default async function CreateTrip(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post("/trips", {
        schema: {
            body: z.object({
                destination: z.string().min(3).max(200),
                starts_at: z.coerce.date(),
                ends_at: z.coerce.date(),
                owner_name: z.string(),
                owner_email: z.string().email(),
                emails_to_invite: z.array(z.string().email())
            })
        }
    } ,async (request, reply) => {
        const {destination, ends_at, starts_at, owner_email, owner_name, emails_to_invite} = request.body

        if(dayjs(starts_at).isBefore(new Date())){
            throw new ClientError("Invalid trip start date.")
        }

        if(dayjs(ends_at).isBefore(starts_at)){
            throw new ClientError("Invalid trip end date.")
        }

        const trip = await prisma.trip.create({
            data: {
                destination,
                ends_at,
                starts_at,
                slug: destination.toLocaleLowerCase(),
                participants: {
                    createMany: {
                        data: [
                            {
                                email: owner_email,
                                name: owner_name,
                                is_owner: true,
                                is_confirmed: true
                            },
                            ...emails_to_invite.map(item => {
                                return {
                                    email: item,
                                }
                            })
                        ]
                    }
                }
            }
        })

        const formatedStartsDate = dayjs(starts_at).format("LL")
        const formatedEndsDate = dayjs(ends_at).format("LL")

        const confirmLinktrip = `${env.API_BASE_URL}/trips/${trip.id}/confirm`
        const mail = await getMailClient()


        const message = await mail.sendMail({
            from: {
                name: "Planner travel assistend manager",
                address: "planer@not-reply.co"
            },
            to: {
                name: owner_name,
                address: owner_email
            },
            subject: "Teste envio de email",

            html: `
                <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                <p>Você solicitou uma viagem para <strong>${trip.destination}</strong> no periodo entre o dia <strong>${formatedStartsDate} a ${formatedEndsDate}</strong></p>
                <p></p>
                <p>Para confirmar sua viagem, clique no link abaixo</p>
                <p></p>
                <a href="${confirmLinktrip}">Confirmar Viagem</a>
                <p></p>
                <p></p>
                <p>Caso você não saiba do que se trata esse email apenas ignore</p>
                </div>
            `.trim()
        })
        

        console.log(nodemailer.getTestMessageUrl(message))
        return reply.status(201).send({message: "Trip created with sucess", data: trip.id})
    })
}

