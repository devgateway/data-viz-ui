import type { Route } from "./+types/home";
import PreviewComponent from "~/pages/PreviewComponent";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Home = () => {
  return <PreviewComponent />;
};

export default Home;