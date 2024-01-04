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
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

const RightSide = ({ rules, PlayerForm, players, setPlayers, onSubmitPlayer }) => {
    const [playerType, setPlayerType] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleChange = (event) => {
        setPlayerType(event.target.value);
    }

    const registerOpts = {
        name: {required: 'Tên cầu thủ không được để trống'},
        shirtNum: {
            required: 'Số áo không được để trống',
            min: {value: 1, message: 'Số áo phải lớn hơn 0'},
            max: {value: 99, message: 'Số áo phải nhỏ hơn 100'}
        },
        dob: {
            required: 'Ngày sinh không được để trống',
            validate: {
                isOldEnough: (value) => {
                    const birthDate = new Date(value);
                    const ageDiffMs = Date.now() - birthDate.getTime();
                    const ageDate = new Date(ageDiffMs);
                    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

                    return age < parseInt(rules.minAge) || age > parseInt(rules.maxAge) ?
                    `Tuổi phải từ ${rules.minAge} đến ${rules.maxAge}` : true;
                },
            },
        },
        image: {required: 'Ảnh đại diện không được để trống'},
    }

    const validateErrors = PlayerForm.formState.errors;

    useEffect(() => {
        if (PlayerForm.formState.isSubmitSuccessful) {
            PlayerForm.reset({
            name: '',
            shirtNum: 0,
            type: 'in',
            dob: '',
            note: '',
            });

            setSelectedImage(null);
        }
    }, [PlayerForm.formState.isSubmitSuccessful])

  return (
    <div className='flex flex-col items-center'>
        <div className='w-full px-10'>
            <Grid container spacing={2}>
                <Grid item xs>
                <div className='flex flex-col items-center'>
                    {
                        selectedImage ?
                        <img
                            alt="not found"
                            width={"150px"}
                            src={URL.createObjectURL(selectedImage)}
                        /> 
                        :    <img className='rounded-full w-[150px]' src="https://placehold.co/150" alt="player-image" />
                    }
                    <label className="w-32 text-xs border bg-green-400 text-white border-green-600 hover:text-green-600 cursor-pointer hover:bg-white rounded-md px-4 py-1 mt-4">
                    <Controller
                        control={PlayerForm.control}
                        name="image"
                        render={({ field: {onChange} }) => (
                            <input style={{display: 'none'}} type="file" onChange={
                                (e) => {
                                    onChange(e.target.files[0]);
                                    if (e.target.files[0]){
                                        setSelectedImage(e.target.files[0]);
                                    }
                                }
                            }/>
                        )}
                    />
                        <UploadIcon /> Tải ảnh lên
                    </label>
                </div>
                </Grid>
                <Grid item xs>
                    <FormControl className='flex flex-col justify-evenly h-[300px]'>
                        <TextField id="standard-basic" label="Họ và tên cầu thủ" variant="standard" {...PlayerForm.register("name", registerOpts.name)}/>
                        {
                            validateErrors.name && <span className='text-red-500 text-xs'>{validateErrors.name.message}</span>
                        }
                        <TextField id="standard-basic" InputLabelProps={{shrink: true}} type='date' {...PlayerForm.register("dob", registerOpts.dob)} label="Ngày sinh" variant="standard" />
                        {
                            validateErrors.dob && <span className='text-red-500 text-xs'>{validateErrors.dob.message}</span>
                        }
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
                        <TextField type='number' id="standard-basic" label="Số áo" variant="standard" {...PlayerForm.register("shirtNum", registerOpts.shirtNum)} />
                        {
                            validateErrors.shirtNum && <span className='text-red-500 text-xs'>{validateErrors.shirtNum.message}</span>
                        }
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
        <DataTable players={players} setPlayers={setPlayers}/>
    </div>
  )
}

export default RightSide