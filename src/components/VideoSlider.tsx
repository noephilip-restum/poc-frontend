import withVideosPerGenre from "hoc/withVideosPerGenre";
import SlickSlider from "./slick-slider/SlickSlider";

export default function SliderRowForGenre() {
  const Component = withVideosPerGenre(SlickSlider);
  return <Component />;
}
