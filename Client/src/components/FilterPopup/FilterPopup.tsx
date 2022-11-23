import React, { useState } from 'react'
import { Box, Button, Typography, Popper, Grow } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type { FilterTypedState } from "../Filters/Filters"
import s from "./FilterPopup.module.css"

type FilterTypes = {
    name: string
    options: string[]
}

type Filter = {
    filterDetails: FilterTypes
    filter: FilterTypedState
    setFilter: React.Dispatch<React.SetStateAction<FilterTypedState>>
}

const FilterPopup = ({ filterDetails, filter, setFilter }: Filter) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target)

        if (e.target.checked) {
            setFilter({
                ...filter,
                [e.target.name]: [...filter[e.target.name], e.target.value]
            })
        } else {
            setFilter({
                ...filter,       // cosa rara, tiraba "property filter does not exist on type string | string[]", tirarle as string[] lo arreglo
                [e.target.name]: (filter[e.target.name] as string[]).filter(f => f !== e.target.value)
            })
        }
    }

    const open = Boolean(anchorEl);

    return (
        <Box className={s.container}>
            <Button type="button" sx={{ padding: 0 }} onClick={handleClick}>
                <Typography variant='subtitle1' >
                    {filterDetails.name}
                </Typography>
                <KeyboardArrowDownIcon />
            </Button>
            <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
            <Grow in={open} style={{transformOrigin: "0 0 0"}} timeout={200}>
                <Box className={s.optionsContainer}>
                    {/*2nd child marginTop 1 rme */}
                    {filterDetails.options.map(op => (
                        <Box className={s.optionsWrapper} key={op}>
                            <input
                                id={op}
                                name={filterDetails.name}
                                value={op}
                                type="checkbox"
                                style={{ color: "rgb(17, 17, 17)", border: "2px solid rgb(17, 17, 17)", borderRadius: "0px", width: "1.5rem", height: "1.5rem", cursor: "pointer" }}
                                onChange={e => handleFilter(e)}
                            />
                            <label
                                htmlFor={op}
                                style={{ fontSize: "1rem", fontFamily: "Roboto", paddingLeft: "1rem", cursor: "pointer", userSelect: "none" }}>
                                {op}
                            </label>
                        </Box>
                    ))}
                </Box>
                </Grow>
            </Popper>
        </Box>
    )
}

export default FilterPopup