import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

import { useDispatch, useSelector } from "react-redux";
import { fetchEpisodes } from "../slices/episodesSlice";

const EpisodesInfo = () => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { listOfEpisodes, infoPage, status } = useSelector(
    (state) => state.episodes
  );

  React.useEffect(() => {
    dispatch(fetchEpisodes(page));
  }, [dispatch, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {status === "loading" && (
          <Typography sx={{ textAlign: "center", mt: 3 }}>
            Loading...
          </Typography>
        )}
        {status === "resolved" && (
          <>
            {listOfEpisodes.map((item, index) => {
              return (
                <Box sx={{ display: "flex", mt: 2, mb: 2 }} key={index}>
                  <Box mr={1}>
                    <Typography>{`${item.id}.`}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignContent: "flex-start" }}>
                    <Typography mr={1}>
                      <b>Name: </b>
                      {item.name}
                    </Typography>
                    <Typography mr={1}>
                      <b>Date: </b>
                      {item.air_date}
                    </Typography>
                    <Typography mr={1}>
                      <b>Episod: </b>
                      {item.episode}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
          mb: 3,
        }}
      >
        <Pagination
          count={infoPage?.pages}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Container>
  );
};

export default EpisodesInfo;
