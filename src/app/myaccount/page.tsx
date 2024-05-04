"use client";
import Header from "@/components/header";
import { AuthContext } from "@/lib/AuthContext";
import axios from "axios";
import { useContext, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";

export default function MyAccount() {
  const { user } = useContext(AuthContext);
  const [mainColor, setMainColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [fontChoice, setFontChoice] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("userId", user?.id ?? "");
    formData.append("mainColor", mainColor);
    formData.append("backgroundColor", backgroundColor);
    formData.append("fontChoice", fontChoice);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    await axios.post("/api/preferences", formData);
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Header />
      <div className="w-[80%] bg-white rounded-xl my-12">
        <form
          onSubmit={handleSubmit}
          className="w-2/3 bg-white rounded mx-auto"
        >
          <h1 className="mb-8">Préférences</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-4">
              <label>
                <p>Couleur de texte</p>

                <ColorPicker
                  value={mainColor}
                  onChange={setMainColor}
                  hideInputs
                  hideEyeDrop
                  hideOpacity
                  hideInputType
                  hideAdvancedSliders
                  hideColorGuide
                  hideGradientControls
                  hidePresets
                  hideControls
                />
              </label>
            </div>

            <div className="flex gap-4">
              <label>
                <p>Couleur de fond</p>
                <ColorPicker
                  value={backgroundColor}
                  onChange={setBackgroundColor}
                  hideInputs
                  hideEyeDrop
                  hideOpacity
                  hideInputType
                  hideAdvancedSliders
                  hideColorGuide
                  hideGradientControls
                  hidePresets
                />
              </label>
            </div>

            <div className="flex gap-4">
              <label>
                <p>Police d&apos;écriture</p>
                <select
                  value={fontChoice}
                  onChange={(e) => setFontChoice(e.target.value)}
                >
                  <option value="Arial">Arial</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Helvetica">Helvetica</option>
                </select>
              </label>
            </div>

            {/* Avatar file input */}
            <div className="flex gap-4">
              <label>
                <p>Avatar</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>
          </div>

          <button
            className="bg-blue-500 py-1 px-4 rounded text-white my-2"
            type="submit"
          >
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
}
