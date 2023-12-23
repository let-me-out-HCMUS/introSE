import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

/* eslint-disable react/prop-types */
export default function CustomDialog({children ,onClose, open, title}){
    return(
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>{title}</DialogTitle>
            {children}
        </Dialog>)
}