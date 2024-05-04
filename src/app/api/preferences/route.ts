import { FieldSet } from "airtable";
import { base } from "../config";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    const userId = data.get("userId") as string;
    const mainColor = data.get("mainColor");
    const bio = data.get("bio");
    const backgroundGradient = data.get("backgroundColor");
    const fontChoice = data.get("fontChoice");
    const avatarFile = data.get("avatar") as File;

    const fieldsToUpdate = {
      bio: bio ?? "",
      mainColor: mainColor ?? "",
      backgroundGradient: backgroundGradient ?? "",
      fontChoice: fontChoice ?? "",
    } as FieldSet;

    if (avatarFile) {
      // récupérer l'ancien avatar pour le supprimer
      const userRecord = await base("users").find(userId);
      const oldAvatarUrl = userRecord.fields.avatar as string;
      if (oldAvatarUrl) {
        const oldAvatarPath = path.join(process.cwd(), "public", oldAvatarUrl);
        if (fs.existsSync(oldAvatarPath)) {
          fs.unlinkSync(oldAvatarPath);
        }
      }

      // enregistrer le nouvel avatar
      const publicDir = path.join(process.cwd(), "public");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      const avatarDir = path.join(publicDir, "avatars");
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
