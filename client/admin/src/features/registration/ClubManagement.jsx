import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import LeftSide from './LeftSide';
import RightSide from './RightSide';


const ClubManagement = () => {
    const [players, setPlayers] = useState(
        [
            { id: 1, shirtNum: 7, type: 'Trong nước', name: 'Jon', dob: '2023-12-12', note: 'Quá đẹp trai'},
            { id: 2, shirtNum: 7, type: 'Ngoài nước', name: 'Cersei', dob: '2023-12-12', note: 'Quá đẹp trai' },
            { id: 3, shirtNum: 7, type: 'Trong nước', name: 'Jaime', dob: '2023-12-12', note: 'Quá đẹp trai' },
            { id: 4, shirtNum: 7, type: 'Trong nước', name: 'Arya', dob: '2023-12-12', note: 'Quá đẹp trai' },
            { id: 5, shirtNum: 7, type: 'Ngoài nước', name: 'Daenerys', dob: '2023-12-12', note: 'Quá đẹp trai' },
            { id: 6, shirtNum: 7, type: 'Trong nước', name: null, dob: '2023-12-12', note: 'Quá đẹp trai' },
            { id: 7, shirtNum: 7, type: 'Trong nước', name: 'Ferrara', dob: '2023-12-12', note: 'Quá đẹp trai' },
            { id: 8, shirtNum: 7, type: 'Ngoài nước', name: 'Rossini', dob: '2023-12-12', note: 'Quá đẹp trai' },
            { id: 9, shirtNum: 7, type: 'Trong nước', name: 'Harvey', dob: '2023-12-12', note: 'Quá đẹp trai' },
          ]
    );
    const PlayerForm = useForm();

    const onSubmitPlayer = (data) => {
        setPlayers([...players, {
            id: players.length + 1,
            name: data.name,
            shirtNum: data.shirtNum,
            type: data.type === 'in' ? 'Trong nước' : 'Ngoài nước',
            dob: data.dob,
            note: data.note,
        }]);

        toast.success('Thêm cầu thủ thành công');
    }


  return (
    <Box sx={{ flexGrow: 1 }} className="pt-10">
      <Grid container spacing={2}>
        <Grid xs={4} className="border-r-4 border-gray-300">
          <LeftSide players={players} />
        </Grid>
        <Grid xs={8}>
            <RightSide PlayerForm={PlayerForm} players={players} onSubmitPlayer={onSubmitPlayer}/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ClubManagement