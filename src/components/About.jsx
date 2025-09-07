import Image from "next/image";

const About = () => {
  return (
    <section
      className="flex flex-col-reverse md:flex-row justify-between py-6 md:py-12 w-[90%] mx-auto gap-5"
      id="about"
    >
      {/* Image */}
      <div
        className="md:w-1/2 flex justify-center h-[350px]"
        data-aos="fade-down-right"
      >
        <div className="w-full h-full rounded-[20px] shadow-lg overflow-hidden">
          <Image
            src="/assets/junaid1.jpg"
            alt="About Me"
            width={500}
            height={350}
            className="w-full h-full object-cover rounded-[20px]"
            priority
          />
        </div>
      </div>

      {/* Text Content */}
      <div
        className="md:w-1/2 flex flex-col space-y-4 md:space-y-6 text-left"
        data-aos="fade-down-left"
      >
        <h2 className="text-4xl font-bold my-0 pb-1">
          About <span className="text-blue-500">Me</span>
        </h2>
        <h3 className="text-xl font-semibold text-gray-700 my-0 py-2">
          FullStack Developer
        </h3>
        {/* <p className="text-gray-600">
          Hi, I'm Muhammad Junaid, a passionate front-end web developer with
          expertise in HTML, CSS, and JavaScript. I love creating eye-catching
          and responsive websites that bring ideas to life. When I'm not coding,
          you can find me exploring the latest trends in web design to enhance
          user experiences.
        </p> */}

          <p class="text-gray-700 mb-3  text-justify leading-snug">
  Hi, I'm <span class="text-blue-600 font-semibold">Muhammad Junaid</span>, a dedicated and passionate  
  <span class="text-blue-600 font-semibold"> Full-Stack Developer</span> with expertise in both front-end 
  and back-end technologies. I specialize in building responsive, dynamic, and user-friendly web 
  applications using modern frameworks like <span class="text-blue-600 font-semibold">Next.js </span> 
  for the frontend, and <span class="text-blue-600 font-semibold">Node.js</span>, 
  <span class="text-blue-600 font-semibold">Express</span>, and 
  <span class="text-blue-600 font-semibold"> MongoDB</span> for the backend. 
  <br />
  I enjoy transforming ideas into real-world solutions through clean, efficient code and intuitive 
  user experiences. Constantly exploring new tools and trends, I strive to stay at the forefront 
  of web development and deliver high-quality, scalable solutions.
</p>

            
           
           

        <a
          href="#readmore"
          className="w-[150px] text-center mt-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-[25px] hover:bg-blue-600 transition"
        >
          Read More
        </a>
      </div>
    </section>
  );
};

export default About;
