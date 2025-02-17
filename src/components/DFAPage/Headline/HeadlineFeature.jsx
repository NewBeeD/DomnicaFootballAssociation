import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'



import { useState, useEffect } from 'react'

import qs from 'qs'
import axios from "axios"
import { queryParams_headlinefeature } from '../../../modules/DFA/QueryParams'
import headlineFeatureModule from './headlineFeatureStructure'




const HeadlineFeature = () => {


  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        // Set loading to true when starting the fetch
        setLoading(true);

        const queryString = qs.stringify(queryParams_headlinefeature);

        // Your API endpoint URL
        // const apiUrl = `https://strapi-dominica-sport.onrender.com/api/headline-features/${id}?${queryParams_headlinefeature}`;
        const apiUrl = `https://strapi-dominica-sport.onrender.com/api/headline-features?populate=*`;
  

        // Make the fetch request
        const response = await axios.get(apiUrl);

        // Check if the request was successful (status code 2xx)
        if (response.status !== 200) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the JSON data
        const result = await response.data.data;        

        let final_data = headlineFeatureModule(result)        
                              
        // Set the data state
        setArticles(final_data);
        // setModalIsOpen(true);
      } catch (error) {
        // Set the error state if there's an issue
        setError(error.message);
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }


    };

    // Call the fetchData function when the component mounts
    fetchData();

  }, []);
  
  
  return (

    <Box 
    width='100%'
    sx={{ backgroundColor: '#222629'}}
    paddingTop={0}
    borderRadius={{sm: 2}}
    >

    <Stack 
      width={{xs: '99%', sm: '100%'}} 
      margin={{xs:'auto'}} 
      height={{ xs: 570, sm: 450}}
      borderRadius={1}
    >

      <Stack 
      direction={{xs:'column', sm:'row'}} 
      spacing={2}
      justifyContent={{xs: 'center'}}
      alignItems={{xs: 'center'}}
      >

        <Box 
        maxWidth={{xs: '100%',sm:'70%'}}
        margin='auto'
        >

          {articles && (
            
            // Major Headlines
            <Box 
            marginBottom={2} 
            >
              
              <Box
                display={{xs: 'none', sm: 'inherit'}} 
                sx={{ width: {sm: 480},  marginY: 1, backgroundColor: '#222629', padding: {xs: 1}}}
                >
  
                  <img  
                    loading='lazy'
                    height={350} 
                    width='100%'
                    src={articles[0].image} 
                    alt='News Image'
                    style={{ borderRadius: '5px', objectFit: 'cover', objectPosition: "50% 50%"}}
                  />

                  <Box paddingLeft={1}>

                    <Stack direction={{ xs: 'column'}}>

                      <Typography variant='caption' color='grey' fontWeight={900}>{articles[0].type}</Typography>

                      <Typography variant='h6' color='white' fontWeight={900}>{articles[0].title}</Typography>

                    </Stack>

                  </Box>
    
              </Box>

              <Box
                display={{sm: 'none'}} 
                sx={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: { xs: 330, sm: 430 }, 
                  marginY: 1, 
                  backgroundColor: '#222629', 
                  padding: { xs: 1 },
                  borderRadius: '5px', 
                  overflow: 'hidden'
                }}
              >
                
                {/* Image */}
                <img  
                  loading='lazy'
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    objectPosition: '50% 50%', 
                    borderRadius: '5px' 
                  }}
                  src={articles[0].image} 
                  alt='News Image'
                />

                {/* Overlay */}
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust opacity here
                    borderRadius: '5px'
                  }} 
                />

                {/* Text Content */}
                <Box sx={{ position: 'absolute', bottom: 10, left: 15 }}>
                  <Stack direction="column">
                    <Typography variant='caption' color='grey' fontWeight={900}>
                      {articles[0].type}
                    </Typography>
                    <Typography variant='h6' color='white' fontWeight={900}>
                      {articles[0].title}
                    </Typography>
                  </Stack>
                </Box>
              </Box>


            </Box>
          )}

        </Box>



        <Box 
        width='100%'
        >

          {/* Minor headlines */}
          <Stack 
          direction={{xs:'row', sm: 'column'}} 
          spacing={2}
          justifyContent={{xs: 'center'}}>

            {articles && articles.slice(1).map((item, idx) => {


                return(

                  <Box 
                  key={idx}
                  sx={{width: {sm: 240},marginY: 1, backgroundColor: '#222629'}}>

                    <img 
                      loading='lazy'
                      height={120} 
                      width='100%'
                      src={item.image} 
                      alt='News Image'
                      style={{ objectFit: 'cover', objectPosition: "50% 50%"}}
                      />

                    <Box paddingLeft={1}>

                      <Stack direction={{ xs: 'column'}}>

                        <Typography variant='caption' color='grey' fontWeight={900}>{item.type}</Typography>

                        <Typography variant='body2' color='white' fontWeight={900}>{item.title}</Typography>

                      </Stack>

                    </Box>

                  </Box>

                //   <Box 
                //   sx={{ 
                //     position: 'relative', 
                //     width: '100%', 
                //     height: { xs: 330, sm: 430 }, 
                //     marginY: 1, 
                //     backgroundColor: '#222629', 
                //     padding: { xs: 1 },
                //     borderRadius: '5px', 
                //     overflow: 'hidden'
                //   }}
                // >
                  
                //   {/* Image */}
                //   <img  
                //     loading='lazy'
                //     style={{ 
                //       width: '100%', 
                //       height: '100%', 
                //       objectFit: 'cover', 
                //       objectPosition: '50% 50%', 
                //       borderRadius: '5px' 
                //     }}
                //     src={item.image} 
                //     alt='News Image'
                //   />
  
                //   {/* Overlay */}
                //   <Box 
                //     sx={{ 
                //       position: 'absolute', 
                //       top: 0, 
                //       left: 0, 
                //       width: '100%', 
                //       height: '100%', 
                //       backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust opacity here
                //       borderRadius: '5px'
                //     }} 
                //   />
  
                //   {/* Text Content */}
                //   <Box sx={{ position: 'absolute', bottom: 10, left: 15 }}>
                //     <Stack direction="column">
                //       <Typography variant='caption' color='grey' fontWeight={900}>
                //         {item.type}
                //       </Typography>
                //       <Typography variant='h6' color='white' fontWeight={900}>
                //         {item.title}
                //       </Typography>
                //     </Stack>
                //   </Box>
                // </Box>

                )

              
            })}

          </Stack>

        </Box>
        
      </Stack>

    </Stack>


    
    </Box>

    
  )
}

export default HeadlineFeature