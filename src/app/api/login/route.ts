import jwt, { JwtPayload } from "jsonwebtoken";
import { base, transport, emailTemplate, makeToken } from "../config";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const email = data.email;

    const token = makeToken(email);

    const mailOptions = {
      from: "Fabien Lapert <no.reply.liiinks@gmail.com>",
      to: email,
      subject: "Your Magic Link",
      html: emailTemplate(`http://localhost:3000/login?token=${token}`),
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

export const GET = async (request: Request) => {
  try {
    const data = await request.json();
    const token = data.token;

    const decoded = jwt.verify(token, "shhhhh") as JwtPayload;
    const { expirationDate, email } = decoded;

    if (!decoded || !email || !expirationDate) {
      return new Response("Invalid auth credentials.", {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (expirationDate < new Date()) {
      return new Response("Token expiré", {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const records = await base("users")
      .select({
        filterByFormula: `{email} = "${email}"`,
      })
      .all();

    const responseBody = JSON.stringify(records);
    return new Response(responseBody, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données depuis Airtable:",
      error
    );
    return new Response(
      "Une erreur s'est produite lors de la récupération des données depuis Airtable.",
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
