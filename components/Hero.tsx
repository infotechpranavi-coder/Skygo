const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden -mt-24 md:-mt-28"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/dtfeqoyra/video/upload/v1765534710/Untitled_video_-_Made_with_Clipchamp_2_zs4q3b.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Removed overlay */}
      <div className="container mx-auto px-4 py-20 relative z-20"></div>
    </section>
  );
};

export default Hero;