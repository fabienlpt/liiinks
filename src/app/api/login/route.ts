import jwt, { JwtPayload } from "jsonwebtoken";
import { base, makeToken } from "../config";
import { MailerService } from "@/mailer/mailer.service";
import {
  EnumMailTemplate,
  getMailSubject,
} from "@/mailer/models/mail-template.enum";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const email = data.email;

    let users = await base("users")
      .select({
        filterByFormula: `{email} = "${email}"`,
      })
      .all();

    if (users.length === 0) {
      return new Response("Cet email n'est relié à aucun compte", {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const mailerService = new MailerService();

    const token = makeToken(email);

    const params = {
      link: process.env.NEXT_PUBLIC_APP_URL + "/login?token=" + token,
    };

    await mailerService.sendEmail(
      EnumMailTemplate.Magic_link,
      email,
      getMailSubject(EnumMailTemplate.Magic_link),
      params
    );
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
    const token = request.url.includes("?")
      ? request.url.split("?")[1].split("=")[1]
      : null;

    if (!token) {
      return new Response("Token non fourni", {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
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
