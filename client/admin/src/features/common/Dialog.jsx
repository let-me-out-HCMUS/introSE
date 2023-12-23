
import Dialog from "@mui/material/Dialog";

/* eslint-disable react/prop-types */
export default function CustomDialog({ children, onClose, open, title }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <div className=" p-8">
        <h1 className=" mb-10 text-center text-2xl font-bold text-green-600">{title}</h1>
        {children}
      </div>
    </Dialog>
  );
}
