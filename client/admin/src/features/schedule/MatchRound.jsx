/* eslint-disable react/prop-types */
import { useState } from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import SportsIcon from '@mui/icons-material/Sports';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// import StarBorder from '@mui/icons-material/StarBorder';

import Match from "../home/Match";

export default function MatchRound({matches, matchId}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };


  return (
    <div className='my-2'>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <SportsIcon />
        </ListItemIcon>
        <ListItemText primary={`Vòng ${matchId}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List className='bg-gray-100' component="div" disablePadding>
            <div className='py-4'>
              {matches.map((match, index) => {
              // TODO: change key from index to matchId
              return <Match key={index} matchInfo={match} />
              })}
            </div>
        </List>
      </Collapse>
    </div>
  );
}
