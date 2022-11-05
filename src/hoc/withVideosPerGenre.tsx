import { ElementType, useEffect, useState } from "react";
import { GenreType } from "types/Genre";
import { CommonTitle, MEDIA_TYPE, Movie, PaginatedResult } from "types/Movie";
import { axiosInstance } from "utils/axios";

export default function withVideosPerGenre(Component: ElementType) {
  return function WithVideosPerGenre() {
    useEffect(() => {
      // if (genre.id) {
      //   axiosInstance
      //     .get<PaginatedResult>(`/discover/${mediaType}`, {
      //       params: { with_genres: genre.id },
      //     })
      //     .then((response) => {
      //       const { results } = response.data;
      //       setVideos(results.filter((item) => !!item.backdrop_path));
      //     });
      // } else {
      //   axiosInstance
      //     .get<PaginatedResult>(`/${mediaType}/${genre.apiString}`)
      //     .then((response) => {
      //       const { results } = response.data;
      //       setVideos(results.filter((item) => !!item.backdrop_path));
      //     });
      // }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Component />;
  };
}
