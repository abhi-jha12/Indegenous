import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Cite from 'citation-js';

const CitationPopup = ({ open, handleClose, bibData }) => {
    const [selectedStyle, setSelectedStyle] = useState('apa');
    const [citationResult, setCitationResult] = useState('');

    useEffect(() => {
        if (bibData) {
            try {
                let cite = new Cite(bibData);
                let result = cite.format('citation', { format: 'text', template: selectedStyle });
                setCitationResult(result);
            } catch (error) {
                console.error('Error generating citation:', error);
            }
        }
    }, [bibData, selectedStyle]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Generate Citation</DialogTitle>
            <DialogContent>
                <Select value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)}>
                    <MenuItem value="apa">APA</MenuItem>
                    <MenuItem value="mla">MLA</MenuItem>
                    <MenuItem value="chicago">Chicago</MenuItem>
                    <MenuItem value="harvard">Harvard</MenuItem>
                    <MenuItem value="vancouver">Vancouver</MenuItem>
                </Select>
                <div>{citationResult}</div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};


export default CitationPopup;
