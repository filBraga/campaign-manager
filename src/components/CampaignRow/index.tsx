import { Box, Button, IconButton, Typography } from '@mui/material';
import React from 'react';
import styles from './style.module.scss';
import { CampaignType } from '@/types/CampaignType';
import ColorDot from '../GeneralComponents/ColorDot';
import { AppDispatch } from '@/app/redux/store';
import { useDispatch } from 'react-redux';
import { deleteCampaign } from '@/app/redux/slice/campaignSlice';
import DeleteIcon from '@mui/icons-material/Delete';

type CampaignRowProps = {
    campaign: CampaignType;
};

function formatDate(inputDateString: string) {
    const date = new Date(inputDateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1.
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const CampaignRow: React.FC<CampaignRowProps> = ({ campaign }) => {
    const dispatch: AppDispatch = useDispatch();

    const onDelete = async () => {
        const userConfirmed = window.confirm('Deletar?');
        if (!userConfirmed) return;
        dispatch(deleteCampaign(campaign));
    };

    return (
        <Box className={styles.outterContainer}>
            <Box className={styles.innerContainer}>
                <Typography variant="h6" className={styles.innerText}>
                    {campaign.name}
                </Typography>
                <Typography variant="subtitle1" className={styles.innerTextSubtitle1}>
                    {campaign.audience}
                </Typography>
            </Box>

            <Box className={styles.innerContainer2}>
                <Typography variant="subtitle1" className={styles.innerText}>
                    R$ {campaign.budget}
                </Typography>
            </Box>

            <Box className={styles.innerContainer}>
                <Typography variant="subtitle1" className={styles.innerText}>
                    {formatDate(campaign.startDate)}
                </Typography>
                <Typography variant="subtitle1" className={styles.innerTextSubtitle1}>
                    {formatDate(campaign.endDate)}
                </Typography>
            </Box>

            <Box className={styles.innerContainer3}>
                <ColorDot status={campaign.status} />
                <Typography variant="subtitle1" className={styles.innerText}>
                    {campaign.status}
                </Typography>
            </Box>

            <Box className={styles.innerContainer4}>
                <IconButton onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default CampaignRow;
