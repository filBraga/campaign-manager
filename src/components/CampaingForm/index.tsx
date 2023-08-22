'use client';

import styles from './style.module.scss';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { schema } from './Validation';
import { Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { createCampaign } from '@/app/redux/slice/campaignSlice';
import { useRouter } from 'next/router';
import { AppDispatch } from '@/app/redux/store';
import { CampaignType } from '@/types/CampaignType';
import { toggleModal } from '@/app/redux/slice/modalSlice';

const CampaignForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CampaignType>({
        resolver: yupResolver(schema) as Resolver,
        mode: 'onChange',
    });

    const onSubmit = (data: CampaignType) => {
        console.log(data);
        console.log(errors);
        dispatch(toggleModal());
        dispatch(createCampaign(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
                <Box className={styles.campaignListHeader}>
                    <Box sx={{}}>
                        <Typography variant="h5">Nova Campanha</Typography>
                        <Typography variant="subtitle1">
                            Informe os campos a seguir para criar uma nova campanha
                        </Typography>
                    </Box>
                </Box>
                <Box className={styles.form}>
                    <TextField
                        margin="normal"
                        label="Nome"
                        {...register('name')}
                        fullWidth
                        error={Boolean(errors.name)}
                    />
                    {errors.name && <span className={styles.error}>{errors.name.message}</span>}

                    <TextField
                        margin="normal"
                        label="Orçamento"
                        {...register('budget')}
                        fullWidth
                        type="number"
                        error={Boolean(errors.budget)}
                    />
                    {errors.budget && <span className={styles.error}>{errors.budget.message}</span>}

                    <TextField
                        margin="normal"
                        label="Público"
                        {...register('audience')}
                        fullWidth
                        error={Boolean(errors.audience)}
                    />
                    {errors.audience && <span className={styles.error}>{errors.audience.message}</span>}

                    <TextField
                        margin="normal"
                        label="Data de início"
                        {...register('startDate')}
                        fullWidth
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={Boolean(errors.startDate)}
                    />
                    {errors.startDate && <span className={styles.error}>{errors.startDate.message}</span>}

                    <TextField
                        margin="normal"
                        label="Data de término"
                        {...register('endDate')}
                        fullWidth
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={Boolean(errors.endDate)}
                    />
                    {errors.endDate && <span className={styles.error}>{errors.endDate.message}</span>}

                    <TextField
                        select
                        error={Boolean(errors.status)}
                        margin="normal"
                        label="Status"
                        {...register('status')}
                        fullWidth
                    >
                        <MenuItem value="Ativo">Ativo</MenuItem>
                        <MenuItem value="Desativado">Desativado</MenuItem>
                        <MenuItem value="Aguardando ativação">Aguardando Ativação</MenuItem>
                        <MenuItem value="Inativo">Inativo</MenuItem>
                    </TextField>
                    {errors.status && <span className={styles.error}>{errors.status.message}</span>}
                </Box>
                <Box className={styles.buttonContainer}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: ' #c87a0d', ':hover': { backgroundColor: '#c7862b' } }}
                        className={styles.newClientButton}
                    >
                        Criar
                    </Button>
                    <Button
                        onClick={() => dispatch(toggleModal())}
                        variant="outlined"
                        sx={{
                            border: '1px solid #1f2c4c',
                            backgroundColor: 'white',
                            color: '#1f2c4c',
                            ':hover': { backgroundColor: '#1f2c4c', color: 'white', border: '1px solid #1f2c4c' },
                        }}
                    >
                        Voltar
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default CampaignForm;
