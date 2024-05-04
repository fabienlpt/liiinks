import { FieldSet } from "airtable";
import { base } from "../config";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    const userId = data.get("userId") as string;
    const mainColor = data.get("mainColor");
    const backgroundGradient = data.get("backgroundColor");
    const fontChoice = data.get("fontChoice");
    const avatarFile = data.get("avatar") as File;

    const fieldsToUpdate = {
      mainColor: mainColor ?? "",
      backgroundGradient: backgroundGradient ?? "",
      fontChoice: fontChoice ?? "",
      avatar: "",
    } as FieldSet;

    if (avatarFile) {
      const avatarDir = path.join(process.cwd(), "public", "avatars");
      if (!fs.existsSync(avatarDir)) {
        fs.mkdirSync(avatarDir, { recursive: true });
      }
      const avatarFileName = `${userId}-${Date.now()}-${avatarFile.name}`;
      const avatarFilePath = path.join(avatarDir, avatarFileName);
      await fs.promises.writeFile(
        avatarFilePath,
        Buffer.from(await avatarFile.arrayBuffer())
      );
      const avatarUrl = `/avatars/${avatarFileName}`;
      fieldsToUpdate.avatar = avatarUrl;
    }

    const updatedRecords = await base("users").update([
      {
        id: userId,
        fields: fieldsToUpdate,
      },
    ]);

    const updatedUser = updatedRecords[0].fields;

    console.log("Préférences mises à jour :", updatedUser);
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
