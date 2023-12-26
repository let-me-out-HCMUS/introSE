/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';
import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';

const LeftSide = ({clubForm, onSubmitClub}) => {
  return (
    <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center'>
                <img className='rounded-full w-[250px]' src="https://placehold.co/250" alt="" />
                <label className="w-32 text-xs border bg-green-400 text-white border-green-600 hover:text-green-600 cursor-pointer hover:bg-white rounded-md px-4 py-1 mt-4">
                    <input style={{display: 'none'}} type="file"/>
                    <UploadIcon /> Tải ảnh lên
                </label>
            </div>
            <div className='mt-10'>
                <TextField
                    className='bg-white'
                    id="outlined-basic"
                    label="Tên CLB"
                    type="text"
                    {...clubForm.register("clubName")}
                />
            </div>
            <div className='mt-20'>
                <Button size='large' color='success' onClick={clubForm.handleSubmit(onSubmitClub)} variant="contained">Tạo câu lạc bộ</Button>
            </div>
          </div>
  )
}

export default LeftSide