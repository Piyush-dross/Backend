import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID
    }
})

let transporterReadyPromise;

async function ensureTransporterReady() {
    if (!transporterReadyPromise) {
        transporterReadyPromise = transporter.verify()
            .then(() => {
                console.log("Email transporter is ready to send emails");
            })
            .catch((err) => {
                transporterReadyPromise = undefined;
                throw new Error(`Email transporter verification failed: ${err.message}`);
            });
    }

    await transporterReadyPromise;
}


export async function sendEmail({ to, subject, html, text='' }) {
    await ensureTransporterReady();

    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    };

    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details);
    return 'email sent successfully,to'+to
}
