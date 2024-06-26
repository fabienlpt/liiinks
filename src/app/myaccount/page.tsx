"use client";
import Header from "@/components/header";
import Preview from "@/components/preview";
import { AuthContext } from "@/lib/AuthContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { FaEdit } from "react-icons/fa";

export default function MyAccount() {
  const { user } = useContext(AuthContext);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const [mainColor, setMainColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [fontChoice, setFontChoice] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("userId", user?.id ?? "");
    formData.append("bio", bio);
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
      setBio(user.bio);
      setAvatarPreview(user.avatar);
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
    <div className="min-h-screen flex">
      <div
        className="w-[70%] mx-auto pr-8 flex flex-col items-center justify-center pl-8 pt-4"
        style={{
          background: backgroundColor,
          color: mainColor,
          fontFamily: fontChoice,
        }}
      >
        {user ? (
          <Preview
            avatar={avatarPreview ?? user.avatar}
            username={user.username}
            bio={bio}
            socialMedias={user.socialMedias}
            links={user.links}
            color={mainColor}
          />
        ) : (
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Loading...
          </h2>
        )}
      </div>
      <div className="w-[30%] bg-white rounded-xl p-4 flex flex-col items-center">
        <Link href="/" className="hover:text-gray-400 text-2xl font-bold">
          Liiinks
        </Link>
        <div className="w-full bg-white rounded-xl my-12">
          <div className="flex items-center justify-around w-full">
            <Link
              href="/myaccount"
              className="hover:text-gray-400 w-1/2 text-center border border-b-0 border-l-0 rounded-t-lg p-2"
            >
              Préférences
            </Link>

            <Link
              href="/myaccount/links"
              className="hover:text-gray-400 w-1/2 text-center border border-t-0 border-r-0 rounded-b-lg p-2"
            >
              Mes liens
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white rounded mx-auto mt-8"
          >
            <div className="flex flex-col items-center w-full">
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
                <p>Bio</p>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full border"
                />
              </label>

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
    </div>
  );
}
