/* eslint-disable react/prop-types */
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const DataTable = ({ players, setPlayers }) => {
  const columns = [
    { field: 'id', headerName: 'STT', width: 70 },
    { field: 'name', headerName: 'Họ và tên', width: 130 },
    { field: 'shirtNum', type: 'number', headerName: 'Số áo', width: 90},
    { field: 'type', headerName: 'Loại cầu thủ', width: 130 },
    {
      field: 'dob',
      headerName: 'Ngày sinh',
      width: 130,
    },
    {
      field: 'note',
      headerName: 'Ghi chú',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button style={{ width: '30px', maxWidth: '30px', fontSize: '10px'}}
          color="error"
          onClick={() => deleteRow(params.row.id, setPlayers, players)}
        >
          Xoá
        </Button>
      ),
    }
  ];

  const deleteRow = (id, setPlayers, players) => {
    // update id
    const newPlayers = players.filter((item) => item.id !== id);
    newPlayers.forEach((item, index) => {
      item.id = index + 1;
    });

    setPlayers(newPlayers);
  };

  return (
    <div className='h-[400px] w-full bg-white mt-10'>
        <DataGrid
            rows={players}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 5 },
            },
            }}
            pageSizeOptions={[5, 10]}
        />
    </div>
  )
}

export default DataTable