import { base } from "../config";

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    const userId = data.get("userId");
    const mainColor = data.get("mainColor");
    const backgroundGradient = data.get("backgroundColor");
    const fontChoice = data.get("fontChoice");
    const avatar = data.get("avatar");

    const fieldsToUpdate = {
      mainColor,
      backgroundGradient,
      fontChoice,
      avatar: "",
    };

    if (avatar) {
      const avatarUrl = "";
      fieldsToUpdate.avatar = avatarUrl;
    }

    const updatedRecords = await base("users").update([
      {
        id: userId,
        fields: fieldsToUpdate,
      },
    ]);

    const updatedUser = updatedRecords[0].fields;

    return new Response(JSON.stringify({ user: updatedUser }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour des préférences :", error);
    return new Response(
      "Une erreur s'est produite lors de la mise à jour des préférences.",
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
