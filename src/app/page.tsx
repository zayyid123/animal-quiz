import Navbar from "@/components/Navbar";
import ParticlesComponent from "@/components/ParticlesComponent";

export default function Home() {
  return (
    <div className="w-full h-[9000px]">
      <Navbar/>
      {/* particles */}
      <ParticlesComponent />

      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full w-full -z-20 relative"/>
    </div>
  );
}
