import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { MEDIA_TYPE, MovieDetail, PaginatedResult } from "types/Movie";
// import { axiosInstance } from "utils/axios";
// import { getRandomNumber } from "utils/common";
import MaxLineTypography from "./MaxLineTypography";
import PlayButton from "./PlayButton";
import MoreInfoButton from "./MoreInfoButton";

import { useDetailModal } from "providers/DetailModalProvider";

export default function TopTrailer() {
  // const [video, setVideo] = useState<MovieDetail | null>(null);

  const { setVideoId } = useDetailModal();

  useEffect(() => {
    // axiosInstance.get(`/${mediaType}/popular`).then((response) => {
    //   const { results } = response.data as PaginatedResult;
    //   const videos = results.filter((item) => !!item.backdrop_path);
    //   const randomVideo = videos[getRandomNumber(videos.length)];
    //   axiosInstance
    //     .get(`/movie/${randomVideo.id}`, {
    //       params: {
    //         append_to_response: "videos",
    //       },
    //     })
    //     .then((response) => {
    //       setVideo(response.data);
    //     });
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (video) {
  return (
    <Box sx={{ position: "relative", zIndex: 1 }}>
      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          position: "relative",
          pb: "40%",
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            height: "56.25vw",
          }}
        >
          <Box
            sx={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "absolute",
            }}
          >
            <Box
              component="img"
              src={`https://www.themoviedb.org/t/p/original/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg`}
              sx={{
                width: "100%",
                // height: "150%",
                objectFit: "cover",
                position: "absolute",
                backgroundPosition: "50%",
              }}
            />

            <Box
              sx={{
                background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`,
                top: 0,
                left: 0,
                bottom: 0,
                right: "26.09%",
                opacity: 1,
                position: "absolute",
                transition: "opacity .5s",
              }}
            />
            <Box
              sx={{
                backgroundColor: "transparent",
                backgroundImage:
                  "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "0px top",
                backgroundSize: "100% 100%",
                bottom: 0,
                position: "absolute",
                height: "14.7vw",
                opacity: 1,
                top: "auto",
                width: "100%",
              }}
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Stack
              spacing={4}
              sx={{
                bottom: "35%",
                position: "absolute",
                left: { xs: "4%", md: "60px" },
                top: 0,
                width: "36%",
                zIndex: 10,
                justifyContent: "flex-end",
              }}
            >
              <MaxLineTypography variant="h2" maxLine={1} color="text.primary">
                Black Adam
              </MaxLineTypography>
              <MaxLineTypography variant="h5" maxLine={3} color="text.primary">
                Nearly 5,000 years after he was bestowed with the almighty
                powers of the Egyptian gods—and imprisoned just as quickly—Black
                Adam is freed from his earthly tomb, ready to unleash his unique
                form of justice on the modern world.
              </MaxLineTypography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <PlayButton size="large" />
                <MoreInfoButton
                  size="large"
                  onClick={() => {
                    // console.log(video.id);
                    setVideoId(1);
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
  // }
  return null;
}
