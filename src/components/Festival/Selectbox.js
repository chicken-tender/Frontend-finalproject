import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF62AD",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#FF62AD",
            "&:hover": {
              borderColor: "#FF62AD",
            },
          },
          "&.Mui-focused fieldset": {
            borderColor: "#FF62AD",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FF62AD",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FF62AD",
          },
        },
      },
    },
  },
});


const SelectBox = ({ onFilter })  => {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    onFilter(selectedCity, date); 
  };


  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    onFilter(city, selectedDate); // 선택한 city와 date 값을 전달
  };



  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', gap: '25px' , "@media (max-width: 768px)": {
            flexDirection: "column", width: "100%"
          },}}>
        <FormControl sx={{ minWidth: 240 }}>
          <InputLabel id="city-label">지역</InputLabel>
          <Select
            labelId="city-label"
            id="city-select"
            value={city}
            label="지역"
            onChange={handleCityChange}
          >
            <MenuItem value={0}>전체</MenuItem>
            <MenuItem value={1}>서울</MenuItem>
            <MenuItem value={2}>인천</MenuItem>
            <MenuItem value={4}>대구</MenuItem>
            <MenuItem value={5}>광주</MenuItem>
            <MenuItem value={6}>부산</MenuItem>
            <MenuItem value={31}>경기도</MenuItem>
            <MenuItem value={32}>강원도</MenuItem>
            <MenuItem value={33}>충청북도</MenuItem>
            <MenuItem value={34}>충청남도</MenuItem>
            <MenuItem value={35}>경상북도</MenuItem>
            <MenuItem value={36}>경상남도</MenuItem>
            <MenuItem value={37}>전라북도</MenuItem>
            <MenuItem value={38}>전라남도</MenuItem>
            <MenuItem value={39}>제주도</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 240 }}>
          <InputLabel id="date-label">시기</InputLabel>
          <Select
            labelId="date-label"
            id="date-select"
            value={date}
            label="시기"
            onChange={handleDateChange}
          >
            <MenuItem value={0}>전체</MenuItem>
            <MenuItem value={1}>1월</MenuItem>
            <MenuItem value={2}>2월</MenuItem>
            <MenuItem value={3}>3월</MenuItem>
            <MenuItem value={4}>4월</MenuItem>
            <MenuItem value={5}>5월</MenuItem>
            <MenuItem value={6}>6월</MenuItem>
            <MenuItem value={7}>7월</MenuItem>
            <MenuItem value={8}>8월</MenuItem>
            <MenuItem value={9}>9월</MenuItem>
            <MenuItem value={10}>10월</MenuItem>
            <MenuItem value={11}>11월</MenuItem>
            <MenuItem value={12}>12월</MenuItem>

          </Select>
        </FormControl>

      </Box>
    </ThemeProvider>
  );
};

export default SelectBox;
