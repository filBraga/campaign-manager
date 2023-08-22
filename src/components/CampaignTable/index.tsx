'use client';

import React, { useEffect } from 'react';
import styles from './style.module.scss';
import { Box, Button, Typography } from '@mui/material';
import Loading from '../GeneralComponents/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { deleteCampaign, readCampaign } from '@/app/redux/slice/campaignSlice';
import { CampaignType } from '@/types/CampaignType';
import CampaignRow from '../CampaignRow';
import { CustomModal } from '../GeneralComponents/Modal';
import { toggleDrawer } from '@/app/redux/slice/drawerSlice';
import { toggleModal } from '@/app/redux/slice/modalSlice';
import CampaignForm from '../CampaingForm';

const CampaignTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const campaigns = useSelector((state: RootState) => state.campaigns.entities);
    const loading = useSelector((state: RootState) => state.campaigns.loading);
    const isModalOpen = useSelector((state: RootState) => state.modal.open);

    useEffect(() => {
        dispatch(readCampaign());
        console.log(campaigns);
    }, [dispatch]);

    return (
        <div>
            <Box>
                <CustomModal isOpen={isModalOpen ? true : false}>
                    <CampaignForm />
                </CustomModal>

                <Box className={styles.userListHeader}>
                    <Box sx={{}}>
                        <Typography variant="h5">Listagem de Campanhas</Typography>
                        <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                            Escolha uma campanha para visualizar os detalhes
                        </Typography>
                    </Box>
                    <Button
                        onClick={() => dispatch(toggleModal())}
                        variant="contained"
                        sx={{ backgroundColor: '#1F2C4C', ':hover': { backgroundColor: '#0f1525' } }}
                    >
                        Nova Campanha
                    </Button>
                </Box>
                {loading && <Loading />}
                {!loading && (
                    <Box>
                        {campaigns.map((campaign: CampaignType) => (
                            <CampaignRow key={campaign.id} campaign={campaign} />
                        ))}
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default CampaignTable;
