import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Location01FreeIcons,
  PhoneCall,
  InstagramIcon,
  WhatsappIcon,
  NewTwitterIcon,
  Linkedin02Icon,
  Copy01FreeIcons,
} from "@hugeicons/core-free-icons";

interface StaticBioCardProps {
  name: string;
  username: string;
  role: string;
  location: string;
  phone: string;
  bio: string;
  coverImage: string;
  profileImage: string;
  instagram: string;
  whatsapp: string;
  twitter: string;
  linkedin: string;
}

export default function StaticBioCard({
  name,
  username,
  role,
  location,
  phone,
  bio,
  coverImage,
  profileImage,
  instagram,
  whatsapp,
  twitter,
  linkedin,
}: StaticBioCardProps) {
  return (
    <div className="w-80 rounded-4xl p-2.5 shadow-2xl shadow-black/20 overflow-hidden bg-white">
      <div className="relative mb-10">
        <div className="relative w-full aspect-[3/1] rounded-3xl overflow-hidden bg-black/3">
          <Image
            src={coverImage}
            alt="Cover"
            fill
            className="object-cover"
          />
        </div>
        <Image
          src={profileImage}
          alt="Profile"
          width={1000}
          height={1000}
          className="w-20 border-4 border-white absolute left-3 -bottom-8 h-auto rounded-full"
        />
      </div>
      <div className="flex flex-col px-3 pb-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <div className="flex flex-col">
              <h1 className="font-bold text-lg">{name}</h1>
              <p className="text-black/50 text-xs">@{username}</p>
              <p className="text-black/50 font-medium mt-1 text-sm">{role}</p>
            </div>
            <div className="flex flex-col gap-1.5 sm:items-end">
              <div className="bg-black/3 w-fit flex gap-1.5 items-center text-xs font-medium pr-2.5 rounded-full p-0.5">
                <div className="bg-black/3 p-1.5 rounded-full">
                  <HugeiconsIcon
                    icon={Location01FreeIcons}
                    size={14}
                    color="currentColor"
                    strokeWidth={1.8}
                  />
                </div>
                {location}
              </div>
              <div className="bg-black/3 w-fit flex gap-1.5 items-center text-xs font-medium pr-2.5 rounded-full p-0.5">
                <div className="bg-black/3 p-1.5 rounded-full">
                  <HugeiconsIcon
                    icon={PhoneCall}
                    size={14}
                    color="currentColor"
                    strokeWidth={1.8}
                  />
                </div>
                {phone}
              </div>
            </div>
          </div>
          <div className="bg-black/3 rounded-2xl w-full p-2.5">
            <p className="text-black/75 text-xs font-medium leading-relaxed">
              {bio}
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-2.5 gap-1.5">
          <div className="bg-black/3 items-center p-0.5 rounded-full w-full flex justify-between">
            <div className="bg-black/3 p-1.5 rounded-full">
              <HugeiconsIcon
                icon={InstagramIcon}
                size={14}
                color="currentColor"
                strokeWidth={1.8}
              />
            </div>
            <p className="text-xs font-medium">{instagram}</p>
            <div className="bg-black p-1.5 rounded-full">
              <div className="w-3.5 h-3.5">
                <HugeiconsIcon
                  icon={Copy01FreeIcons}
                  size={14}
                  color="white"
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </div>
          <div className="bg-black/3 items-center p-0.5 rounded-full w-full flex justify-between">
            <div className="bg-black/3 p-1.5 rounded-full">
              <HugeiconsIcon
                icon={WhatsappIcon}
                size={14}
                color="currentColor"
                strokeWidth={1.8}
              />
            </div>
            <p className="text-xs font-medium">{whatsapp}</p>
            <div className="bg-black p-1.5 rounded-full">
              <div className="w-3.5 h-3.5">
                <HugeiconsIcon
                  icon={Copy01FreeIcons}
                  size={14}
                  color="white"
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </div>
          <div className="bg-black/3 items-center p-0.5 rounded-full w-full flex justify-between">
            <div className="bg-black/3 p-1.5 rounded-full">
              <HugeiconsIcon
                icon={NewTwitterIcon}
                size={14}
                color="currentColor"
                strokeWidth={1.8}
              />
            </div>
            <p className="text-xs font-medium">{twitter}</p>
            <div className="bg-black p-1.5 rounded-full">
              <div className="w-3.5 h-3.5">
                <HugeiconsIcon
                  icon={Copy01FreeIcons}
                  size={14}
                  color="white"
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </div>
          <div className="bg-black/3 items-center p-0.5 rounded-full w-full flex justify-between">
            <div className="bg-black/3 p-1.5 rounded-full">
              <HugeiconsIcon
                icon={Linkedin02Icon}
                size={14}
                color="currentColor"
                strokeWidth={1.8}
              />
            </div>
            <p className="text-xs font-medium">{linkedin}</p>
            <div className="bg-black p-1.5 rounded-full">
              <div className="w-3.5 h-3.5">
                <HugeiconsIcon
                  icon={Copy01FreeIcons}
                  size={14}
                  color="white"
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
