import CampaignTable from '@/components/CampaignTable';
import Layout from '@/components/GeneralComponents/Layout';
import { Box } from '@mui/material';
import React from 'react';

const index = () => {
    return (
        <div>
            <Layout title="Campanhas" description="Campanhas">
                <Box sx={{ mt: 4 }}>
                    <CampaignTable />
                </Box>
            </Layout>
        </div>
    );
};

export default index;
