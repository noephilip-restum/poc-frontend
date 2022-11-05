import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import useGenres from "hooks/useGenres";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getConfiguration } from "store/slices/configuration";
import { CommonTitle, MEDIA_TYPE } from "types/Movie";
import { COMMON_TITLES } from "constant";
import { GenreType } from "types/Genre";
import TopTrailer from "components/TopTrailer";
import SliderRowForGenre from "components/VideoSlider";

const HomePage = () => {
  const [genres] = useGenres(MEDIA_TYPE.Movie);
  const configuration = useAppSelector((state) => state.configuration);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!configuration.images) {
      dispatch(getConfiguration());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (genres.length) {
    return (
      <Stack spacing={2} sx={{ bgcolor: "background.default" }}>
        <TopTrailer />
        <SliderRowForGenre />
      </Stack>
    );
  }
  return null;
};

export default HomePage;
