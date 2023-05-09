import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  Skeleton,
} from "@mui/material";
import BasicModal from "./HeroModalInfo";
import HeroTablePagination from "./HeroPagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroes } from "../slices/heroesSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => {
  return {
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  };
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const HeroTableBody = ({ isLoading, listOfСharacter, rowsPerPage }) => {
  const [selectedHero, setSelectedHero] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const openModal = (id) => {
    const hero = listOfСharacter.find((hero) => hero.id === id);
    setSelectedHero(hero);
    setOpen(true);
  };

  const SkeletonTableRow = () => (
    <StyledTableRow>
      <StyledTableCell style={{ width: "24px" }} align="center">
        <Skeleton />
      </StyledTableCell>
      <StyledTableCell align="left">
        <Skeleton />
      </StyledTableCell>
      <StyledTableCell style={{ width: "75px" }} align="center">
        <Skeleton />
      </StyledTableCell>
    </StyledTableRow>
  );

  if (isLoading) {
    return (
      <TableBody>
        {[...Array(rowsPerPage)].map((_, index) => (
          <SkeletonTableRow key={index} />
        ))}
      </TableBody>
    );
  }

  return (
    <>
      <TableBody>
        {listOfСharacter.map((row, index) => (
          <StyledTableRow
            sx={{
              "&:hover": {
                backgroundColor: "lightgray",
                cursor: "pointer",
              },
            }}
            key={index}
            onClick={() => openModal(row.id)}
          >
            <StyledTableCell
              align="center"
              style={{ borderRight: "0.5px solid rgb(0, 0, 0, 0.3)" }}
            >
              {row.id}
            </StyledTableCell>
            <StyledTableCell align="left" component="th" scope="row">
              {row.name}
            </StyledTableCell>
            <StyledTableCell align="center">{row.status}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
      <BasicModal data={selectedHero} open={open} setOpen={setOpen} />
    </>
  );
};

const HeroTable = () => {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 20;

  const dispatch = useDispatch();
  const { listOfСharacter, infoPage, isLoading } = useSelector(
    (state) => state.heroes
  );

  React.useEffect(() => {
    const offset = page * rowsPerPage;
    dispatch(fetchHeroes(offset / rowsPerPage + 1));
  }, [dispatch, page]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  if (isLoading && listOfСharacter.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "77vh",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <TableContainer
        sx={{
          background: "transparent",
          mt: 3,
          boxShadow: "none",
          maxHeight: 700,
          maxWidth: 555,
        }}
        component={Paper}
      >
        <Table
          sx={{ overflowY: "scroll", maxWidth: 555 }}
          aria-label="customized table"
        >
          <TableHead sx={{ position: "sticky", top: 0 }}>
            <TableRow>
              <StyledTableCell style={{ width: "24px" }} align="center">
                ID
              </StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell style={{ width: "75px" }} align="center">
                Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <HeroTableBody
            isLoading={isLoading}
            listOfСharacter={listOfСharacter}
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HeroTablePagination
          component={"div"}
          rowsPerPageOptions={[]}
          count={infoPage?.count !== undefined ? infoPage.count : 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage=""
        />
      </Box>
    </Box>
  );
};

export default HeroTable;
