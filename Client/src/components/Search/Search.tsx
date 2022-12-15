import * as React from "react";
import { useState, useEffect } from 'react'
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import { useAppDispatch } from "../../assets/hooks";
import { filterSearch } from "../../redux/slices/testSlice";
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllProducts } from "../../redux/thunk-actions/testActions";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  let dispatch = useAppDispatch();

  useEffect(() => {
    window.localStorage.setItem('input',search)
    
 },[search])


  const handleSubmit = (e: any) => {
    if(location.pathname !== '/products'){    
      const persistedInput: any = window.localStorage.getItem('input');

      dispatch(filterSearch(persistedInput))
      navigate('/products');
      return
    }else{
    e.preventDefault();
    setSearch("");
    dispatch(filterSearch(search));
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(filterSearch(search));
  };
  return (
    <Box>
      <form onSubmit={handleSubmit} className="form">
        <AppBar position="static">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}
              value={search}
            />
          </Search>
        </AppBar>
      </form>
    </Box>
  );
}
