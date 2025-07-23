import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (to: string, subject: string, name?: string) => {
  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7; padding: 30px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 40px;">
        <h2 style="color: #007bff; margin-bottom: 10px;">¡Hola ${name ?? to}!</h2>
        <p style="font-size: 16px; color: #333;">🎉 <strong>Bienvenido a <span style="color: #007bff;">Work Show</span></strong></p>
        <p style="font-size: 15px; color: #555;">
          Estamos muy felices de tenerte con nosotros. Esperamos que disfrutes tu experiencia y encuentres lo que estás buscando.
        </p>
        <p style="font-size: 15px; color: #555;">
          Si tienes alguna pregunta, sugerencia o necesitas ayuda, nuestro equipo estará encantado de ayudarte.
        </p>
        <div style="margin-top: 30px;">
          <p style="font-size: 15px; color: #333;">Gracias por registrarte,</p>
          <p style="font-weight: bold; font-size: 16px; color: #007bff;">— El equipo de Work Show</p>
        </div>
        <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #999; text-align: center;">
          Este correo fue enviado automáticamente. Por favor, no respondas a este mensaje.
        </p>
      </div>
    </div>
  `;

  const info = await transporter.sendMail({
    from: `"Work Show" <${process.env.EMAIL_USER}>`,
    to,
    subject: subject || "🎉 ¡Bienvenido a Work Show!",
    html: htmlContent,
  });

  console.log("email enviado", info.messageId);
};