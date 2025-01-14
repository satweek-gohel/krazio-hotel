import "./index.css";
import CardList from "./components/CardList";
import ImageSlider from "./components/Slider";
function App() {
  const images = [
    "/hero-1.jpg",
    "/hero-2.jpg",
    "/hero-1.jpg",
    "/hero-2.jpg",
    "/hero-1.jpg",
    "/hero-2.jpg",
  ];
  return (
    <div>
      <div className="mt-20">
        <ImageSlider images={images} />
      </div>
      <div className="pt-5">
        <CardList />
      </div>
    </div>
  );
}

export default App;
