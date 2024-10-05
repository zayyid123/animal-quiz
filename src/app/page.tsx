import Navbar from "@/components/Navbar";
import ParticlesComponent from "@/components/ParticlesComponent";

export default function Home() {
  return (
    <div className="w-full h-full min-h-screen">
      <Navbar/>
      {/* particles */}
      <ParticlesComponent />
    </div>
  );
}
