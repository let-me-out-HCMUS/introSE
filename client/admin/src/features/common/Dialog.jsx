import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

/* eslint-disable react/prop-types */
export default function CustomDialog({ children, onClose, open, title }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <div className=" p-8">
        <DialogTitle className=" text-center">{title}</DialogTitle>
        {children}
      </div>
    </Dialog>
  );
}
