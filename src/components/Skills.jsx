"use client";

import React, { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Aos from "aos";
import "aos/dist/aos.css";

const skills = [
  { name: "HTML", percentage: 90, color: "#F16529" },
  { name: "CSS", percentage: 80, color: "#264de4" },
  { name: "JavaScript", percentage: 75, color: "#F7DF1E" },
  { name: "Bootstrap", percentage: 70, color: "#563d7c" },
  { name: "Tailwind", percentage: 85, color: "#06B6D4" },
  { name: "React", percentage: 80, color: "#61DBFB" },
  { name: "Nextjs", percentage: 70, color: "#000000" }, // Typically black or dark grey for Next.js
  { name: "Nodejs", percentage: 60, color: "#8BC34A" },
  { name: "MongoDB", percentage: 50, color: "#FCAF50" },
];

const Skills = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="p-6 md:p-12 my-6 w-full bg-gray-100" id="skills">
      <h2
        className="text-4xl font-bold text-center mb-8"
        data-aos="zoom-in-down"
      >
        Sk<span className="text-blue-500">ill</span>s
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 place-items-center">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
            data-aos="zoom-in-left"
            data-aos-delay={index * 100}
          >
            <div className="w-[145px] h-[145px]">
              <CircularProgressbar
                value={skill.percentage}
                text={`${skill.name}`}
                styles={buildStyles({
                  textColor: skill.color,
                  pathColor: skill.color,
                  trailColor: "#d6d6d6",
                  strokeLinecap: "round",
                  textSize: "12px",
                })}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
