
import HeroSection from "./components/HeroSection";
import { useAuth } from "./contexts/AuthConext";
import NavigationTabs from "./components/Tabs/NavigationTabs";
export default function Home() {
  const { products } = useAuth();

  return (
    <main className=" min-h-screen ">
      <div className="  max-w-[1800px] mx-auto px-4 my-2">
        <HeroSection data={products} />
        <NavigationTabs />
        
      </div>
    </main>
  );
}
