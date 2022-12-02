import React, { useState } from 'react'
import { Box, Button, Typography, Popper, Grow } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type { FilterTypedState } from "../Filters/Filters"
import s from "./FilterPopup.module.css"

type FilterTypes = {
    nameToDisplay: string
    name: string
    nameValue: string
    options: string[]
}

type Filter = {
    filterDetails: FilterTypes
    filters: FilterTypedState
    setFilters: React.Dispatch<React.SetStateAction<FilterTypedState>>
}

const ConditionalRendering = ({ filterDetails, filters, setFilters }: Filter) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.checked) {
            setFilters({
                ...filters,
                [e.target.name]: [...filters[e.target.name], e.target.value]
            })
        } else {
            setFilters({
                ...filters,
                [e.target.name]: (filters[e.target.name] as string[]).filter(f => f !== e.target.value)
            })
        }
    }

    //console.log(filters.category.includes(filterDetails.nameValue)) // true || false
    console.log(filterDetails.nameValue)

    const open = Boolean(anchorEl);
    
    if (filters.category.includes(filterDetails.nameValue)) {
        return (
            <Box className={s.container}>
                <Button sx={{ padding: 0 }} onClick={handleClick}>
                    <Typography variant='subtitle1' >
                        {filterDetails.nameToDisplay}
                    </Typography>
                    <KeyboardArrowDownIcon />
                </Button>
                <Popper open={open} anchorEl={anchorEl} placement="bottom-start" sx={{ zIndex: 9999 }}>
                    <Grow in={open} style={{ transformOrigin: "0 0 0" }} timeout={200}>
                        <Box className={s.optionsContainer}>

                            {filterDetails.options.map(op => (
                                <Box className={s.optionsWrapper} key={op}>
                                    <input
                                        id={op}
                                        name={filterDetails.name}
                                        value={op}
                                        type="checkbox"
                                        style={{ color: "rgb(17, 17, 17)", border: "2px solid rgb(17, 17, 17)", borderRadius: "0px", width: "1.5rem", height: "1.5rem", cursor: "pointer" }}
                                        onChange={e => handleFilter(e)}
                                        checked={filters[filterDetails.name].includes(op)}
                                    />
                                    <label
                                        htmlFor={op}
                                        style={{ fontSize: "1rem", fontFamily: "Roboto", paddingLeft: "1rem", cursor: "pointer", userSelect: "none", textTransform: "capitalize" }}>
                                        {op}
                                    </label>
                                </Box>
                            ))}
                        </Box>
                    </Grow>
                </Popper>
            </Box>
        )
    } else {
        return (
            <Box>
            </Box>
        )
    }
}


export default ConditionalRendering
