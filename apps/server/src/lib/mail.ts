import nodemailer from "nodemailer";


export async function getMailClient() {
    const accont = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: accont.user,
            pass: accont.pass
        },
    })

    return transporter
}