import { MailerService } from "@/mailer/mailer.service";
import { base, makeToken } from "../config";
import {
  EnumMailTemplate,
  getMailSubject,
} from "@/mailer/models/mail-template.enum";

export async function GET(request: Request) {
  try {
    const username = request.url.includes("?")
      ? request.url.split("?")[1].split("=")[1]
      : null;

    const records = await base("users")
      .select({
        filterByFormula: `{username} = "${username}"`,
      })
      .all();
    let user: any = null;

    records.forEach((value) => {
      user = value.fields;
      user.links = [];
      user.socialMedias = [];
      user.id = value.getId();

      const socialMediasColumns = [
        "behance",
        "linkedIn",
        "instagram",
        "facebook",
        "twitter",
      ];

      socialMediasColumns.forEach((columnName) => {
        const columnValue = user[columnName];
        if (columnValue) {
          try {
            const linkObject = JSON.parse(columnValue);
            user.socialMedias.push(linkObject);
          } catch (error) {
            console.error(
              `Erreur lors de l'analyse de la colonne ${columnName} en tant qu'objet JSON :`,
              error
            );
          }
        }
      });

      const linksColumns = [
        "firstLink",
        "secondLink",
        "thirdLink",
        "fourthLink",
        "fifthLink",
      ];
      linksColumns.forEach((columnName) => {
        const columnValue = user[columnName];
        if (columnValue) {
          try {
            const linkObject = JSON.parse(columnValue);
            user.links.push(linkObject);
          } catch (error) {
            console.error(
              `Erreur lors de l'analyse de la colonne ${columnName} en tant qu'objet JSON :`,
              error
            );
          }
        }
      });
    });

    return Response.json({
      user,
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
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const records = await base("users").create(data);

    const responseBody = JSON.stringify(records);

    const mailerService = new MailerService();

    const token = makeToken(data.email);

    const params = {
      link: process.env.NEXT_PUBLIC_APP_URL + "/login?token=" + token,
      username: data.username,
    };

    await mailerService.sendEmail(
      EnumMailTemplate.Create_account_ok,
      data.email,
      getMailSubject(EnumMailTemplate.Create_account_ok),
      params
    );
    return new Response(responseBody, {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la création des données dans Airtable:",
      error
    );
    return new Response(
      "Une erreur s'est produite lors de la création des données dans Airtable.",
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
