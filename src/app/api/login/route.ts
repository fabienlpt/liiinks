import { base } from "../config";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const email = data.email;

    return new Response(email, {
      status: 200,
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
