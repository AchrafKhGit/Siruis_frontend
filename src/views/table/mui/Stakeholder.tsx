import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface Stakeholder {
  name: string;
  role: string;
  organization: string;
  influence: string;
  comment: string;
  contactDate: string;
}

const initialStakeholders: Stakeholder[] = [
  { name: 'Alice Martin', role: 'Sponsor', organization: 'XYZ Corp', influence: 'Élevé', comment: 'Key decision maker.', contactDate: '2024-01-15' },
  { name: 'Bob Smith', role: 'Consultant', organization: 'ABC Inc', influence: 'Moyen', comment: 'Technical advisor.', contactDate: '2024-01-20' },
  { name: 'Celine Dion', role: 'Observateur', organization: 'DEF LLC', influence: 'Faible', comment: 'Periodic check-ins.', contactDate: '2024-01-25' }
];

const StakeholderTable = () => {
  const [stakeholders, setStakeholders] = useState(initialStakeholders);

  const handleChange = (index: number, field: keyof Stakeholder, value: string) => {
    const updatedStakeholders = stakeholders.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setStakeholders(updatedStakeholders);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="stakeholder table">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Rôle</TableCell>
            <TableCell>Organisation</TableCell>
            <TableCell>Niveau d'Influence</TableCell>
            <TableCell>Commentaire</TableCell>
            <TableCell>Date de Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stakeholders.map((stakeholder, index) => (
            <TableRow key={index}>
              <TableCell>
                <TextField
                  required
                  fullWidth
                  value={stakeholder.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  inputProps={{ pattern: "[A-Za-zÀ-ÿ ]+" }} // Pattern for alphabetic characters and spaces
                />
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel id={`role-label-${index}`}>Rôle</InputLabel>
                  <Select
                    labelId={`role-label-${index}`}
                    value={stakeholder.role}
                    label="Rôle"
                    onChange={(e) => handleChange(index, 'role', e.target.value)}
                    required
                  >
                    <MenuItem value="Sponsor">Sponsor</MenuItem>
                    <MenuItem value="Responsable">Responsable</MenuItem>
                    <MenuItem value="Consultant">Consultant</MenuItem>
                    <MenuItem value="Observateur">Observateur</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  value={stakeholder.organization}
                  onChange={(e) => handleChange(index, 'organization', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel id={`influence-label-${index}`}>Niveau d'Influence</InputLabel>
                  <Select
                    labelId={`influence-label-${index}`}
                    value={stakeholder.influence}
                    label="Niveau d'Influence"
                    onChange={(e) => handleChange(index, 'influence', e.target.value)}
                  >
                    <MenuItem value="Faible">Faible</MenuItem>
                    <MenuItem value="Moyen">Moyen</MenuItem>
                    <MenuItem value="Élevé">Élevé</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  value={stakeholder.comment}
                  onChange={(e) => handleChange(index, 'comment', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  fullWidth
                  value={stakeholder.contactDate}
                  onChange={(e) => handleChange(index, 'contactDate', e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StakeholderTable;
