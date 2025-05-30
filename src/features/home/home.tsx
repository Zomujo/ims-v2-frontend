import NavigationBar from "@features/home/navigation-bar";
import Hero from "@features/home/hero";
import styles from "./home.module.css";
import { cn } from "@/lib/utils";
import OptimizeInventory from "@features/home/optimize";

const Home = () => {
  return (
    <div>
      <div className={cn(styles.homeBackground, "xl:px-[150px]")}>
        <NavigationBar />
        <Hero />
      </div>
      <OptimizeInventory />
    </div>
  );
};

export default Home;
