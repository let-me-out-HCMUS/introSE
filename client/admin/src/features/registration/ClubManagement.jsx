import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {getRule} from "../../services/apiRule";
import toast from 'react-hot-toast';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import { useQuery } from '@tanstack/react-query';


const ClubManagement = () => {
    const [players, setPlayers] = useState([
        {
            id: 1,
            name: 'Nguyễn Văn A',
            shirtNum: 1,
            type: 'Trong nước',
            dob: '1999-01-01',
            note: 'Chân trái',
            image: 'https://cdn-icons-png.flaticon.com/512/147/147144.png'
        },
        {
            id: 2,
            name: 'Nguyễn Văn B',
            shirtNum: 2,
            type: 'Trong nước',
            dob: '1999-01-01',
            note: 'Chân trái',
            image: 'https://cdn-icons-png.flaticon.com/512/147/147144.png'
        },
        {
            id: 3,
            name: 'Nguyễn Văn C',
            shirtNum: 3,
            type: 'Trong nước',
            dob: '1999-01-01',
            note: 'Chân trái',
            image: 'https://cdn-icons-png.flaticon.com/512/147/147144.png'
        },
        {
            id: 4,
            name: 'Nguyễn Văn D',
            shirtNum: 4,
            type: 'Trong nước',
            dob: '1999-01-01',
            note: 'Chân trái',
            image: 'https://cdn-icons-png.flaticon.com/512/147/147144.png'
        }
    ]);
    const PlayerForm = useForm();
    const { data } = useQuery(["wtf"], ()=> getRule());

    const onSubmitPlayer = (data) => {
        setPlayers([...players, {
            id: players.length + 1,
            name: data.name,
            shirtNum: data.shirtNum,
            type: data.type === 'in' ? 'Trong nước' : 'Ngoài nước',
            dob: data.dob,
            note: data.note,
            image: data.image
        }]);

        toast.success('Thêm cầu thủ thành công');
    }

  return (
    <Box sx={{ flexGrow: 1 }} className="pt-10">
      <Grid container spacing={2}>
        <Grid xs={4} className="border-r-4 border-gray-300">
          <LeftSide rules={data ? data.club : null} players={players} />
        </Grid>
        <Grid xs={8}>
            <RightSide rules={data ? data.club : null} PlayerForm={PlayerForm} players={players} setPlayers={setPlayers} onSubmitPlayer={onSubmitPlayer}/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ClubManagement