import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="relative text-white min-h-[calc(100vh-9rem)] flex items-center justify-center"
      style={{
        backgroundImage:
          'url("/MNJ-Volunteer-English-Teacher/images/cover_bg_1.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Inspiring Young Minds Together
        </h1>
        <p className="text-xl mb-8">
          Empower children in Mae Najang with education and fun activities. Join
          us in shaping brighter futures.
        </p>
        <Link
          href="/volunteer"
          className="bg-lime-600 text-white px-7 py-4 rounded-md font-semibold text-lg hover:bg-lime-500 transition duration-300"
        >
          Volunteer Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
