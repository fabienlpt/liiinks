"use client";
import Header from "@/components/header";
import { AuthContext } from "@/lib/AuthContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { FaEdit } from "react-icons/fa";

export default function MyAccount() {
  const { user } = useContext(AuthContext);

  const [mainColor, setMainColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [fontChoice, setFontChoice] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  useEffect(() => {
    if (user) {
      setMainColor(user.mainColor);
      setBackgroundColor(user.backgroundGradient);
      setFontChoice(user.fontChoice);
      setAvatarPreview(user.avatar);
      console.log(user.avatar);
    }
  }, [user]);

  const onSelectImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  const renderAvatar = () => {
    if (avatarPreview) {
      return (
        <Image
          src={avatarPreview}
          alt="Avatar Preview"
          width={100}
          height={100}
          style={{ cursor: "pointer" }}
        />
      );
    } else {
      const usernameInitial = user?.username.charAt(0).toUpperCase();
      return <span>{usernameInitial}</span>;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Link href="/" className="hover:text-gray-400">
        Liiinks
      </Link>
      <div className="w-[80%] bg-white rounded-xl my-12">
        <form
          onSubmit={handleSubmit}
          className="w-2/3 bg-white rounded mx-auto"
        >
          <div className="flex flex-col items-center">
            <h1 className="mb-8">Préférences</h1>

            <label className="flex gap-4 flex-col items-center">
              <p>Avatar</p>
              <div
                className={`relative flex items-center justify-center rounded-full bg-gray-200 border border-[#3C3C3C] overflow-hidden ${
                  isHovered ? "hovered" : ""
                }`}
                style={{ width: 100, height: 100, cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  (
                    document.querySelector(
                      'input[type="file"]'
                    ) as HTMLInputElement
                  ).click();
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {renderAvatar()}
                {isHovered && (
                  <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                    <FaEdit className="text-2xl" />
                  </div>
                )}
              </div>
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={onSelectImage}
              style={{ display: "none" }}
            />

            <label className="flex gap-4 flex-col items-center">
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

            <label className="flex gap-4 flex-col items-center">
              <p>Couleur de texte</p>

              <ColorPicker
                value={mainColor}
                onChange={setMainColor}
                height={150}
                width={150}
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

            <label className="flex gap-4 flex-col items-center">
              <p>Couleur de fond</p>
              <ColorPicker
                value={backgroundColor}
                onChange={setBackgroundColor}
                height={150}
                width={150}
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

            <button
              className="bg-blue-500 py-1 px-4 rounded text-white my-2"
              type="submit"
            >
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
