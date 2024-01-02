/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DataTable from './DataTable';
import { useState } from 'react';


const RightSide = ({ PlayerForm, players, onSubmitPlayer }) => {
    const [playerType, setPlayerType] = useState('');

    const handleChange = (event) => {
        setPlayerType(event.target.value);
    }
  return (
    <div className='flex flex-col items-center'>
        <div className='w-full px-10'>
            <Grid container spacing={2}>
                <Grid item xs>
                <div className='flex flex-col items-center'>
                    <img className='rounded-full w-[150px]' src="https://placehold.co/150" alt="" />
                    <label className="w-32 text-xs border bg-green-400 text-white border-green-600 hover:text-green-600 cursor-pointer hover:bg-white rounded-md px-4 py-1 mt-4">
                        <input style={{display: 'none'}} type="file"/>
                        <UploadIcon /> Tải ảnh lên
                    </label>
                </div>
                </Grid>
                <Grid item xs>
                    <FormControl className='flex flex-col justify-evenly h-[300px]'>
                        <TextField id="standard-basic" label="Họ và tên cầu thủ" variant="standard" {...PlayerForm.register("name")}/>
                        <TextField id="standard-basic" InputLabelProps={{shrink: true}} type='date' {...PlayerForm.register("dob")} label="Ngày sinh" variant="standard" />
                        <FormControl variant="standard" sx={{minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label" {...PlayerForm.register("type")}>Loại cầu thủ</InputLabel>
                            <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={playerType}
                            onChange={handleChange}
                            label="Age"
                            >
                                <MenuItem value={"in"}>Trong nước</MenuItem>
                                <MenuItem value={"out"}>Ngoài nước</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField type='number' id="standard-basic" label="Số áo" variant="standard" {...PlayerForm.register("shirtNum")} />
                    </FormControl>
                </Grid>
                <Grid item xs>
                    <FormControl className='flex flex-col justify-evenly h-[150px]'>
                        <TextField InputProps={{spellCheck: 'false'}} id="standard-basic" label="Ghi chú" multiline variant="standard" {...PlayerForm.register("note")} />
                        <div className='mt-20'>
                            <Button type='submit' size='large' color='success' variant="contained" onClick={PlayerForm.handleSubmit(onSubmitPlayer)}>Thêm cầu thủ</Button>
                        </div>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
        <DataTable players={players}/>
    </div>
  )
}

export default RightSide