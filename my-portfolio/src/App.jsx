import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './components/GlassCard';
import PhotoGallery from './components/PhotoGallery';
import TechOrbit from './components/TechOrbit';
import TokyoTime from './components/TokyoTime';
import { FaInstagram } from 'react-icons/fa';
import { FaEnvelope, FaCheck, FaPhone} from "react-icons/fa";
import { useState } from "react";
import { useIsMobile } from './hooks/useIsMobile';
import { useLanguage } from './context/LanguageContext';
import { data as enData } from './data/en';
import { data as jaData } from './data/ja';
import profilePhoto from './assets/akihiro.jpg';
import profilePhotoBig from './assets/akihirobig.jpg';
import photo1 from './assets/gallery/photo1.jpg';
import photo2 from './assets/gallery/photo2.jpg';
import photo3 from './assets/gallery/photo3.jpg';

// 1. Define Animation Variants for the staggered load
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each card
      delayChildren: 0.3,    // Wait before starting
    },
  },
};

const itemVariants = {
  hidden: { y: 1500, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 50, damping: 15 },
  },
};

const headerVariants = {
  hidden: { x: -1000, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 30, damping: 10 },
  },
};

const galleryPhotos = [
  { src: photo1, alt: '街頭演説' },
  { src: photo2, alt: '地域イベント' },
  { src: photo3, alt: '市民との対話' },
];

function App() {
  const data = jaData;
  const isMobile = useIsMobile();
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      setEmailCopied(true);

      setTimeout(() => {
        setEmailCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const [phoneCopied, setPhoneCopied] = useState(false);

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(data.phone);
      setPhoneCopied(true);

      setTimeout(() => {
        setPhoneCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy phone number:", err);
    }
  };

  
  return (
    <div className="min-h-screen bg-sky-100 text-neutral-200 relative font-sans selection:bg-purple-500/30">

      {/* --- BACKGROUND ORBITS --- */}
      {[0, isMobile ? 1 : null].map((instance, i) => {
        if (instance === null) return null;

        return (
          <React.Fragment key={i}>
            {/* Top/Primary Orbit Set */}
            <div className={`absolute inset-0 pointer-events-none overflow-hidden ${isMobile && i === 1 ? 'top-1/2 h-1/2' : isMobile ? 'top-0 h-1/2' : ''}`}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className={`absolute transform-gpu ${isMobile
                  ? "-top-[20%] -left-[20%] w-[140%] h-[140%]"
                  : "-top-[100%] -left-[100%] w-[300%] h-[300%]"
                  }`}
                style={{ willChange: "transform" }}
              >
                {/* Pink Glow */}
                <div
                  className="absolute top-1/4 left-1/2 -translate-x-1/2 rounded-full"
                  style={{
                    height: isMobile ? "600px" : "1500px",
                    width: isMobile ? "600px" : "1500px",
                    background: 'radial-gradient(circle, rgba(83, 253, 77, 0.15) 0%, transparent 70%)'
                  }}
                />
                {/* Red Glow */}
                <div
                  className="absolute top-1/3 left-1/3 rounded-full"
                  style={{
                    height: isMobile ? '600px' : '1500px',
                    width: isMobile ? '600px' : '1500px',
                    background: 'radial-gradient(circle, rgba(45, 101, 255, 0.15) 0%, transparent 70%)'
                  }}
                />
              </motion.div>
            </div>

            {/* Bottom/Secondary Orbit Set */}
            <div className={`absolute inset-0 pointer-events-none overflow-hidden ${isMobile && i === 1 ? 'top-1/2 h-1/2' : isMobile ? 'top-0 h-1/2' : ''}`}>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className={`absolute transform-gpu ${isMobile
                  ? "-bottom-[20%] -right-[20%] w-[140%] h-[140%]"
                  : "-bottom-[100%] -right-[100%] w-[300%] h-[300%]"
                  }`}
                style={{ willChange: "transform" }}
              >
                {/* Blue Glow */}
                <div
                  className="absolute bottom-1/4 left-1/2 -translate-x-1/2 rounded-full"
                  style={{
                    height: isMobile ? '600px' : '1500px',
                    width: isMobile ? '600px' : '1500px',
                    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)'
                  }}
                />
                {/* Cyan Glow */}
                <div
                  className="absolute bottom-1/2 left-1/4 rounded-full"
                  style={{
                    height: isMobile ? '600px' : '1500px',
                    width: isMobile ? '600px' : '1500px',
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)'
                  }}
                />
              </motion.div>
            </div>
          </React.Fragment>
        );
      })}

      {/* --- CONTENT LAYER --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl relative z-10 p-8 py-20"
      >
      
        {/* MOBILE ______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________*/}
        {isMobile ? (
          <>
            <motion.header variants={headerVariants} className="mb-16">
            <h1 className="text-7xl font-bold tracking-tighter text-neutral-800">
              {/* Wrap the last name and its glow in a relative container */}
              <p className="text-xl text-neutral-800 tracking-normal font-normal">
                <span>{data.furigana_lastname}</span>
              </p>
              <span className="relative inline-block">
                <span
                  className="animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent inline-block py-2"
                >
                  {data.lastname}
                </span>

                {/* Matching Glow Layer - now perfectly anchored to the span above */}
                <span
                  className="absolute inset-0 animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent inline-block py-2 blur-lg opacity-30 scale-110"
                  aria-hidden="true"
                >
                  {data.lastname}
                </span>
              </span>

              <p>
                {" "}{data.firstname}
              </p>
            </h1>
            <p className="text-xl text-neutral-800 font-mono mt-4 mb-4">{data.title}</p>
          </motion.header>
          </>
        
        ) : ( 
        
          <>
          {/* DESKTOP ______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________*/}
            <motion.header variants={headerVariants} className="mb-16">
            <h1 className="text-8xl font-bold tracking-tighter text-neutral-800">
              {/* Wrap the last name and its glow in a relative container */}
              <p className="text-2xl text-neutral-800 tracking-normal font-normal">
                <span>{data.furigana_lastname}</span>
              </p>
              <span className="relative inline-block">
                <span
                  className="animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent inline-block py-2"
                >
                  {data.lastname}
                </span>

                {/* Matching Glow Layer - now perfectly anchored to the span above */}
                <span
                  className="absolute inset-0 animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent inline-block py-2 blur-lg opacity-15 scale-110"
                  aria-hidden="true"
                >
                  {data.lastname}
                </span>
              </span>

              {" "}{data.firstname}
            </h1>
            <p className="text-2xl text-neutral-800 font-mono mt-4 mb-4">{data.title}</p>
          </motion.header>
          </>
        
        )}


        {/* MOBILE ______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________*/}
        {isMobile ? (
          <>
            {/* The Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              {/* Profile photo (2x2 Square) */}
              <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 aspect-square">
                <GlassCard className="h-full flex flex-col justify-center p-10">
                  <img src={profilePhoto} alt="Profile photo" className="w-full h-full object-cover rounded-2x1 scale-135" 
                    ></img>
                </GlassCard>
              </motion.div>

              {/* About Card (2x2 Square) */}
              <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2">
                <GlassCard className="h-full flex flex-col justify-center py-7 px-5 border-blue-500/100">
                  <h2 className="text-3xl font-bold text-neutral-800 mb-6 uppercase tracking-tighter">{data.about.heading}
                    <div className="relative mt-1 w-14">
                          {/* Base bar */}
                          <div className="h-1.5 w-18 animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto]" />
                          
                          {/* Glow layer */}
                          <div
                            className="absolute inset-0 h-1.5 w-18 animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto] blur-sm opacity-30"
                            aria-hidden="true"
                          />
                        </div>
                  </h2>
                  <div className="text-neutral-800 leading-relaxed text-lg space-y-3">
                    {data.about.body.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

            

              {/* Vision Card (2x2 Square) */}
              <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-3">
                <GlassCard className="h-full flex flex-col justify-center py-7 px-5 border-green-500/100">
                  <h2 className="text-3xl font-bold text-neutral-800 mb-6 uppercase">{data.vision.heading}
                  <div className="relative mt-1 w-14">
                      {/* Base bar */}
                      <div className="h-1.5 w-18 animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto]" />
                      
                      {/* Glow layer */}
                      <div
                        className="absolute inset-0 h-1.5 w-18 animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto] blur-sm opacity-30"
                        aria-hidden="true"
                      />
                    </div>
                  </h2>
                  <h3 className="text-xl font-bold text-neutral-800 mb-6 uppercase">{data.vision.subheading}<div /></h3>

                  <div className="text-neutral-800 leading-relaxed text-lg space-y-3">
                    {data.vision.body.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Policy Card (2x2 Square) */}
              <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-5">
                <GlassCard className="h-full flex flex-col justify-center py-7 px-5 border-cyan-500/100">
                  <h2 className="text-3xl font-bold text-neutral-800 mb-6 uppercase">{data.policy.heading}
                    <div className="relative mt-1 w-14">
                      {/* Base bar */}
                      <div className="h-1.5 w-18 animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto]" />
                      
                      {/* Glow layer */}
                      <div
                        className="absolute inset-0 h-1.5 w-18 animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto] blur-sm opacity-30"
                        aria-hidden="true"
                      />
                    </div>
                  </h2>
                  <h3 className="text-xl font-bold text-neutral-800 mb-6 uppercase">{data.policy.subheading}<div /></h3>

                  <div className="text-neutral-800 leading-relaxed text-lg space-y-3">
                    {data.policy.body.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                  <table className="w-full text-sm mt-4">
                    <thead>
                      <tr className="border-b border-black/10">
                        <th className="text-left py-2 pr-4 font-bold text-neutral-800">{data.policy.tableHeadings.pillar}</th>
                        <th className="text-left py-2 pr-4 font-bold text-neutral-800">{data.policy.tableHeadings.theme}</th>
                        <th className="text-left py-2 font-bold text-neutral-800">{data.policy.tableHeadings.role}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.policy.table.map((row) => (
                        <tr key={row.pillar} className="border-b border-black/5">
                          <td className="py-2 pr-4 text-neutral-800">{row.pillar}</td>
                          <td className="py-2 pr-4 text-neutral-800">{row.theme}</td>
                          <td className="py-2 text-neutral-800">{row.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </GlassCard>
              </motion.div>

                {/* Contact & Social (combined card) */}
                {/* Contact & Social (combined card) */}
                <motion.div variants={itemVariants} className="aspect-square">
                  <GlassCard className="h-full p-0 overflow-hidden border-blue-500/100">
                    <div className="grid grid-cols-2 grid-rows-2 h-full divide-black/10">

                      {/* Email - spans full width on top */}
                      <button
                        onClick={copyEmail}
                        className="col-span-2 group relative z-20 flex flex-col items-center justify-center gap-1 p-4 text-center cursor-pointer hover:bg-blue-500/5 transition-colors border-b border-black/10"
                      >
                        {emailCopied ? (
                          <FaCheck className="w-20 h-20 text-green-500" />
                        ) : (
                          <FaEnvelope className="w-20 h-20 text-blue-500 group-hover:scale-110 transition-transform" />
                        )}
                        <span className="text-base font-semibold text-neutral-800">
                          {emailCopied ? "コピーしました！" : "お問い合わせ"}
                        </span>
                        <span className="text-m text-neutral-500 break-all">
                          <p>nakgawa@shibuyasyoukai.com</p>
                        </span>
                      </button>

                      {/* Instagram - bottom left */}
                      <a
                        href="https://www.instagram.com/nakagawa.akihiro_/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative z-20 flex flex-col items-center justify-center gap-2 p-3 text-center hover:bg-pink-500/5 transition-colors border-r border-black/10"
                      >
                        <FaInstagram className="w-15 h-15 text-pink-500 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-neutral-800 line-clamp-1">
                          {data.insta}
                        </span>
                        <span className="text-sm text-neutral-500 break-all line-clamp-1">
                          @nakagawa.akihiro_
                        </span>
                      </a>

                      {/* Phone - bottom right */}
                      <button
                        onClick={copyPhone}
                        className="group relative z-20 flex flex-col items-center justify-center gap-2 p-3 text-center cursor-pointer hover:bg-green-500/5 transition-colors"
                      >
                        {phoneCopied ? (
                          <FaCheck className="w-15 h-15 text-green-500" />
                        ) : (
                          <FaPhone className="w-15 h-15 text-green-500 group-hover:scale-110 transition-transform" />
                        )}
                        <span className="text-sm font-semibold text-neutral-800 line-clamp-1">
                          {phoneCopied ? "コピーしました！" : "お問い合わせ"}
                        </span>
                        <span className="text-m text-neutral-500 break-all line-clamp-1">
                          {data.phone}
                        </span>
                      </button>

                    </div>
                  </GlassCard>
                </motion.div>

                {/* <motion.div variants={itemVariants} className="aspect-square">
                  <GlassCard className="h-full p-0 overflow-hidden group border-pink-500/100 hover:border-blue-500/50 transition-colors">
                    <a
                      href="https://www.instagram.com/nakagawa.akihiro_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-20 h-full w-full flex flex-col items-center justify-center gap-3 p-4 text-center"
                    >
                      <FaInstagram
                        className="w-30 h-30 text-pink-500"
                      />

                      <span className="text-xl font-semibold text-neutral-800">
                        {data.insta}
                      </span>
                    </a>
                  </GlassCard>
                </motion.div>

                <motion.div variants={itemVariants} className="aspect-square">
                  <GlassCard className="h-full p-0 overflow-hidden group border-blue-500/100">
                    <button
                      onClick={copyEmail}
                      className="relative z-20 h-full w-full flex flex-col items-center justify-center gap-4 p-4 text-center cursor-pointer"
                    >
                      {emailCopied ? (
                        <FaCheck className="w-24 h-24 text-green-500" />
                      ) : (
                        <FaEnvelope className="w-24 h-24 text-blue-500" />
                      )}

                      <span className="text-xl font-semibold text-neutral-800">
                        {emailCopied ? "コピーしました！" : "お問い合わせ"}
                      </span>

                      <span className="text-xl text-neutral-500 break-all">
                        {data.email}
                      </span>
                    </button>
                  </GlassCard>
                </motion.div>

                <motion.div variants={itemVariants} className="aspect-square">
                  <GlassCard className="h-full p-0 overflow-hidden group border-green-500/100">
                    <button
                      onClick={copyPhone}
                      className="relative z-20 h-full w-full flex flex-col items-center justify-center gap-4 p-4 text-center cursor-pointer"
                    >
                      {phoneCopied ? (
                        <FaCheck className="w-22 h-22 text-green-500" />
                      ) : (
                        <FaPhone className="w-22 h-22 text-green-500" />
                      )}

                      <span className="text-xl font-semibold text-neutral-800">
                        {phoneCopied ? "コピーしました！" : "お電話でのお問い合わせ"}
                      </span>

                      <span className="text-xl text-neutral-500 break-all">
                        {data.phone}
                      </span>
                    </button>
                  </GlassCard>
                </motion.div> */}


              {/* <motion.div variants={itemVariants} className="md:col-span-2 h-full">
                <GlassCard className="h-full flex flex-col justify-between p-8">
                  <div>
                      <h3 className="text-lg font-bold text-neutral-800 uppercase">{data.priorities.heading}</h3>
                      <div className="h-1 w-14 bg-blue-500 mt-1" />
                      <div className="flex justify-between items-end mb-2 mt-6">
                        <h3 className="text-[18px] font-mono text-neutral-800 uppercase tracking-[0.2em]">{data.priorities.items[0].title}</h3>
                        <span className="text-[14px] font-mono text-neutral-800 uppercase tracking-[0.2em]">{data.priorities.items[0].status}</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full relative">
                        <div
                          className="h-full w-[50%] animate-rgb-wave rounded-full bg-gradient-to-r from-red-500 via-green-500 via-blue-500 via-purple-500 to-red-500 bg-[length:200%_auto] 
                relative z-10"
                          style={{
                            boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 30px rgba(168, 85, 247, 0.3)'
                          }}
                        />



                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex justify-between items-end mb-2">
                      <h3 className="text-[18px] font-mono text-neutral-800 uppercase tracking-[0.2em]">{data.priorities.items[1].title}</h3>
                      <span className="text-[14px] font-mono text-neutral-800 uppercase tracking-[0.2em]">{data.priorities.items[1].status}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-neutral-600" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div variants={itemVariants} className="aspect-square">
                <GlassCard className="h-full flex flex-col items-center justify-center">
                  <TokyoTime />
                </GlassCard>
              </motion.div>
              
              <motion.div variants={itemVariants} className="md:col-span-2">
                <GlassCard className="h-full flex items-center p-8">
                  <p className="text-s font-mono text-neutral-600 leading-relaxed uppercase">
                    Focused on the world's biology, technology, problems, and solutions.
                  </p>
                </GlassCard>
              </motion.div> */}
            </div>
          </>
        
        ) : (
              <>
                {/* DESKTOP _________________________________________________________________________________________________________________________________________________________________________________________________________________ */}
                {/* The Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                  {/* Profile photo (2x2 Square) */}
                  <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-3">
                    <GlassCard className="h-full flex flex-col justify-center p-10">
                      <img src={profilePhotoBig} alt="Profile photo" className="w-full h-full object-cover rounded-2x1 scale-120" 
                        ></img>
                    </GlassCard>
                  </motion.div>

                  {/* About Card (2x2 Square) */}
                  <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-3">
                    <GlassCard className="h-full flex flex-col justify-center p-10 border-blue-500/100">
                      <h2 className="text-3xl font-bold text-neutral-800 mb-6 uppercase">{data.about.heading}
                        <div className="relative mt-1 w-14">
                          {/* Base bar */}
                          <div className="h-1.5 w-18 animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto]" />
                          
                          {/* Glow layer */}
                          <div
                            className="absolute inset-0 h-1.5 w-18 animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto] blur-sm opacity-30"
                            aria-hidden="true"
                          />
                        </div>
                      </h2>

                      <div className="text-neutral-800 leading-relaxed text-lg space-y-3">
                        {data.about.body.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>

                  {/* Vision Card (3x3 Square) */}
                  <motion.div variants={itemVariants} className="md:col-span-3 md:row-span-3">
                    <GlassCard className="h-full flex flex-col justify-center p-10 border-green-500/100">
                      <h2 className="text-3xl font-bold text-neutral-800 mb-6 uppercase">{data.vision.heading}
                        <div className="relative mt-1 w-14">
                          {/* Base bar */}
                          <div className="h-1.5 w-18 animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto]" />
                          
                          {/* Glow layer */}
                          <div
                            className="absolute inset-0 h-1.5 w-18 animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto] blur-sm opacity-30"
                            aria-hidden="true"
                          />
                        </div>
                      </h2>
                      <h3 className="text-2xl font-bold text-neutral-800 mb-6 uppercase">{data.vision.subheading}<div /></h3>

                      <div className="text-neutral-800 leading-relaxed text-lg space-y-3">
                        {data.vision.body.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>

                  {/* Instagram (1x1 Square) */}
                <motion.div variants={itemVariants} className="aspect-square">
                  <GlassCard className="h-full p-0 overflow-hidden group border-pink-500/100 hover:border-blue-500/50 transition-colors">
                    <a
                      href="https://www.instagram.com/nakagawa.akihiro_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-20 h-full w-full flex flex-col items-center justify-center gap-3 p-4 text-center"
                    >
                      <FaInstagram
                        className="w-30 h-30 text-pink-500"
                      />

                      <span className="text-xl font-semibold text-neutral-800">
                        {data.insta}
                      </span>
                      <span className="text-2xl text-neutral-500 break-all line-clamp-1">
                          @nakagawa.akihiro_
                      </span>
                    </a>
                  </GlassCard>
                </motion.div>


                {/* Email (1x1 Square) */}
                <motion.div variants={itemVariants} className="aspect-square">
                  <GlassCard className="h-full p-0 overflow-hidden group border-blue-500/100">
                    <button
                      onClick={copyEmail}
                      className="relative z-20 h-full w-full flex flex-col items-center justify-center gap-4 p-4 text-center cursor-pointer"
                    >
                      {emailCopied ? (
                        <FaCheck className="w-22 h-22 text-green-500" />
                      ) : (
                        <FaEnvelope className="w-22 h-22 text-blue-500" />
                      )}

                      <span className="text-xl font-semibold text-neutral-800">
                        {emailCopied ? "コピーしました！" : "お問い合わせ"}
                      </span>

                      <span className="text-2xl text-neutral-500 break-all">
                        {data.email}
                      </span>
                    </button>
                  </GlassCard>
                </motion.div>


                {/* Phone (1x1 Square) */}
                <motion.div variants={itemVariants} className="aspect-square">
                  <GlassCard className="h-full p-0 overflow-hidden group border-green-500/100">
                    <button
                      onClick={copyPhone}
                      className="relative z-20 h-full w-full flex flex-col items-center justify-center gap-4 p-4 text-center cursor-pointer"
                    >
                      {phoneCopied ? (
                        <FaCheck className="w-20 h-20 text-green-500" />
                      ) : (
                        <FaPhone className="w-20 h-20 text-green-500" />
                      )}

                      <span className="text-xl font-semibold text-neutral-800">
                        {phoneCopied ? "コピーしました！" : "お問い合わせ"}
                      </span>

                      <span className="text-2xl text-neutral-500 break-all">
                        {data.phone}
                      </span>
                    </button>
                  </GlassCard>
                </motion.div>

                  <motion.div variants={itemVariants} className="md:col-span-4 md:row-span-2">
                    <GlassCard className="h-full flex flex-col justify-center p-10 border-cyan-500/100">
                      <h2 className="text-3xl font-bold text-neutral-800 mb-6 uppercase">{data.policy.heading}
                        <div className="relative mt-1 w-14">
                      
                          <div className="h-1.5 w-18 animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto]" />
                          
                 
                          <div
                            className="absolute inset-0 h-1.5 w-18 animate-rgb-wave bg-gradient-to-r from-blue-600 via-cyan-500 via-green-500 via-emerald-500 to-blue-600 bg-[length:200%_auto] blur-sm opacity-30"
                            aria-hidden="true"
                          />
                        </div>
                      </h2>
                      <h3 className="text-2xl font-bold text-neutral-800 mb-6 uppercase">{data.policy.subheading}<div /></h3>

                      <div className="text-neutral-800 leading-relaxed text-lg space-y-3">
                        {data.policy.body.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                      <table className="w-full text-lg mt-4">
                        <thead>
                          <tr className="border-b border-black/10">
                            <th className="text-left py-2 pr-4 font-bold text-neutral-800">{data.policy.tableHeadings.pillar}</th>
                            <th className="text-left py-2 pr-4 font-bold text-neutral-800">{data.policy.tableHeadings.theme}</th>
                            <th className="text-left py-2 font-bold text-neutral-800">{data.policy.tableHeadings.role}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.policy.table.map((row) => (
                            <tr key={row.pillar} className="border-b border-black/5">
                              <td className="py-2 pr-4 text-neutral-800">{row.pillar}</td>
                              <td className="py-2 pr-4 text-neutral-800">{row.theme}</td>
                              <td className="py-2 text-neutral-800">{row.role}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </GlassCard>
                  </motion.div>

                  {/* <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 aspect-square">
                    <PhotoGallery photos={galleryPhotos} interval={5000} />
                  </motion.div>

                  <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 aspect-square">
                    <PhotoGallery photos={galleryPhotos} interval={5000} />
                  </motion.div> */}

                {/*  <motion.div variants={itemVariants} className="md:col-span-2 h-full">
                    <GlassCard className="h-full flex flex-col justify-between p-8">
                      <div>
                        <h3 className="text-lg font-bold text-neutral-800 uppercase">{data.priorities.heading}</h3>
                        <div className="h-1 w-14 bg-blue-500 mt-1" />
                        <div className="flex justify-between items-end mb-2 mt-6">
                          <h3 className="text-[18px] font-mono text-neutral-800 uppercase tracking-[0.2em]">{data.priorities.items[0].title}</h3>
                          <span className="text-[14px] font-mono text-neutral-800 uppercase tracking-[0.2em]">{data.priorities.items[0].status}</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full relative"> 
                          <div
                            className="h-full w-[50%] animate-rgb-wave rounded-full bg-gradient-to-r from-red-500 via-green-500 via-blue-500 via-purple-500 to-red-500 bg-[length:200%_auto] 
                  relative z-10"
                            style={{
                              boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 30px rgba(168, 85, 247, 0.3)'
                            }}
                          />



                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flex justify-between items-end mb-2">
                          <h3 className="text-[18px] font-mono text-neutral-800 uppercase tracking-[0.2em]">{data.priorities.items[1].title}</h3>
                          <span className="text-[14px] font-mono text-neutral-800 uppercase tracking-[0.2em]">{data.priorities.items[1].status}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full w-full bg-neutral-600" />
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>

                  <motion.div variants={itemVariants} className="md:col-span-2 h-full">
                    <GlassCard className="h-full flex flex-col justify-between p-8">
                      <div>
                        <h3 className="text-lg font-bold text-white uppercase">{data.languages.heading}</h3>
                        <div className="h-1 w-14 bg-blue-500 mt-1" />
                        <div className="flex justify-between items-end mb-2 mt-6">
                          <h3 className="text-[18px] font-mono text-neutral-800 uppercase tracking-[0.2em]">{data.languages.items[0].title}</h3>
                          <span className="text-[14px] font-mono text-neutral-800 uppercase tracking-[0.2em]">{data.languages.items[0].fluency}</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full relative"> 
                          <div
                            className="h-full w-[100%] animate-rgb-wave rounded-full bg-gradient-to-r from-red-500 via-green-500 via-blue-500 via-purple-500 to-red-500 bg-[length:200%_auto] 
                  relative z-10"
                            style={{
                              boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 30px rgba(168, 85, 247, 0.3)'
                            }}
                          />



                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flex justify-between items-end mb-2 mt-6">
                          <h3 className="text-[18px] font-mono text-neutral-800 uppercase tracking-[0.2em]">{data.languages.items[1].title}</h3>
                          <span className="text-[14px] font-mono text-neutral-800 uppercase tracking-[0.2em]">{data.languages.items[1].fluency}</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full relative"> 
                          <div
                            className="h-full w-[85%] animate-rgb-wave rounded-full bg-gradient-to-r from-red-500 via-green-500 via-blue-500 via-purple-500 to-red-500 bg-[length:200%_auto] 
                  relative z-10"
                            style={{
                              boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 30px rgba(168, 85, 247, 0.3)'
                            }}
                          />



                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>

                  <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 aspect-square">
                    <GlassCard className="h-full flex flex-col overflow-hidden relative">
                      <div className="">
                        <h2 className="text-lg font-bold text-white tracking-tighter uppercase">{data.stack}</h2>
                        <div className="h-1 w-14 bg-blue-500 mt-1" />
                      </div>
                      <div className="flex-grow flex items-center justify-center scale-90 -translate-y-18">
                        <TechOrbit />
                      </div>
                    </GlassCard>
                  </motion.div>

                  <motion.div variants={itemVariants} className="md:col-span-2">
                    <GlassCard className="h-full flex items-center p-8">
                      <p className="text-s font-mono text-neutral-600 leading-relaxed uppercase">
                        Focused on the world's biology, technology, problems, and solutions.
                      </p>
                    </GlassCard>
                  </motion.div> */}
                </div>
              </>
            )}
          
      </motion.div>
    </div>
  );
}

export default App;