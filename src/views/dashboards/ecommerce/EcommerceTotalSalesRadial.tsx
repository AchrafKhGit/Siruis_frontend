import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'


// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import RadioGroup from '@mui/material/RadioGroup'
import { Radio } from '@mui/material'


import { useTheme } from '@mui/material/styles';

const EcommerceTotalSalesRadial = ({ percentage }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const [openEdit, setOpenEdit] = useState(false); 

  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
      height: 350 
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '60%' }, 
        dataLabels: {
          name: {
            fontSize: '18px',
            color: isDarkMode ? '#FFFFFF' : undefined, // Dynamic color based on theme
            offsetY: -10
          },
          value: {
            fontSize: '20px',  // Increased font size for better visibility
            color: isDarkMode ? '#FFFFFF' : undefined, // Dynamic color based on theme
            offsetY: 5  // Adjusted offset to center the percentage better
          },
          total: {
            show: true,
            label: 'Total',
            color: isDarkMode ? '#FFFFFF' : undefined, // Dynamic color based on theme
            formatter: () => `${percentage}%`  // Display only the percentage
          }
        }
      }
    },
    fill: {
      type: 'solid',
      colors: ['#8ABFA3']  // Customize this color based on your preferences
    },
    
    labels: ['Progress']
  };
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item>
        <ReactApexcharts options={options} series={[percentage]} type="radialBar" height={200} />
      </Grid>
        <Button variant='contained' onClick={handleEditClickOpen} sx={{ mt: 2 }}>
          Details
        </Button>

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='user-view-edit'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
        aria-describedby='user-view-edit-description'
      >
        <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
          Details de fiche de projet
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={11}>
            <Grid item xs={12} sx={{mt : 4}}>
            <Typography variant='body1' sx={{mb : 2, color: 'black'}}>Année</Typography>
            <TextField fullWidth value={2024}/>
              </Grid>
              <Grid item xs={12}>
              <Typography variant='body1' sx={{mb : 2, color: 'black'}}>Nom de projet</Typography>
              <TextField fullWidth value='Projet mise à jour'/>
              </Grid>
              <Grid item xs={12} sx={{mt : 4}}>
              <Typography variant='body1' sx={{mb : 2, color: 'black'}}>Numéro de projet</Typography>
              <TextField fullWidth value='P-001'/>
              </Grid>
              <Grid item xs={12} sx={{mt : 4}}>
              <Typography variant='body1' sx={{mb : 2, color: 'black'}}>Nom du demandeur</Typography>
                <TextField fullWidth value='Bouziane Marouane'/>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Typography variant='body1' sx={{mb : 2, color: 'black'}}>Département</Typography>

                  <Select defaultValue='Haute'>
                    <MenuItem value='Haute'>Informatique</MenuItem>
                    <MenuItem value='Moyenne'>Fonctionelle</MenuItem>
                    <MenuItem value='Basse'>Opérationelle</MenuItem>
                    <MenuItem value='Basse'>Administratif</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
   
              <Grid item xs={12}>
                <FormControl component='fieldset'>
                  <Typography variant='body1' sx={{mb : 2, color: 'black'}} >Status du projet</Typography>
                  <RadioGroup row defaultValue='Non débuté'>
                    <FormControlLabel value='En cours' control={<Radio />} label='En cours' />
                    <FormControlLabel value='En suspens' control={<Radio />} label='En suspens' />
                    <FormControlLabel value='Terminé' control={<Radio />} label='Terminé' />
                    <FormControlLabel value='Non débuté' control={<Radio />} label='Non débuté' />
                  </RadioGroup>
                </FormControl>
              </Grid>              
              <Grid item xs={12}>
                <FormControl component='fieldset'>
                <Typography >Priorisation Opérationnelle</Typography>
                  <RadioGroup row defaultValue='Non débuté'>
                    <FormControlLabel value='En cours' control={<Radio />} label='Obligatoire' />
                    <FormControlLabel value='En suspens' control={<Radio />} label='élevé' />
                    <FormControlLabel value='Terminé' control={<Radio />} label='Moyen' />
                    <FormControlLabel value='Non débuté' control={<Radio />} label='Faible' />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-start' }}>
          <Button variant='contained' sx={{ mr: 1 }} onClick={handleEditClose}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default EcommerceTotalSalesRadial
