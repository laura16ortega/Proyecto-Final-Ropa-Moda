import { Button, styled } from '@mui/material';
import React from 'react';

const CustomButton = ({ backgroundColor, color, buttonText, landingBtn, guideBtn, getStartebBtn }) => {
    const CustomButton = styled(Button)(({ theme }) => ({
        backgroundColor: backgroundColor,
        color: color,
        fontWeight: "700",
        fontSize: "14px",
        cursor: "pointer",
        padding: "1.5rem 1.2rem",
        borderRadius: "7px",
        textTransform: "none",
        display: "block",
        border: "2px solid transparent"
        // "&:hover": {
        //     backgroundColor: color,
        //     color: backgroundColor,
        //     borderColor: backgroundColor
        // }
    }));

    return <CustomButton></CustomButton>
};

export default CustomButton;