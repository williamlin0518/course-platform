import React, { useEffect, useState } from "react";
import SearchBar from "../comps/SearchBar";
import ResponsiveGrid from "../comps/ResponsiveGrid";
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

function DiscoverPage() {
    useEffect(() => {
        document.title = "Discover";
    });

    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (searchTerm) => {
        try {
            const response = await fetch(`http://34.146.84.112/api/search/${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Error during API call:", error);
        }
    };

    return (
        <div className="app-page rel">
            <h1 className="page-title s24 fontb c333">Discover</h1>
            <Box sx={{ mt: 4 }}> {/* Increased top margin */}
                <SearchBar onSearch={handleSearch} />
            </Box>

            {searchResults.length > 0 ? (
                <ResponsiveGrid items={searchResults} />
            ) : (
                <Box textAlign="center" mt={5}>
                    <SearchIcon fontSize="large" color="primary" />
                    <Typography variant="h6" sx={{ color: '#FF0000' }}> {/* Red color */}
                        Start by searching for something
                    </Typography>
                </Box>
            )}
        </div>
    );
}

export default DiscoverPage;
