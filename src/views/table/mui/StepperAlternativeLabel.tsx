// ** React Imports
import { ChangeEvent, Fragment, MouseEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Objectifs from 'src/views/table/mui/Objectifs'
import Livrables from 'src/views/table/mui/Livrables'
import RH from 'src/views/table/mui/RH'
import RM from 'src/views/table/mui/RM'
import StakeholdersTable from 'src/views/table/mui/Stakeholder'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { CardHeader, Dialog, Radio } from '@mui/material'

interface State {
  password: string
  password2: string
  showPassword: boolean
  showPassword2: boolean
}

const steps = [
  {
    title: 'Scoop de Projet',
    subtitle: 'la gestion dynamique de projet'
  },
  {
    title: 'Livrables',
    subtitle: 'Registre des biens livrables'
  },
  {
    title: 'Ressources',
    subtitle: 'Gestion et importation des ressources'
  },
  {
    title: 'Stakeholders',
    subtitle: 'Liste des personnes ayant des interets dans le projet'
  },
  {
    title: 'Time Management',
    subtitle: 'Planification (phases, taches, activités)'
  }
]

const StepperAlternativeLabel = () => {
  // ** States
  const [email, setEmail] = useState<string>('')
  const [google, setGoogle] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [twitter, setTwitter] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [facebook, setFacebook] = useState<string>('')
  const [linkedIn, setLinkedIn] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [activeStep, setActiveStep] = useState<number>(0)
  const [language, setLanguage] = useState<string[]>([])
  const [state, setState] = useState<State>({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  const [openDialog, setOpenDialog] = useState(false)
  // Dialog open/close handlers
  const handleDialogOpen = () => setOpenDialog(true)
  const handleDialogClose = () => setOpenDialog(false)
  const handleReset = () => {
    setEmail('')
    setGoogle('')
    setCountry('')
    setTwitter('')
    setUsername('')
    setLastName('')
    setFacebook('')
    setLinkedIn('')
    setLanguage([])
    setFirstName('')
    setActiveStep(0)
    setState({ ...state, password: '', password2: '' })
  }

  // Handle Password
  const handlePasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [prop]: event.target.value })
  }
  const handleClickShowConfirmPassword = () => {
    setState({ ...state, showPassword2: !state.showPassword2 })
  }
  const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Language
  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label='Introduction'
                value={username}
                placeholder='Introduction'
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Nature de projet'
                value={email}
                placeholder='Définir sommaire du projet'
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='date'
                value={email}
                placeholder='Date de début'
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Context'
                value={email}
                placeholder='Définir sommaire du projet'
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 10, textAlign: 'center' }}>
              <Card>
                <CardHeader title='Liste des objectifs' />
                <Objectifs />
              </Card>
              <Button variant='contained' color='primary' sx={{ mt: 10 }} onClick={handleDialogOpen}>
                Ajouter un objectif
              </Button>

              <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle sx={{ mt: 2, mb: 2 }}>Ajouter un objectif</DialogTitle>
                <DialogContent>
                  <Grid container spacing={11}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Nom d'Objectif" />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Catégories</InputLabel>
                        <Select defaultValue='Haute'>
                          <MenuItem value='Haute'>Serivice Client</MenuItem>
                          <MenuItem value='Moyenne'>Service Entreprise</MenuItem>
                          <MenuItem value='Basse'>Bénefice</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label='Description'
                        value={email}
                        placeholder='Description'
                        onChange={e => setEmail(e.target.value)}
                      />{' '}
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
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sx={{ mt: 10, textAlign: 'center' }}>
              <Card>
                <CardHeader title='Liste des livrables' />
                <Livrables />
              </Card>
              <Button variant='contained' color='primary' sx={{ mt: 10 }} onClick={handleDialogOpen}>
                Ajouter un livrable
              </Button>

              <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle sx={{ mt: 2, mb: 2 }}>Ajouter un livrable</DialogTitle>
                <DialogContent>
                  <Grid container spacing={11}>
                    <Grid item xs={12}>
                      <TextField fullWidth label='Nom livrable' />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Rapport</InputLabel>
                        <Select defaultValue='Rapport'>
                          <MenuItem value='Rapport 1'>Rapport 1</MenuItem>
                          <MenuItem value='Rapport 2'>Rapport 2</MenuItem>
                          <MenuItem value='Rapport 3'>Rapport 3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label='Description'
                        value={email}
                        placeholder='Description'
                        onChange={e => setEmail(e.target.value)}
                      />{' '}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Responsable</InputLabel>
                        <Select defaultValue='Haute'>
                          <MenuItem value='Personne 1'>Personne 1</MenuItem>
                          <MenuItem value='Personne 2'>Personne 2</MenuItem>
                          <MenuItem value='Personne 3'>Personne 3</MenuItem>
                          <MenuItem value='Personne 4'>Personne 4</MenuItem>
                          <MenuItem value='Personne 5'>Personne 5</MenuItem>
                        </Select>
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
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sx={{ mt: 10, textAlign: 'center' }}>
              <Card>
                <CardHeader title='Ressources Humaines' />
                <RH />
              </Card>
              <Button variant='contained' color='primary' sx={{ mt: 10 }} onClick={handleDialogOpen}>
                Ajouter un Ressource Humaine
              </Button>

              <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle sx={{ mt: 2, mb: 2 }}>Ajouter un livrable</DialogTitle>
                <DialogContent>
                  <Grid container spacing={11}>
                    <Grid item xs={12}>
                      <TextField fullWidth label='Nom livrable' />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Rapport</InputLabel>
                        <Select defaultValue='Rapport'>
                          <MenuItem value='Rapport 1'>Rapport 1</MenuItem>
                          <MenuItem value='Rapport 2'>Rapport 2</MenuItem>
                          <MenuItem value='Rapport 3'>Rapport 3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label='Description'
                        value={email}
                        placeholder='Description'
                        onChange={e => setEmail(e.target.value)}
                      />{' '}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Responsable</InputLabel>
                        <Select defaultValue='Haute'>
                          <MenuItem value='Personne 1'>Personne 1</MenuItem>
                          <MenuItem value='Personne 2'>Personne 2</MenuItem>
                          <MenuItem value='Personne 3'>Personne 3</MenuItem>
                          <MenuItem value='Personne 4'>Personne 4</MenuItem>
                          <MenuItem value='Personne 5'>Personne 5</MenuItem>
                        </Select>
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
            <Grid item xs={12} sx={{ mt: 10, textAlign: 'center' }}>
              <Card>
                <CardHeader title='Ressources Matérielles' />
                <RM />
              </Card>
              <Button variant='contained' color='primary' sx={{ mt: 10 }} onClick={handleDialogOpen}>
                Ajouter un Ressource Matérielle
              </Button>

              <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle sx={{ mt: 2, mb: 2 }}>Ajouter un livrable</DialogTitle>
                <DialogContent>
                  <Grid container spacing={11}>
                    <Grid item xs={12}>
                      <TextField fullWidth label='Nom livrable' />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Rapport</InputLabel>
                        <Select defaultValue='Rapport'>
                          <MenuItem value='Rapport 1'>Rapport 1</MenuItem>
                          <MenuItem value='Rapport 2'>Rapport 2</MenuItem>
                          <MenuItem value='Rapport 3'>Rapport 3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label='Description'
                        value={email}
                        placeholder='Description'
                        onChange={e => setEmail(e.target.value)}
                      />{' '}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Responsable</InputLabel>
                        <Select defaultValue='Haute'>
                          <MenuItem value='Personne 1'>Personne 1</MenuItem>
                          <MenuItem value='Personne 2'>Personne 2</MenuItem>
                          <MenuItem value='Personne 3'>Personne 3</MenuItem>
                          <MenuItem value='Personne 4'>Personne 4</MenuItem>
                          <MenuItem value='Personne 5'>Personne 5</MenuItem>
                        </Select>
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
          </Fragment>
        )
      case 3:
        return (
          <Fragment>
            <Grid item xs={12} sx={{ mt: 10, textAlign: 'center' }}>
              <Card>
                <CardHeader title='Stakeholder' />
                <StakeholdersTable />
              </Card>
              <Button variant='contained' color='primary' sx={{ mt: 10 }} onClick={handleDialogOpen}>
                Ajouter un Stakeholder
              </Button>

              <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle sx={{ mt: 2, mb: 2 }}>Ajouter un livrable</DialogTitle>
                <DialogContent>
                  <Grid container spacing={11}>
                    <Grid item xs={12}>
                      <TextField fullWidth label='Nom livrable' />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Rapport</InputLabel>
                        <Select defaultValue='Rapport'>
                          <MenuItem value='Rapport 1'>Rapport 1</MenuItem>
                          <MenuItem value='Rapport 2'>Rapport 2</MenuItem>
                          <MenuItem value='Rapport 3'>Rapport 3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label='Description'
                        value={email}
                        placeholder='Description'
                        onChange={e => setEmail(e.target.value)}
                      />{' '}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Responsable</InputLabel>
                        <Select defaultValue='Haute'>
                          <MenuItem value='Personne 1'>Personne 1</MenuItem>
                          <MenuItem value='Personne 2'>Personne 2</MenuItem>
                          <MenuItem value='Personne 3'>Personne 3</MenuItem>
                          <MenuItem value='Personne 4'>Personne 4</MenuItem>
                          <MenuItem value='Personne 5'>Personne 5</MenuItem>
                        </Select>
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
          </Fragment>
        )
      case 4:
        return (
          <Fragment>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Username'
                value={username}
                placeholder='carterLeonard'
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                value={email}
                placeholder='carterleonard@gmail.com'
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='stepper-alternative-account-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={state.password}
                  id='stepper-alternative-account-password'
                  onChange={handlePasswordChange('password')}
                  type={state.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={state.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='stepper-alternative-account-password-2'>Confirm Password</InputLabel>
                <OutlinedInput
                  value={state.password2}
                  label='Confirm Password'
                  id='stepper-alternative-account-password-2'
                  onChange={handleConfirmChange('password2')}
                  type={state.showPassword2 ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        aria-label='toggle password visibility'
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        <Icon icon={state.showPassword2 ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Fragment>
        )

      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return (
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[activeStep].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[activeStep].subtitle}
              </Typography>
            </Grid>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                size='large'
                variant='outlined'
                color='secondary'
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button size='large' variant='contained' onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )
    }
  }

  return (
    <Fragment>
      <StepperWrapper>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>
      <Card sx={{ mt: 4 }}>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </Fragment>
  )
}

export default StepperAlternativeLabel
