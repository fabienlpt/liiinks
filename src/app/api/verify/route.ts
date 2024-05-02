import jwt, { JwtPayload } from "jsonwebtoken";
import { base } from "../config";
import { cookies } from "next/headers";

export const GET = async (request: Request) => {
  try {
    let token = request.url.includes("?")
      ? request.url.split("?")[1].split("=")[1]
      : null;

    if (!token) {
      let cookie = cookies().get("token");
      if (cookie) {
        token = cookie.value;
      }
    }

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

    let user = null;

    records.forEach((value) => {
      user = value.fields;
      user.id = value.getId();
    });

    cookies().set("token", token);

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
};
