import { Typography } from '@mui/material';
import { Box } from '@mui/material'

const ParagraphsDisplay = ({ paragraphs }) => {



  const paragraph = paragraphs.split('\n');


  return (
    <div>
      {paragraph.map((item, idx) => {
         return (

          <Box key={idx} marginTop={2.5}> 
            <Typography>
              {item}
            </Typography>
          </Box>)
        
      })}
    </div>
  )
}

export default ParagraphsDisplay