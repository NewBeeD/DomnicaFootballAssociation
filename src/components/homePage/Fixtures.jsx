// import { Box, Stack, Typography, Card, Skeleton } from "@mui/material"


// import GetFixtures from "../../modules/Homepage/Fixtures/FixturesDataFetch";

// import { useSelector } from 'react-redux';
// import { Link } from "react-router-dom";

// import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';




// const FixturesData = ({ page, type, league}) => {

//   GetFixtures()

//   let fixtures_raw = useSelector((state) => state.fixtures)
  
//   let fixtures_all = fixtures_raw && fixtures_raw[0]? fixtures_raw[0]: []
//   let fixtures_dfa = fixtures_raw && fixtures_raw[0]? fixtures_raw[0].filter(item => item.League === league): [];



//   if( page === 'home'){

//     return(

//       <Box marginTop={0} width={{ xs: '90%', sm:'600px'}} margin='auto' sx={{ backgroundColor: {xs: '#F9F9F9', sm: 'white'}, border: '1px solid #D3E1FF', borderRadius: {xs: '4px'}}} >
  
//         <Typography variant="h6" sx={{ textAlign: 'center', color: 'blue'}}>Game Fixtures</Typography>
  
//         {fixtures_raw ? (fixtures_all.filter(item => item.Complete != 'Yes' ).slice(0,5).map((item, idx) => {
  
//           return(
            
//             <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
  
//               <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>

//                 <Box >

    
//                     <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.LeagueName}</Typography>

//                 </Box>
  
//                 <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
  
//                   <Stack direction='column' spacing={0.5}>
  
//                     <Typography style={{ fontSize: 12, fontWeight: 'bold' }}>{item.Home}</Typography>
//                     <Typography style={{ fontSize: 12, fontWeight: 'bold' }}>{item.Away}</Typography>
  
//                   </Stack>
  
//                   <Stack direction='column' spacing={0.5}>

//                     {item.HomeScore ? 
                    
//                     (<Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>): 
                    
//                     item.HomeScore === 0 && item.AwayScore != 0? 
                    
//                     (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):
                    
//                     (<Typography style={{ fontSize: 12}}>{item.Date}</Typography>)
//                     }
  
//                     {item.AwayScore? 
                    
//                     (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>):
                    
//                     item.AwayScore === 0 && item.HomeScore != 0? 
                    
//                     (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):
                    
//                     (<Typography  fontStyle={{ fontSize: 12.5}}>{item.Time}</Typography>)
                    
//                     }


//                   </Stack>
  
//                 </Stack>



//                 <Stack marginLeft={2}>

                    
//                   {item.Game_Info != undefined ? (<Stack>

//                     <Box marginTop={2}>
//                       <Typography>Goals</Typography>

//                     </Box>

//                     <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
//                       <Box>Home</Box>
//                       <Box>Away</Box>
//                     </Stack>

//                     <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

//                       <Box paddingTop={1}>
//                       {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

//                         return(
//                           <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                             <Box>
//                               <SportsSoccerIcon fontSize='2px'/>
//                             </Box>

//                             <Box>
//                               <Typography variant='caption'>{data_point}</Typography>
//                             </Box>


//                           </Stack>
//                         )
//                       })}  
//                       </Box>

//                       <Box paddingTop={1}>
//                       {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

//                         return(
//                           <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                             <Box>
//                               <SportsSoccerIcon fontSize='2px'/>
//                             </Box>

//                             <Box>
//                               <Typography variant='caption'>{data_point}</Typography>
//                             </Box>


//                           </Stack>
//                         )
//                       })}  
//                       </Box>


//                     </Stack>


                                    

//                   </Stack>): ''}
//                 </Stack>
  
//                 <Box marginTop={1}>
  
//                   <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.League_fullName} | {item.Venue}</Typography>
  
//                 </Box>
  
                
  
//               </Card>

                          
//             </Box>

            
  
//           )})): <Skeleton variant="rectangular" width={310} height={60} />}

//           <Box sx={{ textAlign: 'center', marginY: 1}}>

//             <Link to='/DFA/Fixtures' style={{ textDecoration: 'none'}}>
//               <Typography >View all fixtures</Typography>
            
//             </Link>


//           </Box>

  
//           {/* <Box>
//             <Typography style={{ fontSize: 13, fontWeight: 'bold'}}  sx={{ textAlign: 'center', paddingY: {xs: '5px'}}}>
  
//               View All Fixtures
  
//             </Typography>
//           </Box> */}
  
       
  
  
//       </Box>
//     )

//   }

//   else if(page === 'dfa'){

//     return(

//       <Box marginTop={2.3} width={{ xs: '95%'}} marginX='auto' sx={{ backgroundColor: {xs: '#F9F9F9', sm: 'white'}, border: '1px solid #D3E1FF', borderRadius: {xs: '4px'}}}>
  
//         <Typography variant="h6" sx={{ textAlign: 'center', color: 'blue', }}>Game Fixtures</Typography>
  
//         {fixtures_raw && type === 'now' ? (fixtures_dfa.filter(item => item.Complete != 'Yes').map((item, idx) => {
  
//           return(
            
//             <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
  
//               <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>
  
//                 <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
  
//                   <Stack direction='column' spacing={0.5}>
  
//                     <Link to={`/DFA/Home/Team/${item.Home_Id}`} style={{ textDecoration: 'none', color: 'blue'}}>
//                       <Typography style={{ fontSize: 12, fontWeight: 'bold' }}>{item.Home}</Typography>
                    
//                     </Link>


//                     <Link to={`/DFA/Home/Team/${item.Away_Id}`} style={{ textDecoration: 'none', color: 'blue'}}>
//                       <Typography style={{ fontSize: 12, fontWeight: 'bold' }}>{item.Away}</Typography>
                    
//                     </Link>
  
//                   </Stack>
  
//                   <Stack direction='column' spacing={0.5}>
//                     {item.HomeScore ? (<Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>) : item.HomeScore === 0 && item.AwayScore != 0? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):(<Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Date}</Typography>)}
  
//                     {item.AwayScore? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>): item.AwayScore === 0 && item.HomeScore != 0? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):(<Typography  fontStyle={{ fontWeight: 900, fontSize: 12.5}}>{item.Time}</Typography>)}
//                   </Stack>
  
//                 </Stack>

//                 <Stack marginLeft={2}>

                    
//                   {item.Game_Info != undefined ? (<Stack>

//                     <Box marginTop={2}>
//                       <Typography>Goals</Typography>

//                     </Box>

//                     <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
//                       <Box>Home</Box>
//                       <Box>Away</Box>
//                     </Stack>

//                     <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

//                       <Box paddingTop={1}>
//                       {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

//                         return(
//                           <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                             <Box>
//                               <SportsSoccerIcon fontSize='2px'/>
//                             </Box>

//                             <Box>
//                               <Typography variant='caption'>{data_point}</Typography>
//                             </Box>


//                           </Stack>
//                         )
//                       })}  
//                       </Box>

//                       <Box paddingTop={1}>
//                       {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

//                         return(
//                           <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                             <Box>
//                               <SportsSoccerIcon fontSize='2px'/>
//                             </Box>

//                             <Box>
//                               <Typography variant='caption'>{data_point}</Typography>
//                             </Box>


//                           </Stack>
//                         )
//                       })}  
//                       </Box>


//                     </Stack>


                                    

//                   </Stack>): ''}
//                 </Stack>
  
//                 <Box >
  
//                   <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.Cancelled === 'Yes'? 'Cancelled': item.Venue}</Typography>
  
//                 </Box>
  
                
  
//               </Card>
              
//             </Box>
  
//           )})): type === 'past'? (fixtures_dfa.filter(item => item.Complete === 'Yes').map((item, idx) => {
  
//             return(
              
//               <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
    
//                 <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>

//                   <Box marginTop={1} sx={{ display: {xs: 'flex'}, justifyContent: 'center'}}>

//                     <Typography>
//                       {type === 'past'? <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Date}</Typography>: ''}
//                     </Typography>
                    
//                   </Box>

    
//                   <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
    
//                     <Stack direction='column' spacing={0.5}>
    
//                       <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Home}</Typography>
//                       <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Away}</Typography>
    
//                     </Stack>    

//                     <Stack direction='column' spacing={0.5}>

//                       <Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>
    
//                       <Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>
//                     </Stack>
    
//                   </Stack>

//                   <Stack marginLeft={2}>             
//                       {item.Game_Info != undefined ? (<Stack>

//                         <Box marginTop={2}>
//                           <Typography>Goals</Typography>

//                         </Box>

//                         <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
//                           <Box>Home</Box>
//                           <Box>Away</Box>
//                         </Stack>

//                         <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

//                           <Box paddingTop={1}>
//                           {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

//                             return(
//                               <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                                 <Box>
//                                   <SportsSoccerIcon fontSize='2px'/>
//                                 </Box>

//                                 <Box>
//                                   <Typography variant='caption'>{data_point}</Typography>
//                                 </Box>


//                               </Stack>
//                             )
//                           })}  
//                           </Box>

//                           <Box paddingTop={1}>
//                           {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

//                             return(
//                               <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                                 <Box>
//                                   <SportsSoccerIcon fontSize='2px'/>
//                                 </Box>

//                                 <Box>
//                                   <Typography variant='caption'>{data_point}</Typography>
//                                 </Box>


//                               </Stack>
//                             )
//                           })}  
//                           </Box>


//                         </Stack>


                                        

//                       </Stack>): ''}
//                   </Stack>
    
//                   <Box marginBottom={1}>
    
//                     <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.Cancelled === 'Yes'? 'Cancelled': item.League_fullName}</Typography>
    
//                   </Box>
    
                  
    
//                 </Card>
                
//               </Box>
    
//             )})): <Skeleton variant="rectangular" width={310} height={60} />}
  
//           {/* <Box>
//             <Typography style={{ fontSize: 13, fontWeight: 'bold'}}  sx={{ textAlign: 'center', paddingY: {xs: '5px'}}}>
  
//               View All Fixtures
  
//             </Typography>
//           </Box> */}
  
       
  
  
//       </Box>
//     )

//   }

//   else if(page === 'div_1'){

//     return(

//       <Box marginTop={2.3} width={{ xs: '95%'}} marginX='auto' sx={{ backgroundColor: {xs: '#F9F9F9', sm: 'white'}, border: '1px solid #D3E1FF', borderRadius: {xs: '4px'}}}>
  
//         <Typography variant="h6" sx={{ textAlign: 'center', color: 'blue', }}>Game Fixtures</Typography>
  
//         {fixtures_raw && type === 'now' ? (fixtures_dfa.filter(item => item.Complete != 'Yes').map((item, idx) => {
  
//           return(
            
//             <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
  
//               <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>
  
//                 <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
  
//                   <Stack direction='column' spacing={0.5}>
  
//                     <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Home}</Typography>
//                     <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Away}</Typography>
  
//                   </Stack>
  
//                   <Stack direction='column' spacing={0.5}>
//                     {item.HomeScore ? (<Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>) : item.HomeScore === 0 && item.AwayScore != 0? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):(<Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Date}</Typography>)}
  
//                     {item.AwayScore? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>): item.AwayScore === 0 && item.HomeScore != 0? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):(<Typography  fontStyle={{ fontWeight: 900, fontSize: 12.5}}>{item.Time}</Typography>)}
//                   </Stack>
  
//                 </Stack>

//                 <Stack marginLeft={2}>

                    
//                   {item.Game_Info != undefined ? (<Stack>

//                     <Box marginTop={2}>
//                       <Typography>Goals</Typography>

//                     </Box>

//                     <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
//                       <Box>Home</Box>
//                       <Box>Away</Box>
//                     </Stack>

//                     <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

//                       <Box paddingTop={1}>
//                       {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

//                         return(
//                           <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                             <Box>
//                               <SportsSoccerIcon fontSize='2px'/>
//                             </Box>

//                             <Box>
//                               <Typography variant='caption'>{data_point}</Typography>
//                             </Box>


//                           </Stack>
//                         )
//                       })}  
//                       </Box>

//                       <Box paddingTop={1}>
//                       {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

//                         return(
//                           <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                             <Box>
//                               <SportsSoccerIcon fontSize='2px'/>
//                             </Box>

//                             <Box>
//                               <Typography variant='caption'>{data_point}</Typography>
//                             </Box>


//                           </Stack>
//                         )
//                       })}  
//                       </Box>


//                     </Stack>


                                    

//                   </Stack>): ''}
//                 </Stack>
  
//                 <Box >
  
//                   <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.Cancelled === 'Yes'? 'Cancelled': item.Venue}</Typography>
  
//                 </Box>
  
                
  
//               </Card>
              
//             </Box>
  
//           )})): type === 'past'? (fixtures_dfa.filter(item => item.Complete === 'Yes').map((item, idx) => {
  
//             return(
              
//               <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
    
//                 <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>

//                   <Box marginTop={1} sx={{ display: {xs: 'flex'}, justifyContent: 'center'}}>

//                     <Typography>
//                       {type === 'past'? <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Date}</Typography>: ''}
//                     </Typography>
                    
//                   </Box>

    
//                   <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
    
//                     <Stack direction='column' spacing={0.5}>
    
//                       <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Home}</Typography>
//                       <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Away}</Typography>
    
//                     </Stack>    

//                     <Stack direction='column' spacing={0.5}>

//                       <Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>
    
//                       <Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>
//                     </Stack>
    
//                   </Stack>

//                   <Stack marginLeft={2}>             
//                       {item.Game_Info != undefined ? (<Stack>

//                         <Box marginTop={2}>
//                           <Typography>Goals</Typography>

//                         </Box>

//                         <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
//                           <Box>Home</Box>
//                           <Box>Away</Box>
//                         </Stack>

//                         <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

//                           <Box paddingTop={1}>
//                           {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

//                             return(
//                               <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                                 <Box>
//                                   <SportsSoccerIcon fontSize='2px'/>
//                                 </Box>

//                                 <Box>
//                                   <Typography variant='caption'>{data_point}</Typography>
//                                 </Box>


//                               </Stack>
//                             )
//                           })}  
//                           </Box>

//                           <Box paddingTop={1}>
//                           {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

//                             return(
//                               <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                                 <Box>
//                                   <SportsSoccerIcon fontSize='2px'/>
//                                 </Box>

//                                 <Box>
//                                   <Typography variant='caption'>{data_point}</Typography>
//                                 </Box>


//                               </Stack>
//                             )
//                           })}  
//                           </Box>


//                         </Stack>


                                        

//                       </Stack>): ''}
//                   </Stack>
    
//                   <Box marginBottom={1}>
    
//                     <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.Cancelled === 'Yes'? 'Cancelled': item.League_fullName}</Typography>
    
//                   </Box>
    
                  
    
//                 </Card>
                
//               </Box>
    
//             )})): <Skeleton variant="rectangular" width={310} height={60} />}
  
//           {/* <Box>
//             <Typography style={{ fontSize: 13, fontWeight: 'bold'}}  sx={{ textAlign: 'center', paddingY: {xs: '5px'}}}>
  
//               View All Fixtures
  
//             </Typography>
//           </Box> */}
  
       
  
  
//       </Box>
//     )

//   }

//   else if(page === 'daba'){

//     return(

//       <Box marginTop={2.3} width={{ xs: '95%'}} marginX='auto' sx={{ backgroundColor: {xs: '#F9F9F9', sm: 'white'}, border: '1px solid #D3E1FF', borderRadius: {xs: '4px'}}}>
  
//         <Typography variant="h6" sx={{ textAlign: 'center', color: 'blue', }}>Game Fixtures</Typography>
  
//         {fixtures_raw && type === 'now' ? (fixtures_raw_daba.filter(item => item.Complete != 'Yes').map((item, idx) => {
  
//           return(
            
//             <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
  
//               <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>
  
//                 <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
  
//                   <Stack direction='column' spacing={0.5}>
  
//                     <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Home}</Typography>
//                     <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Away}</Typography>
  
//                   </Stack>
  
//                   <Stack direction='column' spacing={0.5}>
//                     {item.HomeScore ? (<Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>) : item.HomeScore === 0 && item.AwayScore != 0? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):(<Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Date}</Typography>)}
  
//                     {item.AwayScore? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>): item.AwayScore === 0 && item.HomeScore != 0? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):(<Typography  fontStyle={{ fontWeight: 900, fontSize: 12.5}}>{item.Time}</Typography>)}
//                   </Stack>
  
//                 </Stack>

//                 <Stack marginLeft={2}>

                    
//                   {item.Game_Info != undefined ? (<Stack>

//                     <Box marginTop={2}>
//                       <Typography>Goals</Typography>

//                     </Box>

//                     <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
//                       <Box>Home</Box>
//                       <Box>Away</Box>
//                     </Stack>

//                     <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

//                       <Box paddingTop={1}>
//                       {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

//                         return(
//                           <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                             <Box>
//                               <SportsSoccerIcon fontSize='2px'/>
//                             </Box>

//                             <Box>
//                               <Typography variant='caption'>{data_point}</Typography>
//                             </Box>


//                           </Stack>
//                         )
//                       })}  
//                       </Box>

//                       <Box paddingTop={1}>
//                       {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

//                         return(
//                           <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                             <Box>
//                               <SportsSoccerIcon fontSize='2px'/>
//                             </Box>

//                             <Box>
//                               <Typography variant='caption'>{data_point}</Typography>
//                             </Box>


//                           </Stack>
//                         )
//                       })}  
//                       </Box>


//                     </Stack>


                                    

//                   </Stack>): ''}
//                 </Stack>
  
//                 <Box >
  
//                   <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.Cancelled === 'Yes'? 'Cancelled': item.Venue}</Typography>
  
//                 </Box>
  
                
  
//               </Card>
              
//             </Box>
  
//           )})): type === 'past'? (fixtures_raw_daba.filter(item => item.Complete === 'Yes').map((item, idx) => {
  
//             return(
              
//               <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
    
//                 <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>

//                   <Box marginTop={1} sx={{ display: {xs: 'flex'}, justifyContent: 'center'}}>

//                     <Typography>
//                       {type === 'past'? <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Date}</Typography>: ''}
//                     </Typography>
                    
//                   </Box>

    
//                   <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
    
//                     <Stack direction='column' spacing={0.5}>
    
//                       <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Home}</Typography>
//                       <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Away}</Typography>
    
//                     </Stack>    

//                     <Stack direction='column' spacing={0.5}>

//                       <Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>
    
//                       <Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>
//                     </Stack>
    
//                   </Stack>

//                   <Stack marginLeft={2}>             
//                       {item.Game_Info != undefined ? (<Stack>

//                         <Box marginTop={2}>
//                           <Typography>Goals</Typography>

//                         </Box>

//                         <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
//                           <Box>Home</Box>
//                           <Box>Away</Box>
//                         </Stack>

//                         <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

//                           <Box paddingTop={1}>
//                           {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

//                             return(
//                               <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                                 <Box>
//                                   <SportsSoccerIcon fontSize='2px'/>
//                                 </Box>

//                                 <Box>
//                                   <Typography variant='caption'>{data_point}</Typography>
//                                 </Box>


//                               </Stack>
//                             )
//                           })}  
//                           </Box>

//                           <Box paddingTop={1}>
//                           {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

//                             return(
//                               <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                                 <Box>
//                                   <SportsSoccerIcon fontSize='2px'/>
//                                 </Box>

//                                 <Box>
//                                   <Typography variant='caption'>{data_point}</Typography>
//                                 </Box>


//                               </Stack>
//                             )
//                           })}  
//                           </Box>


//                         </Stack>


                                        

//                       </Stack>): ''}
//                   </Stack>
    
//                   <Box marginBottom={1}>
    
//                     <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.Cancelled === 'Yes'? 'Cancelled': item.League}</Typography>
    
//                   </Box>
    
                  
    
//                 </Card>
                
//               </Box>
    
//             )})): <Skeleton variant="rectangular" width={310} height={60} />}
  
//           {/* <Box>
//             <Typography style={{ fontSize: 13, fontWeight: 'bold'}}  sx={{ textAlign: 'center', paddingY: {xs: '5px'}}}>
  
//               View All Fixtures
  
//             </Typography>
//           </Box> */}
  
       
  
  
//       </Box>
//     )

//   }

//   if( page === 'Dfahome'){

//     return(

//       <Box width={{ xs: '90%', sm:'230px', md: '300px', lg: '300px'}} margin='auto' sx={{ backgroundColor: {xs: '#F9F9F9', sm: 'white'}, border: '1px solid #D3E1FF', borderRadius: {xs: '4px'}}} >
  
//         <Typography variant="h6" sx={{ textAlign: 'center', color: 'blue'}}>Game Fixtures</Typography>
  
//         {fixtures_raw ? (fixtures_all.filter(item => item.Complete != 'Yes' ).slice(0,5).map((item, idx) => {
  
//           return(
            
//             <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
  
//               <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>


  
//                 <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
  
//                   <Stack direction='column' spacing={1}>


//                     <Link to={`/DFA/Home/Team/${item.Home_Id}`} style={{ textDecoration: 'none', color: 'blue'}}>
//                       <Typography style={{ fontSize: 12, fontWeight: 'bold' }}>{item.Home}</Typography>
                    
//                     </Link>


//                     <Link to={`/DFA/Home/Team/${item.Away_Id}`} style={{ textDecoration: 'none', color: 'blue'}}>
//                       <Typography style={{ fontSize: 12, fontWeight: 'bold' }}>{item.Away}</Typography>
                    
//                     </Link>
  


  
//                   </Stack>
  
//                   <Stack direction='column' spacing={1}>

//                     {item.HomeScore ? 
                    
//                     (<Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>): 
                    
//                     item.HomeScore === 0 && item.AwayScore != 0? 
                    
//                     (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):
                    
//                     (<Typography style={{ fontSize: 12}}>{item.Date}</Typography>)
//                     }
  
//                     {item.AwayScore? 
                    
//                     (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>):
                    
//                     item.AwayScore === 0 && item.HomeScore != 0? 
                    
//                     (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):
                    
//                     (<Typography  fontStyle={{ fontSize: 12.5}}>{item.Time}</Typography>)
                    
//                     }


//                   </Stack>
  
//                 </Stack>



//                 <Stack marginLeft={2}>

                    
//                   {item.Game_Info != undefined ? (<Stack>

//                     <Box marginTop={2}>
//                       <Typography>Goals</Typography>

//                     </Box>

//                     <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
//                       <Box>Home</Box>
//                       <Box>Away</Box>
//                     </Stack>

//                     <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

//                       <Box paddingTop={1}>
//                       {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

//                         return(
//                           <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                             <Box>
//                               <SportsSoccerIcon fontSize='2px'/>
//                             </Box>

//                             <Box>
//                               <Typography variant='caption'>{data_point}</Typography>
//                             </Box>


//                           </Stack>
//                         )
//                       })}  
//                       </Box>

//                       <Box paddingTop={1}>
//                       {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

//                         return(
//                           <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


//                             <Box>
//                               <SportsSoccerIcon fontSize='2px'/>
//                             </Box>

//                             <Box>
//                               <Typography variant='caption'>{data_point}</Typography>
//                             </Box>


//                           </Stack>
//                         )
//                       })}  
//                       </Box>


//                     </Stack>


                                    

//                   </Stack>): ''}
//                 </Stack>
  
//                 <Box marginTop={1}>
  
//                   <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.League_fullName} | {item.Venue}</Typography>
  
//                 </Box>
  
                
  
//               </Card>

                          
//             </Box>

            
  
//           )})): <Skeleton variant="rectangular" width={310} height={60} />}

//           <Box sx={{ textAlign: 'center', marginY: 1}}>

//             <Link to='/DFA/Fixtures' style={{ textDecoration: 'none'}}>
//               <Typography >View all fixtures</Typography>
            
//             </Link>


//           </Box>

  
//           {/* <Box>
//             <Typography style={{ fontSize: 13, fontWeight: 'bold'}}  sx={{ textAlign: 'center', paddingY: {xs: '5px'}}}>
  
//               View All Fixtures
  
//             </Typography>
//           </Box> */}
  
       
  
  
//       </Box>
//     )

//   }



// }

// export default FixturesData








// import { 
//   Box, 
//   Stack, 
//   Typography, 
//   Card, 
//   Skeleton,
//   Chip,
//   Button,
//   Avatar,
//   Grid,
//   useTheme,
//   useMediaQuery
// } from "@mui/material"
// import { useSelector } from 'react-redux'
// import { Link } from "react-router-dom"
// import {
//   SportsSoccer,
//   LocationOn,
//   AccessTime,
//   CalendarToday,
//   EmojiEvents,
//   Person,
//   ArrowForward
// } from '@mui/icons-material'
// import { useEffect, useState } from 'react'

// // GetFixtures hook (assuming it's a custom hook that fetches fixtures)
// import GetFixtures from "../../modules/Homepage/Fixtures/FixturesDataFetch"


// // Fixture card component for reusability
// const FixtureCard = ({ fixture, showLeague = false, showVenue = true, showGoals = false, compact = false, isHomepage = false }) => {

  

//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'Yes': return '#4CAF50' // Completed
//       case 'Cancelled': return '#F44336' // Cancelled
//       default: return '#FF9800' // Scheduled
//     }
//   }

//   const getStatusText = (status) => {
//     switch(status) {
//       case 'Yes': return 'FT'
//       case 'Cancelled': return 'Cancelled'
//       default: return 'VS'
//     }
//   }

//   return (
//     <Card
//       sx={{
//         marginBottom: 2,
//         borderRadius: 2,
//         overflow: 'hidden',
//         border: `1px solid ${theme.palette.divider}`,
//         backgroundColor: 'rgba(34, 38, 41, 0.95)',
//         backdropFilter: 'blur(10px)',
//         transition: 'all 0.3s ease',
//         '&:hover': {
//           transform: 'translateY(-2px)',
//           boxShadow: '0 8px 25px rgba(255, 107, 0, 0.2)',
//           borderColor: '#FF6B00'
//         }
//       }}
//     >
//       {/* League header */}
//       {showLeague && fixture.LeagueName && (
//         <Box
//           sx={{
//             backgroundColor: 'rgba(255, 107, 0, 0.1)',
//             padding: 1,
//             borderBottom: '1px solid rgba(255, 107, 0, 0.3)'
//           }}
//         >
//           <Typography
//             variant="caption"
//             sx={{
//               color: '#FFD700',
//               fontWeight: 600,
//               textAlign: 'center',
//               display: 'block'
//             }}
//           >
//             {fixture.LeagueName}
//           </Typography>
//         </Box>
//       )}

//       {/* Main fixture content */}
//       <Box sx={{ padding: compact ? 1.5 : 2 }}>
//         {/* Teams and scores */}
//         <Grid container alignItems="center" spacing={compact ? 1 : 2}>
//           {/* Home team */}
//           <Grid item xs={5}>
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <Avatar
//                 src={fixture.HomeLogo}
//                 sx={{
//                   width: compact ? 28 : 36,
//                   height: compact ? 28 : 36,
//                   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                   border: '1px solid rgba(255, 215, 0, 0.3)'
//                 }}
//               >
//                 <Typography variant="caption">{fixture.Home?.charAt(0)}</Typography>
//               </Avatar>
//               <Box sx={{ overflow: 'hidden' }}>
//                 {isHomepage ? (
//                   <Typography
//                     sx={{
//                       color: 'white',
//                       fontWeight: 600,
//                       fontSize: compact ? '0.85rem' : '1rem',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap'
//                     }}
//                   >
//                     {fixture.Home}
//                   </Typography>
//                 ) : (
//                   <Link 
//                     to={`/DFA/Home/Team/${fixture.Home_Id}`} 
//                     style={{ textDecoration: 'none' }}
//                   >
//                     <Typography
//                       sx={{
//                         color: '#FFD700',
//                         fontWeight: 600,
//                         fontSize: compact ? '0.85rem' : '1rem',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         whiteSpace: 'nowrap',
//                         '&:hover': {
//                           color: '#FFED4E',
//                           textDecoration: 'underline'
//                         }
//                       }}
//                     >
//                       {fixture.Home}
//                     </Typography>
//                   </Link>
//                 )}
//               </Box>
//             </Stack>
//           </Grid>

//           {/* Match status and score */}
//           <Grid item xs={2}>
//             <Stack alignItems="center" spacing={0.5}>
//               {fixture.Complete === 'Yes' ? (
//                 <>
//                   <Typography
//                     sx={{
//                       color: 'white',
//                       fontWeight: 700,
//                       fontSize: compact ? '1rem' : '1.2rem',
//                       background: 'linear-gradient(90deg, #FFD700, #FF6B00)',
//                       WebkitBackgroundClip: 'text',
//                       WebkitTextFillColor: 'transparent'
//                     }}
//                   >
//                     {fixture.HomeScore || 0} - {fixture.AwayScore || 0}
//                   </Typography>
//                   <Chip
//                     label="FT"
//                     size="small"
//                     sx={{
//                       backgroundColor: '#4CAF50',
//                       color: 'white',
//                       fontWeight: 600,
//                       fontSize: '0.7rem',
//                       height: 20
//                     }}
//                   />
//                 </>
//               ) : (
//                 <Stack alignItems="center">
//                   <Chip
//                     label="VS"
//                     size="small"
//                     sx={{
//                       backgroundColor: 'rgba(255, 107, 0, 0.2)',
//                       color: '#FF6B00',
//                       fontWeight: 700,
//                       border: '1px solid #FF6B00',
//                       fontSize: compact ? '0.8rem' : '0.9rem'
//                     }}
//                   />
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       color: '#B0B0B0',
//                       mt: 0.5,
//                       textAlign: 'center'
//                     }}
//                   >
//                     {fixture.Date} {fixture.Time}
//                   </Typography>
//                 </Stack>
//               )}
//             </Stack>
//           </Grid>

//           {/* Away team */}
//           <Grid item xs={5}>
//             <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
//               <Box sx={{ overflow: 'hidden', textAlign: 'right' }}>
//                 {isHomepage ? (
//                   <Typography
//                     sx={{
//                       color: 'white',
//                       fontWeight: 600,
//                       fontSize: compact ? '0.85rem' : '1rem',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap'
//                     }}
//                   >
//                     {fixture.Away}
//                   </Typography>
//                 ) : (
//                   <Link 
//                     to={`/DFA/Home/Team/${fixture.Away_Id}`} 
//                     style={{ textDecoration: 'none' }}
//                   >
//                     <Typography
//                       sx={{
//                         color: '#FFD700',
//                         fontWeight: 600,
//                         fontSize: compact ? '0.85rem' : '1rem',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         whiteSpace: 'nowrap',
//                         textAlign: 'right',
//                         '&:hover': {
//                           color: '#FFED4E',
//                           textDecoration: 'underline'
//                         }
//                       }}
//                     >
//                       {fixture.Away}
//                     </Typography>
//                   </Link>
//                 )}
//               </Box>
//               <Avatar
//                 src={fixture.AwayLogo}
//                 sx={{
//                   width: compact ? 28 : 36,
//                   height: compact ? 28 : 36,
//                   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                   border: '1px solid rgba(255, 215, 0, 0.3)'
//                 }}
//               >
//                 <Typography variant="caption">{fixture.Away?.charAt(0)}</Typography>
//               </Avatar>
//             </Stack>
//           </Grid>
//         </Grid>

//         {/* Match details */}
//         <Stack 
//           direction={{ xs: 'column', sm: 'row' }} 
//           spacing={1} 
//           justifyContent="space-between"
//           alignItems={{ xs: 'flex-start', sm: 'center' }}
//           sx={{ mt: compact ? 1 : 1.5 }}
//         >
//           <Stack direction="row" spacing={1.5} alignItems="center">
//             {showVenue && fixture.Venue && fixture.Venue !== 'Cancelled' && (
//               <Stack direction="row" spacing={0.5} alignItems="center">
//                 <LocationOn fontSize="small" sx={{ color: '#4FC3F7', fontSize: 16 }} />
//                 <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
//                   {fixture.Venue}
//                 </Typography>
//               </Stack>
//             )}
            
//             {fixture.Cancelled === 'Yes' && (
//               <Chip
//                 label="CANCELLED"
//                 size="small"
//                 sx={{
//                   backgroundColor: 'rgba(244, 67, 54, 0.2)',
//                   color: '#F44336',
//                   fontWeight: 600,
//                   fontSize: '0.7rem'
//                 }}
//               />
//             )}
//           </Stack>

//           {!compact && (
//             <Typography variant="caption" sx={{ color: '#FFD700' }}>
//               {fixture.League_fullName || fixture.League}
//             </Typography>
//           )}
//         </Stack>

//         {/* Goal scorers */}
//         {showGoals && fixture.Game_Info && (
//           <Box
//             sx={{
//               mt: 2,
//               pt: 2,
//               borderTop: '1px solid rgba(255, 255, 255, 0.1)'
//             }}
//           >
//             <Typography
//               variant="subtitle2"
//               sx={{
//                 color: '#FFD700',
//                 fontWeight: 600,
//                 mb: 1
//               }}
//             >
//               Goal Scorers
//             </Typography>
            
//             <Grid container spacing={2}>
//               {/* Home scorers */}
//               <Grid item xs={6}>
//                 <Stack spacing={0.5}>
//                   {fixture.Game_Info.Goal_Scorers_Home?.map((scorer, index) => (
//                     <Stack key={index} direction="row" alignItems="center" spacing={1}>
//                       <SportsSoccer sx={{ color: '#4CAF50', fontSize: 16 }} />
//                       <Typography variant="caption" sx={{ color: 'white' }}>
//                         {scorer}
//                       </Typography>
//                     </Stack>
//                   ))}
//                   {(!fixture.Game_Info.Goal_Scorers_Home || fixture.Game_Info.Goal_Scorers_Home.length === 0) && (
//                     <Typography variant="caption" sx={{ color: '#B0B0B0', fontStyle: 'italic' }}>
//                       No goals
//                     </Typography>
//                   )}
//                 </Stack>
//               </Grid>

//               {/* Away scorers */}
//               <Grid item xs={6}>
//                 <Stack spacing={0.5} alignItems="flex-end">
//                   {fixture.Game_Info.Goal_Scorers_Away?.map((scorer, index) => (
//                     <Stack key={index} direction="row" alignItems="center" spacing={1}>
//                       <Typography variant="caption" sx={{ color: 'white' }}>
//                         {scorer}
//                       </Typography>
//                       <SportsSoccer sx={{ color: '#4CAF50', fontSize: 16 }} />
//                     </Stack>
//                   ))}
//                   {(!fixture.Game_Info.Goal_Scorers_Away || fixture.Game_Info.Goal_Scorers_Away.length === 0) && (
//                     <Typography variant="caption" sx={{ color: '#B0B0B0', fontStyle: 'italic', textAlign: 'right' }}>
//                       No goals
//                     </Typography>
//                   )}
//                 </Stack>
//               </Grid>
//             </Grid>
//           </Box>
//         )}
//       </Box>
//     </Card>
//   )
// }

// // Loading skeleton component
// const FixtureSkeleton = () => (
//   <Box sx={{ width: '100%', marginBottom: 2 }}>
//     <Skeleton 
//       variant="rectangular" 
//       width="100%" 
//       height={120}
//       sx={{ 
//         borderRadius: 2,
//         backgroundColor: 'rgba(255, 255, 255, 0.1)'
//       }} 
//     />
//   </Box>
// )

// // Main FixturesData component
// const FixturesData = ({ page, type, league }) => {
  
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
//   // Get fixtures data
//   GetFixtures()
//   const fixtures_raw = useSelector((state) => state.fixtures)
  
//   // Process fixtures data
//   const fixtures_all = fixtures_raw?.[0] || []
//   const fixtures_dfa = fixtures_all.filter(item => item.League === league)
  
//   // Filter fixtures based on type
//   const getFilteredFixtures = () => {
//     switch(type) {
//       case 'now':
//         return page === 'home' 
//           ? fixtures_all.filter(item => item.Complete !== 'Yes').slice(0, 5)
//           : fixtures_dfa.filter(item => item.Complete !== 'Yes')
//       case 'past':
//         return fixtures_dfa.filter(item => item.Complete === 'Yes')
//       default:
//         return []
//     }
//   }

//   const filteredFixtures = getFilteredFixtures()
//   const isLoading = !fixtures_raw

//   // Render based on page type
//   const renderFixtures = () => {
//     if (isLoading) {
//       return Array.from({ length: page === 'home' ? 3 : 5 }).map((_, idx) => (
//         <FixtureSkeleton key={idx} />
//       ))
//     }

//     if (filteredFixtures.length === 0) {
//       return (
//         <Box sx={{ textAlign: 'center', py: 4 }}>
//           <EmojiEvents sx={{ fontSize: 48, color: 'rgba(255, 215, 0, 0.3)', mb: 2 }} />
//           <Typography sx={{ color: '#B0B0B0' }}>
//             No fixtures available at the moment
//           </Typography>
//         </Box>
//       )
//     }

//     return filteredFixtures.map((fixture, idx) => (
//       <FixtureCard
//         key={idx}
//         fixture={fixture}
//         showLeague={page === 'home' || page === 'dfa'}
//         showVenue={true}
//         showGoals={type === 'past' && fixture.Game_Info}
//         compact={page === 'home' || page === 'Dfahome'}
//         isHomepage={page === 'home'}
//       />
//     ))
//   }

//   // Component title based on page
//   const getTitle = () => {
//     if (page === 'home') return 'Upcoming Fixtures'
//     if (page === 'Dfahome') return 'League Fixtures'
//     if (type === 'now') return 'Scheduled Fixtures'
//     if (type === 'past') return 'Past Fixtures'
//     return 'Fixtures'
//   }

//   return (
//     <Box 
//       sx={{ 
//         width: '100%',
//         maxWidth: page === 'home' ? 600 : page === 'Dfahome' ? 350 : '100%',
//         margin: 'auto',
//         backgroundColor: '#222629',
//         borderRadius: 2,
//         overflow: 'hidden',
//         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
//         border: '1px solid rgba(255, 107, 0, 0.2)',
//         padding: page === 'home' ? { xs: 2, sm: 3 } : 2
//       }}
//     >
//       {/* Header */}
//       <Stack 
//         direction="row" 
//         justifyContent="space-between" 
//         alignItems="center"
//         sx={{ 
//           mb: 3,
//           pb: 2,
//           borderBottom: '2px solid',
//           borderImage: 'linear-gradient(90deg, #FFD700 0%, #FF6B00 50%, #FFD700 100%) 1'
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{
//             color: 'white',
//             fontWeight: 700,
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1
//           }}
//         >
//           <SportsSoccer sx={{ color: '#FF6B00' }} />
//           {getTitle()}
//         </Typography>
        
//         {type === 'past' && (
//           <Chip
//             label="COMPLETED"
//             sx={{
//               backgroundColor: 'rgba(76, 175, 80, 0.2)',
//               color: '#4CAF50',
//               fontWeight: 600
//             }}
//           />
//         )}
//       </Stack>

//       {/* Fixtures list */}
//       <Box>
//         {renderFixtures()}
//       </Box>

//       {/* View All button for homepage */}
//       {(page === 'home' || page === 'Dfahome') && (
//         <Box sx={{ mt: 3, textAlign: 'center' }}>
//           <Button
//             component={Link}
//             to="/DFA/Fixtures"
//             variant="outlined"
//             endIcon={<ArrowForward />}
//             sx={{
//               color: '#FFD700',
//               borderColor: '#FFD700',
//               borderRadius: '20px',
//               px: 4,
//               fontWeight: 600,
//               '&:hover': {
//                 backgroundColor: 'rgba(255, 215, 0, 0.1)',
//                 borderColor: '#FFED4E',
//                 color: '#FFED4E',
//                 transform: 'translateY(-2px)'
//               },
//               transition: 'all 0.3s ease'
//             }}
//           >
//             View All Fixtures
//           </Button>
//         </Box>
//       )}
//     </Box>
//   )
// }

// export default FixturesData








import { 
  Box, 
  Stack, 
  Typography, 
  Card, 
  Skeleton,
  Chip,
  Button,
  Avatar,
  Grid,
  useTheme,
  useMediaQuery
} from "@mui/material"
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import {
  SportsSoccer,
  LocationOn,
  AccessTime,
  CalendarToday,
  EmojiEvents,
  ArrowForward
} from '@mui/icons-material'

// Import the fixtures data fetch
import GetFixtures from "../../modules/Homepage/Fixtures/FixturesDataFetch"

// Helper function to generate team logo from name
const generateTeamLogo = (teamName, isHome = true) => {
  if (!teamName) return ''
  const encodedName = encodeURIComponent(teamName.substring(0, 2))
  const background = isHome ? 'FF6B00' : '222629'
  const color = isHome ? 'fff' : 'FFD700'
  return `https://ui-avatars.com/api/?name=${encodedName}&background=${background}&color=${color}&bold=true`
}

// Helper function to determine fixture status
const getFixtureStatus = (fixture) => {
  if (fixture.Cancelled === 'Yes') return { text: 'CANCELLED', color: '#F44336' }
  if (fixture.Complete === 'Yes') return { text: 'FT', color: '#4CAF50' }
  return { text: 'VS', color: '#FF6B00' }
}

// Helper function to format score display
const formatScoreDisplay = (fixture) => {
  if (fixture.Complete === 'Yes' && fixture.HomeScore !== null && fixture.AwayScore !== null) {
    return `${fixture.HomeScore || 0} - ${fixture.AwayScore || 0}`
  }
  return null
}

// Fixture card component for reusability
const FixtureCard = ({ fixture, showLeague = false, showVenue = true, showGoals = false, compact = false, isHomepage = false }) => {
  
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  const status = getFixtureStatus(fixture)
  const scoreDisplay = formatScoreDisplay(fixture)

  return (
    <Card
      sx={{
        marginBottom: 2,
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'rgba(34, 38, 41, 0.95)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(255, 107, 0, 0.2)',
          borderColor: '#FF6B00'
        },
      }}
    >
      {/* League header */}
      {showLeague && fixture.LeagueName && (
        <Box
          sx={{
            backgroundColor: 'rgba(255, 107, 0, 0.1)',
            padding: 1,
            borderBottom: '1px solid rgba(255, 107, 0, 0.3)'
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: '#FFD700',
              fontWeight: 600,
              textAlign: 'center',
              display: 'block'
            }}
          >
            {fixture.LeagueName}
          </Typography>
        </Box>
      )}

      {/* Main fixture content */}

      <Box sx={{ padding: compact ? 1.5 : 2 }}>
        
        {/* Teams and scores */}
        <Grid container alignItems="center" spacing={compact ? 1 : 2}>
          {/* Home team */}
          <Grid item xs={5}>
            
            <Stack direction="row" alignItems="center" spacing={1}>
              
              {/* <Avatar
                src={fixture.HomeLogo || generateTeamLogo(fixture.Home, true)}
                sx={{
                  width: compact ? 28 : 36,
                  height: compact ? 28 : 36,
                  backgroundColor: 'rgba(255, 107, 0, 0.2)',
                  border: '1px solid rgba(255, 107, 0, 0.5)',
                  fontSize: compact ? '0.75rem' : '0.875rem'
                }}
              >
                {fixture.Home?.charAt(0) || 'T'}
              </Avatar> */}

              <Box sx={{ overflow: 'hidden' }}>
                {isHomepage ? (
                  <Typography
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      fontSize: compact ? '0.85rem' : '1rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {fixture.Home}
                  </Typography>
                  
                ) : fixture.Home_Id ? (
                  <Link 
                    to={`/DFA/Home/Team/${fixture.Home_Id}`} 
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      sx={{
                        color: '#FFD700',
                        fontWeight: 600,
                        fontSize: compact ? '12px' : '13px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          color: '#FFED4E',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {fixture.Home}    {/* Phone */}
                    </Typography>
                  </Link>
                ) : (
                  <Typography
                    sx={{
                      color: '#FFD700',
                      fontWeight: 600,
                      fontSize: compact ? '0.85rem' : '1rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {fixture.Home}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Grid>

          {/* Match status and score */}
          <Grid item xs={2}>
            
            <Stack alignItems="center" spacing={0.5} >
              {scoreDisplay ? (
                <>
                  <Typography
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: compact ? '1rem' : '16px',
                      background: 'linear-gradient(90deg, #FFD700, #FF6B00)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {scoreDisplay}
                  </Typography>

                  <Chip
                    label={status.text}
                    size="small"
                    sx={{
                      backgroundColor: `${status.color}20`,
                      color: status.color,
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: 20,
                      border: `1px solid ${status.color}40`
                    }}
                  />
                </>
              ) : (
                <Stack alignItems="center">
                  <Chip
                    label={status.text}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255, 107, 0, 0.2)',
                      color: '#FF6B00',
                      fontWeight: 700,
                      border: '1px solid #FF6B00',
                      fontSize: compact ? '0.8rem' : '0.9rem'
                    }}
                  />
                  {!compact && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#B0B0B0',
                        mt: 0.5,
                        textAlign: 'center'
                      }}
                    >
                      {/* {fixture.Time}  */}
                    </Typography>
                  )}
                </Stack>
              )}
            </Stack>
          </Grid>

          {/* Away team */}
          <Grid item xs={5}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
              <Box sx={{ overflow: 'hidden', textAlign: 'right' }}>
                {isHomepage ? (
                  <Typography
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      fontSize: compact ? '0.85rem' : '1rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {fixture.Away}
                  </Typography>
                ) : fixture.Away_Id ? (
                  <Link 
                    to={`/DFA/Home/Team/${fixture.Away_Id}`} 
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      sx={{
                        color: '#FFD700',
                        fontWeight: 600,
                        fontSize: compact ? '12px' : '13px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        textAlign: 'right',
                        '&:hover': {
                          color: '#FFED4E',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {fixture.Away}
                    </Typography>
                  </Link>
                ) : (
                  <Typography
                    sx={{
                      color: '#FFD700',
                      fontWeight: 600,
                      fontSize: compact ? '0.85rem' : '1rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      textAlign: 'right'
                    }}
                  >
                    {fixture.Away}
                  </Typography>
                )}
              </Box>
              {/* <Avatar
                src={fixture.AwayLogo || generateTeamLogo(fixture.Away, false)}
                sx={{
                  width: compact ? 28 : 36,
                  height: compact ? 28 : 36,
                  backgroundColor: 'rgba(34, 38, 41, 0.8)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  fontSize: compact ? '0.75rem' : '0.875rem'
                }}
              >
                {fixture.Away?.charAt(0) || 'T'}
              </Avatar> */}
            </Stack>
          </Grid>
        </Grid>

        {/* Match details - compact view shows less info */}
        {!compact && (
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={1} 
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            sx={{ mt: 1.5 }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              {showVenue && fixture.Venue && fixture.Venue !== 'Cancelled' && (
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <LocationOn fontSize="small" sx={{ color: '#4FC3F7', fontSize: 16 }} />

                  <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                    {fixture.Venue}
                  </Typography>

                  <Typography variant="caption" fontWeight={900} sx={{ color: '#B0B0B0', paddingLeft: 2, letterSpacing: 2 }}>
                    {fixture.Time}
                  </Typography>
                </Stack>
              )}
              
              {fixture.Cancelled === 'Yes' && (
                <Chip
                  label="CANCELLED"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(244, 67, 54, 0.2)',
                    color: '#F44336',
                    fontWeight: 600,
                    fontSize: '0.7rem'
                  }}
                />
              )}
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              {!scoreDisplay && (
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <CalendarToday fontSize="small" sx={{ color: '#90EE90', fontSize: 14 }} />
                  <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                    {fixture.Date}
                  </Typography>
                </Stack>
              )}
              <Typography variant="caption" sx={{ color: '#FFD700' }}>
                {fixture.League_fullName}
              </Typography>
            </Stack>
          </Stack>
        )}

        {/* Compact view date/time */}
        {compact && !scoreDisplay && (
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <CalendarToday fontSize="small" sx={{ color: '#90EE90', fontSize: 12 }} />
              <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                {fixture.Date}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <AccessTime fontSize="small" sx={{ color: '#4FC3F7', fontSize: 12 }} />
              <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                {fixture.Time}
              </Typography>
            </Stack>
          </Stack>
        )}

        {/* Goal scorers */}
        {showGoals && fixture.Game_Info && (
          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: '#FFD700',
                fontWeight: 600,
                mb: 1
              }}
            >
              Goal Scorers
            </Typography>
            
            <Grid container spacing={2}>
              {/* Home scorers */}
              <Grid item xs={6}>
                <Stack spacing={0.5}>
                  {fixture.Game_Info.Goal_Scorers_Home?.map((scorer, index) => (
                    <Stack key={index} direction="row" alignItems="center" spacing={1}>
                      <SportsSoccer sx={{ color: '#4CAF50', fontSize: 16 }} />
                      <Typography variant="caption" sx={{ color: 'white' }}>
                        {scorer}
                      </Typography>
                    </Stack>
                  ))}
                  {(!fixture.Game_Info.Goal_Scorers_Home || fixture.Game_Info.Goal_Scorers_Home.length === 0) && (
                    <Typography variant="caption" sx={{ color: '#B0B0B0', fontStyle: 'italic' }}>
                      No goals
                    </Typography>
                  )}
                </Stack>
              </Grid>

              {/* Away scorers */}
              <Grid item xs={6}>
                <Stack spacing={0.5} alignItems="flex-end">
                  {fixture.Game_Info.Goal_Scorers_Away?.map((scorer, index) => (
                    <Stack key={index} direction="row" alignItems="center" spacing={1}>
                      <Typography variant="caption" sx={{ color: 'white' }}>
                        {scorer}
                      </Typography>
                      <SportsSoccer sx={{ color: '#4CAF50', fontSize: 16 }} />
                    </Stack>
                  ))}
                  {(!fixture.Game_Info.Goal_Scorers_Away || fixture.Game_Info.Goal_Scorers_Away.length === 0) && (
                    <Typography variant="caption" sx={{ color: '#B0B0B0', fontStyle: 'italic', textAlign: 'right' }}>
                      No goals
                    </Typography>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Card>
  )
}

// Loading skeleton component
const FixtureSkeleton = ({ compact = false }) => (
  <Box sx={{ width: '100%', marginBottom: 2 }}>
    <Skeleton 
      variant="rectangular" 
      width="100%" 
      height={compact ? 80 : 120}
      sx={{ 
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }} 
    />
  </Box>
)

// Main FixturesData component
const FixturesData = ({ page, type, league }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  // Get fixtures data
  GetFixtures()
  const fixtures_raw = useSelector((state) => state.fixtures)
  
  // Process fixtures data based on your object structure
  const fixtures_all = fixtures_raw?.[0] || []
  
  // Filter fixtures based on league (using League property for filtering)
  const fixtures_filtered = league 
    ? fixtures_all.filter(item => item.League === league || item.LeagueName === league)
    : fixtures_all
  
  // Filter fixtures based on type
  const getFilteredFixtures = () => {
    switch(type) {
      case 'now':
        return page === 'home' || page === 'Dfahome'
          ? fixtures_filtered.filter(item => item.Complete !== 'Yes' && item.Cancelled !== 'Yes').slice(0, 5)
          : fixtures_filtered.filter(item => item.Complete !== 'Yes' && item.Cancelled !== 'Yes')
      case 'past':
        return fixtures_filtered.filter(item => item.Complete === 'Yes')
      default:
        return fixtures_filtered
    }
  }

  const filteredFixtures = getFilteredFixtures()
  const isLoading = !fixtures_raw || fixtures_raw.length === 0

  // Render based on page type
  const renderFixtures = () => {
    if (isLoading) {
      const skeletonCount = page === 'home' || page === 'Dfahome' ? 3 : 5
      return Array.from({ length: skeletonCount }).map((_, idx) => (
        <FixtureSkeleton key={idx} compact={page === 'home' || page === 'Dfahome'} />
      ))
    }

    if (filteredFixtures.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <EmojiEvents sx={{ fontSize: 48, color: 'rgba(255, 215, 0, 0.3)', mb: 2 }} />
          <Typography sx={{ color: '#B0B0B0' }}>
            No fixtures available at the moment
          </Typography>
        </Box>
      )
    }

    return filteredFixtures.map((fixture, idx) => (
      <FixtureCard
        key={idx}
        fixture={fixture}
        showLeague={page === 'home' || page === 'dfa' || page === 'div_1' || page === 'daba'}
        showVenue={true}
        showGoals={type === 'past' && fixture.Game_Info}
        compact={page === 'home' || page === 'Dfahome'}
        isHomepage={page === 'home'}
      />
    ))
  }

  // Component title based on page and league
  const getTitle = () => {
    if (page === 'home') return 'Upcoming Fixtures'
    if (page === 'Dfahome') return 'League Fixtures'
    if (type === 'now') return 'Scheduled Fixtures'
    if (type === 'past') return 'Past Fixtures'
    
    // Get league display name from first fixture if available
    if (filteredFixtures.length > 0) {
      const leagueName = filteredFixtures[0]?.League_fullName || filteredFixtures[0]?.LeagueName
      return leagueName ? `${leagueName} Fixtures` : 'Game Fixtures'
    }
    
    return 'Game Fixtures'
  }

  return (
    <Box 
      sx={{ 
        width: '100%',
        maxWidth: page === 'home' ? 600 : page === 'Dfahome' ? 350 : '100%',
        margin: 'auto',
        backgroundColor: '#222629',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 107, 0, 0.2)',
        padding: page === 'home' || page === 'Dfahome' ? { xs: 2, sm: 3 } : 2
      }}
    >
      {/* Header */}
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center"
        sx={{ 
          mb: 3,
          pb: 2,
          borderBottom: '2px solid',
          borderImage: 'linear-gradient(90deg, #FFD700 0%, #FF6B00 50%, #FFD700 100%) 1'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            fontWeight: 700,
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <SportsSoccer sx={{ color: '#FF6B00' }} />
          {getTitle()}
        </Typography>
        
        {type === 'past' && (
          <Chip
            label="COMPLETED"
            sx={{
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              color: '#4CAF50',
              fontWeight: 600,
              fontSize: { xs: '0.7rem', sm: '0.8rem' }
            }}
          />
        )}
      </Stack>

      {/* Fixtures list */}
      <Box>
        {renderFixtures()}
      </Box>

      {/* View All button for homepage and Dfahome */}
      {(page === 'home' || page === 'Dfahome') && filteredFixtures.length > 0 && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          
          <Button
            component={Link}
            to="/DFA/Fixtures"
            variant="outlined"
            endIcon={<ArrowForward />}
            sx={{
              color: '#FFD700',
              borderColor: '#FFD700',
              borderRadius: '20px',
              px: 4,
              fontWeight: 600,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              '&:hover': {
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                borderColor: '#FFED4E',
                color: '#FFED4E',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            View All Fixtures
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default FixturesData