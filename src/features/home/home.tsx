import NavigationBar from "@features/home/navigation-bar";
import Hero from "@features/home/hero";
import styles from "./home.module.css";
import { cn } from "@/lib/utils";

const Home = () => {
  return (
    <div className={cn(styles.homeBackground, "xl:px-[150px]")}>
      <NavigationBar />
      <Hero />
    </div>
  );
};

export default Home;
