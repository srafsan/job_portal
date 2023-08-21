import {useState} from "react";
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Divider, Box} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import PaidIcon from '@mui/icons-material/Paid';
import Link from "next/link";

export default function JobCard() {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    backgroundColor: isHovered ? '#b6eaea' : '#fff',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <Card sx={{maxWidth: "100%"}}
          style={cardStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
    >
      <CardMedia
        sx={{height: 140}}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCgSINc4hrCuhnrYGOaH1ClOPoIlvDfNOPP1FmbmCvZGIjDp_FMu1_rEvo6QvWazbORR8&usqp=CAU"
        title="green iguana"
      />
      <CardContent sx={{padding: "0px"}}>
        <Typography gutterBottom variant="h5" component="div" sx={{padding: "16px"}}>
          Web Developer
        </Typography>
        <Divider sx={{width: "100%"}}/>
        <Box color="text.secondary" sx={{padding: "16px"}}>
          <Box sx={{display: "flex", gap: "5px", marginBottom: "5px"}}>
            <LocationOnIcon/>
            <Typography>Dhaka</Typography>
          </Box>
          <Box sx={{display: "flex", gap: "5px", marginBottom: "5px"}}>
            <DataUsageIcon/>
            <Typography>Experience: 2 years</Typography>
          </Box>
          <Box sx={{display: "flex", gap: "5px", marginBottom: "5px"}}>
            <PaidIcon/>
            <Typography>Salary: Tk 60,000</Typography>
          </Box>
          <Box sx={{display: "flex", gap: "5px", marginBottom: "5px"}}>
            <CalendarMonthIcon/>
            <Typography>Last Date: 24/06/2023</Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{padding: "16px"}}>
        <Button size="small" variant="contained">Apply</Button>
        <Button size="small" variant="outlined">
          <Link href={`/details/`} style={{textDecoration: "none"}}>Details</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
