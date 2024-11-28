import CardHeader from '@mui/material/CardHeader' // ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'
import RadioGroup from '@mui/material/RadioGroup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components

// ** Types

import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import EcommerceTotalSalesRadial from 'src/views/dashboards/ecommerce/EcommerceTotalSalesRadial'
import { Radio } from '@mui/material'

const cardData = [
  { title: 'Projet 1', percentage: 100 },
  { title: 'Projet 2', percentage: 40 },

  { title: 'Projet 3', percentage: 60 },
  { title: 'Projet 4', percentage: 80 },

  { title: 'Projet 5', percentage: 70 },
  { title: 'Projet 6', percentage: 100 }
]

const data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/4.png'
}

const Home = () => {
  const [openDialog, setOpenDialog] = useState(false)
  // Dialog open/close handlers
  const handleDialogOpen = () => setOpenDialog(true)
  const handleDialogClose = () => setOpenDialog(false)

  return (
    <Grid container spacing={6}>
      <Grid container alignItems='center' justifyContent='space-between' sx={{ mt: 5, mb: 5 }}>
        <Grid item>
          <Typography variant='h5'>Créer un nouveau Projet</Typography>
        </Grid>
        <Grid item>
          <Button variant='contained' color='primary' onClick={handleDialogOpen}>
            Nouveau Projet
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {cardData.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 3
              }}
            >
              <CardHeader title={data.title} sx={{ textAlign: 'center', fontWeight: 'bold' }} />
              <CardContent
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <EcommerceTotalSalesRadial percentage={data.percentage} />
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle sx={{ mt: 2, mb: 2 }}>Ajouter un fichier de projet</DialogTitle>
          <DialogContent>
            <Grid container spacing={11}>
              <Grid item xs={12} sx={{mt : 4}}>
                <TextField fullWidth label='Numéro de Projet' />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='Nom de Projet' />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Priorisation Opérationnelle</InputLabel>
                  <Select defaultValue='Haute'>
                    <MenuItem value='Haute'>Haute</MenuItem>
                    <MenuItem value='Moyenne'>Moyenne</MenuItem>
                    <MenuItem value='Basse'>Basse</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='Année' type='number' />
              </Grid>
              <Grid item xs={12}>
                <FormControl component='fieldset'>
                  <RadioGroup row defaultValue='Non débuté'>
                    <FormControlLabel value='En cours' control={<Radio />} label='En cours' />
                    <FormControlLabel value='En suspens' control={<Radio />} label='En suspens' />
                    <FormControlLabel value='Terminé' control={<Radio />} label='Terminé' />
                    <FormControlLabel value='Non débuté' control={<Radio />} label='Non débuté' />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color='secondary'>
              Annuler
            </Button>
            <Button variant='contained' color='primary' onClick={handleDialogClose}>
              Créer
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default Home
