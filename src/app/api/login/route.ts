import { base, transport, emailTemplate } from "../config";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const email = data.email;

    // const token = makeToken(email);

    const mailOptions = {
      from: "Fabien Lapert <no.reply.liiinks@gmail.com>",
      to: email,
      subject: "Your Magic Link",
      html: emailTemplate(`http://localhost:3000/signup`),
    };

    await new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (error) => {
        if (error) {
          console.error("Erreur lors de l'envoi de l'e-mail :", error);
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
    return new Response("Magic link sent.", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'envoi de l'e-mail :",
      error
    );
    return new Response(
      "Une erreur s'est produite lors de l'envoi de l'e-mail.",
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
