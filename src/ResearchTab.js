import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CitationPopup from './CitationPopup';
import { Box, Link } from '@mui/material';


const ResearchTab = () => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentBibData, setCurrentBibData] = useState('');

    const handleSearch = () => {
        const data = {
            keyword: keyword,
            limit: "10"
        };

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.gyanibooks.com/search_publication/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setResults(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                gap={2}
                mt={3}
            >
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    fullWidth
                    color='dark'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    sx={{ maxWidth: '600px' }}
                />
                <Button variant="contained" color="primary" onClick={handleSearch} size='small'>
                    Search
                </Button>
            </Box>
            <Box mt={3}>
                {results.data && results.data.map((paper) => (
                    <Box key={paper.paperId} p={2} mb={2} borderRadius="10px" borderColor="grey.400" border="1px solid">
                        <Box mb={2}>
                            <h3>{paper.title}</h3>
                            <p>{paper.abstract}</p>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Link href={paper.url} target="_blank" rel="noopener noreferrer" color="secondary.main">
                                Read More
                            </Link>
                            <Box display="flex" alignItems="center" gap={2}>
                                <span>Citations: {paper.citationCount}</span>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                        setCurrentBibData(paper.citationStyles?.bibtex || '');
                                        setIsPopupOpen(true);
                                    }}
                                >
                                    Generate Citation
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
            <CitationPopup
                open={isPopupOpen}
                handleClose={() => setIsPopupOpen(false)}
                bibData={currentBibData}
            />
        </>
    );
};

export default ResearchTab;
