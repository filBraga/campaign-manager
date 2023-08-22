import styles from './style.module.scss';
import { Box, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { readCampaignById } from '@/app/redux/slice/campaignSlice';

const EditCampaign: React.FC<{ data: any }> = ({ data }) => {
    const router = useRouter();
    const { id } = router.query;

    const dispatch = useDispatch<AppDispatch>();
    const campaign = useSelector((state: RootState) => state.campaigns.entity);

    useEffect(() => {
        if (id) {
            dispatch(readCampaignById(id));
        }
    }, [dispatch, id]);

    return (
        <div>
            <Box>
                <Box sx={{ marginTop: '125px' }} className={styles.mainContainer}>
                    {/* <CampaignFormEdit campaign={campaign} /> */}
                </Box>
            </Box>
        </div>
    );
};

export default EditCampaign;
