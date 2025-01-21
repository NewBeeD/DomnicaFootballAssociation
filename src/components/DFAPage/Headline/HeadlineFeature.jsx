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

        console.log(final_data);
        
                              
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
      width={{xs: '90%', sm: '100%'}} 
      margin={{xs:'auto'}} 
      height={{ xs: 570, sm: 500}}
      borderRadius={1}
    >

      <Stack 
      direction={{xs:'column', sm:'row'}} 
      >

        <Box 
        maxWidth={{xs: '95%',sm:'70%'}}
        margin='auto'
        >

          {articles && (
            
            <Box 
            marginBottom={2} 
            >
              
              <Card 
                sx={{ width: '100%', height: {xs:330, sm: 430}, marginY: 1, backgroundColor: '#222629', padding: {xs: 1}}}
                >
  
                  <CardMedia 
                    component='img' 
                    loading='lazy'
                    maxHeight={300} 
                    src={articles[0].image} 
                    alt='News Image'
                    sx={{ objectFit: 'cover', objectPosition: "50% 50%"}}
                    />

                    <Box paddingLeft={1}>

                      <Stack direction={{ xs: 'column'}}>

                        <Typography variant='caption' color='white' fontWeight={900}>{articles[0].type}</Typography>

                        <Typography variant='h6' color='white' fontWeight={900}>{articles[0].title}</Typography>

                      </Stack>

                    </Box>
    
              </Card>
            </Box>
          )}

        </Box>



        <Box marginRight={{sm: 1}}>

          <Stack 
          direction={{xs:'row', sm: 'column'}} 
          spacing={2}>

            {articles && articles.slice(1).map((item, idx) => {


                return(

                  <Card 
                  key={idx}
                  sx={{height: 200, marginY: 1, backgroundColor: '#222629'}}>

                    <CardMedia 
                      component='img' 
                      loading='lazy'
                      height={120} 
                      src={item.image} 
                      alt='News Image'
                      sx={{ objectFit: 'cover', objectPosition: "50% 50%"}}
                      />

                    <Box paddingLeft={1}>

                      <Stack direction={{ xs: 'column'}}>

                        <Typography variant='caption' color='white' fontWeight={900}>{item.type}</Typography>

                        <Typography variant='body2' color='white' fontWeight={900}>{item.title}</Typography>

                      </Stack>

                    </Box>

                  </Card>

                )

              
            })}

          </Stack>

        </Box>
        
      </Stack>

    </Stack>

    <Box 
    width={2}
    height={20} />
    
    </Box>

    
  )
}

export default HeadlineFeature