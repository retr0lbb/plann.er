import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { prisma } from "../lib/prisma";
import dayjs from "dayjs";
import { getMailClient } from "../lib/mail";
import nodemailer from "nodemailer"

export default async function CreateTrip(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post("/trip", {
        schema: {
            body: z.object({
                destination: z.string().min(3).max(200),
                starts_at: z.coerce.date(),
                ends_at: z.coerce.date(),

                //not implemented
                owner_name: z.string(),
                owner_email: z.string().email()
            })
        }
    } ,async (request, reply) => {
        const {destination, ends_at, starts_at, owner_email, owner_name} = request.body

        if(dayjs(starts_at).isBefore(new Date())){
            throw new Error("Invalid trip start date.")
        }

        if(dayjs(ends_at).isBefore(starts_at)){
            throw new Error("Invalid trip end date.")
        }

        const trip = await prisma.trip.create({
            data: {
                destination,
                ends_at,
                starts_at,
                slug: destination.toLocaleLowerCase()
            }
        })

        const mail = await getMailClient()

        const message = await mail.sendMail({
            from: {
                name: "Equipe Passegure",
                address: "fake@faker.xyz"
            },
            to: {
                name: owner_name,
                address: owner_email
            },
            subject: "Teste envio de email",

            html: "<h1>Sou furry</h1>"
        })
        

        console.log(nodemailer.getTestMessageUrl(message))
        return reply.status(201).send({message: "Trip created with sucess", data: trip.id})
    })
}

