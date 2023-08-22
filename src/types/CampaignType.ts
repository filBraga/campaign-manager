type CampaignStatus = 'Ativo' | 'Desativado' | 'Aguardando ativação' | 'Inativo';

export type CampaignType = {
    id: number;
    name: string;
    budget: number;
    audience: string;
    startDate: string; // or Date if you want to use Date objects
    endDate: string; // or Date if you want to use Date objects
    status: CampaignStatus;
};
