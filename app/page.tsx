'use client';

import Link from "next/link";
import { useState } from "react";
import StaticBioCard from "@/components/StaticBioCard";
import SupportModal from "@/components/SupportModal";
import { HugeiconsIcon } from "@hugeicons/react";
import { NewTwitterIcon } from "@hugeicons/core-free-icons";

export default function Home() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full overflow-x-hidden items-center bg-[#F9F9F9] pt-5">
      <nav className="max-w-2xl z-60 flex items-center justify-between w-[90%] md:w-full border-5 border-black/5 mx-4 fixed md:mx-auto rounded-full pl-3 md:pl-4 bg-white shadow-xl shadow-black/5 p-1.5 md:p-2">
        <h1 className="text-lg md:text-xl font-extrabold">Veneer.</h1>
        <ul className="hidden md:flex items-center gap-5">
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="font-semibold text-black/60 hover:text-black transition-all duration-300"
          >
            Support
          </button>
          <a
            className="font-semibold text-black/60 hover:text-black transition-all duration-300"
            href="#"
          >
            Contact
          </a>
        </ul>
        <Link
          href="/auth"
          className="px-4 md:px-8 py-1.5 md:py-2 text-sm md:text-base rounded-full bg-black text-white hover:bg-black/90 transition-all font-medium"
        >
          Get Started
        </Link>
      </nav>
      <div className="h-auto min-h-screen flex w-full custom-scroll relative overflow-hidden flex-col items-center pb-20">
        <div className="pt-24 md:pt-32 max-w-2xl px-4">
          <h1 className="text-3xl md:text-5xl text-center font-semibold max-w-2xl text-black/70 mb-4">
            Create Your Beautiful Bio Card and Share it With The World.
          </h1>
          <p className="text-black/50 mt-1 max-w-2xl px-4 md:px-8 text-center text-sm md:text-[15px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            odit velit! Eius quaerat, at aliquid suscipit odit molestiae laborum
            quasi magni nesciunt! Excepturi, incidunt dolore ullam expedita
            rerum possimus commodi?
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth"
              className="px-6 md:px-8 py-2 md:py-2.5 text-sm md:text-base hover:scale-105 mt-5 rounded-full bg-black border border-black/10 text-white hover:bg-black/90 transition-all font-medium"
            >
              Create Your Bio Card
            </Link>
          </div>
          <div className="relative mt-8 md:mt-4 h-[500px] md:h-[600px] flex items-center justify-center scale-75 md:scale-100">
            {/* Left Card - Rotated */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-12 opacity-85 hover:opacity-100 hover:rotate-0 transition-all duration-700 ease-out hover:scale-105 hover:z-30 card-float-1">
              <StaticBioCard
                name="Sarah Chen"
                username="sarahdesigns"
                role="UI/UX Designer"
                location="San Francisco, CA"
                phone="+1 415 555 0123"
                bio="Crafting beautiful digital experiences. Passionate about minimalist design and user-centered solutions."
                coverImage="/image.png"
                profileImage="/pfp.png"
                instagram="@sarahdesigns"
                whatsapp="+14155550123"
                twitter="@sarahchen"
                linkedin="sarah-chen"
              />
            </div>

            {/* Center Card - Main Focus */}
            <div className="relative z-20 hover:scale-105 transition-all duration-500 ease-out card-float-2">
              <StaticBioCard
                name="Ariyo Eyitayo"
                username="that_creative"
                role="Software Engineer"
                location="Jos, Nigeria"
                phone="+234 808 678 9876"
                bio="I'm the creator of this app. Building modern, fast, and scalable digital products that make a difference."
                coverImage="/image.png"
                profileImage="/pfp.png"
                instagram="@_that_creative_"
                whatsapp="+2349064472995"
                twitter="@_that_creative_"
                linkedin="ariyo-eyitayo"
              />
            </div>

            {/* Right Card - Rotated */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-12 opacity-85 hover:opacity-100 hover:rotate-0 transition-all duration-700 ease-out hover:scale-105 hover:z-30 card-float-3">
              <StaticBioCard
                name="Marcus John"
                username="marcusdev"
                role="Full Stack Developer"
                location="London, UK"
                phone="+44 20 7946 0958"
                bio="Turning coffee into code. Specializing in React, Node.js, and building awesome web applications."
                coverImage="/image.png"
                profileImage="/pfp.png"
                instagram="@marcusdev"
                whatsapp="+442079460958"
                twitter="@marcusjohnson"
                linkedin="marcus-johnson"
              />
            </div>
          </div>
        </div>
        <div className="absolute h-60 bottom-0 bg-linear-to-b from-transparent via-white/95 to-white w-full z-50"></div>
      </div>
      <div className="bg-black rounded-t-[50px] md:rounded-t-[100px] pb-0 p-6 md:p-14 w-full">
        <div className="h-64 md:h-96 w-full overflow-hidden relative rounded-[30px] md:rounded-[50px] bg-img">
          <div className="bg-black/70 z-10 w-full h-full absolute"></div>
          <div className="flex flex-col gap-2 md:gap-3 absolute w-full h-full justify-center items-center z-30 px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center">
              Like What You See?
            </h1>
            <p className="text-white max-w-xl text-xs md:text-sm mx-auto text-center px-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste a
              est fugiat, ducimus numquam minus ex temporibus quisquam!
              Dignissimos obcaecati error suscipit officiis nobis doloribus
              assumenda enim sapiente consequuntur voluptatibus.
            </p>
            <button 
              onClick={() => setIsSupportModalOpen(true)}
              className="px-8 md:px-12 py-2 md:py-2.5 text-sm md:text-base cursor-pointer hover:scale-105 mt-3 md:mt-5 rounded-full bg-white border border-white/10 text-black hover:bg-white/90 transition-all font-medium"
            >
              Support Us
            </button>
          </div>
        </div>
        <div className="border-t border-t-white/7 flex flex-col md:flex-row items-center justify-between w-full mt-6 md:mt-8 p-3 md:p-5 gap-3 md:gap-0">
          <h1 className="text-lg md:text-xl text-white font-extrabold">Veneer.</h1>
          <p className="text-white font-medium text-xs md:text-sm text-center">
            @ {new Date().getFullYear()} Veneer. All rights reserved.
          </p>
          <a href="https://x.com/_that_creative_" target="_blank" className="hover:scale-103 transition-all duration-300">
            <HugeiconsIcon
              icon={NewTwitterIcon}
              size={14}
              color="white"
              strokeWidth={1.8}
            />
          </a>
        </div>
      </div>
      
      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </div>
  );
}
