/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';
import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import {createClub} from '../../services/apiClubs';

const LeftSide = ({rules, players}) => {

    const {mutate: mutateCreateClub} = useMutation({
        mutationFn: async (data) => {
            createClub(data.clubName, data.stadium, data.file, data.players)
        },
        onSuccess: () => {
            toast.success('Tạo câu lạc bộ thành công');
        },
        onError: () => {
            toast.error('Tạo câu lạc bộ thất bại');
        }
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const clubForm = useForm();

    const registerOpts = {
        clubName: {required: 'Tên câu lạc bộ không được để trống'},
        file: {required: 'Ảnh đại diện không được để trống'},
        stadium: {required: 'Tên sân vận động không được để trống'},
    }

    const onSubmitClub = (data) => {
        // check rules
        if (players.length < rules.minPlayers || players.length > rules.maxPlayers){
            toast.error(`Số lượng cầu thủ phải từ ${rules.minPlayers} đến ${rules.maxPlayers}`);
            return;
        }

        // check max foreign player
        const foreignPlayers = players.filter((item) => item.type === 'Ngoài nước');
        if (foreignPlayers.length > rules.maxForeigners){
            toast.error(`Số lượng cầu thủ ngoại quốc tối đa là ${rules.maxForeigners}`);
            return;
        }

        mutateCreateClub({clubName: data.clubName, stadium: data.stadium, file: selectedImage, players: players});
    }

  return (
    <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center'>
                {
                    selectedImage ?
                    <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImage)}
                    /> 
                    :    <img className='rounded-full w-[250px]' src="https://placehold.co/250" alt="" />
                }
                <label className="w-32 text-xs border bg-green-400 text-white border-green-600 hover:text-green-600 cursor-pointer hover:bg-white rounded-md px-4 py-1 mt-4">
                    <input style={{display: 'none'}} type="file" onChange={
                        (e) => {
                            if (e.target.files[0]){
                                setSelectedImage(e.target.files[0]);
                            }
                        }
                    }/>
                    <UploadIcon /> Tải ảnh lên
                </label>
            </div>
            <div className='mt-10 flex flex-col'>
                <TextField
                    className='bg-white'
                    id="outlined-basic"
                    label="Tên CLB"
                    type="text"
                    {...clubForm.register("clubName", registerOpts.clubName)}
                />
                {
                    clubForm.formState.errors.clubName && <p className='text-red-500 text-xs'>{clubForm.formState.errors.clubName.message}</p>
                }
                <TextField
                    style={{marginTop: '20px'}}
                    className='bg-white'
                    id="outlined-basic"
                    label="Tên SVĐ"
                    type="text"
                    {...clubForm.register("stadium", registerOpts.stadium)}
                />
                {
                    clubForm.formState.errors.stadium && <p className='text-red-500 text-xs'>{clubForm.formState.errors.stadium.message}</p>
                }
            </div>
            <div className='mt-20'>
                <Button size='large' color='success' onClick={clubForm.handleSubmit(onSubmitClub)} variant="contained">Tạo câu lạc bộ</Button>
            </div>
    </div>
  )
}

export default LeftSide