import React, { useState } from 'react'
import {
    Box,
    Button,
    Paper,
    ButtonGroup,
    Popper,
    Grow,
    MenuItem,
    MenuList,
    ClickAwayListener,
    Link
} from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAppDispatch } from '../../assets/hooks';
import { updateOrder } from '../../redux/thunk-actions/orderActions';

type DropperButtonProps = {
    orderId: string
    isPaid: boolean
    forceUpdate: React.DispatchWithoutAction
}

const DropperButton = ({ orderId, isPaid, forceUpdate }: DropperButtonProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const anchorRef = React.useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const updateData = {
            orderId,
            isPaid: true,
            isDelivered: true
        }
        dispatch(updateOrder(updateData))
        forceUpdate()
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleClose = (event: Event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    return (
        <Box>
            <ButtonGroup ref={anchorRef}>
                <Button><Link underline='none' href={`${orderId}`}>Detalles</Link></Button>
                <Button size="small" onClick={handleToggle} disabled={isPaid}>
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorRef.current} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'center bottom' }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem>
                                    <MenuItem onClick={(event) => handleMenuItemClick(event)}>
                                        Marcar como realizado
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    )
}

export default DropperButton