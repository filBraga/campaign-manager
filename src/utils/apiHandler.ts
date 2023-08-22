// mockApiHandler.ts

type HttpMethod = 'Post' | 'Get' | 'Patch' | 'Delete';

let campaign = [
    {
        id: 1,
        name: 'Campanha de Verão',
        budget: 10000,
        audience: 'Jovens entre 18-25 anos',
        startDate: '2023-06-01',
        endDate: '2023-08-31',
        status: 'Ativo',
    },
    {
        id: 2,
        name: 'Campanha de Inverno',
        budget: 12000,
        audience: 'Adultos entre 26-35 anos',
        startDate: '2023-12-01',
        endDate: '2024-02-28',
        status: 'Desativado',
    },
    {
        id: 3,
        name: 'Campanha de Volta às Aulas',
        budget: 8000,
        audience: 'Estudantes de 10-18 anos',
        startDate: '2023-08-10',
        endDate: '2023-09-05',
        status: 'Aguardando ativação',
    },
    {
        id: 4,
        name: 'Campanha Black Friday',
        budget: 15000,
        audience: 'Todos os públicos',
        startDate: '2023-11-25',
        endDate: '2023-11-26',
        status: 'Inativo',
    },
];

const mockApiHandler = (method: HttpMethod, endpoint: string, data?: any) => {
    switch (endpoint) {
        case 'campaign':
            if (method === 'Post') {
                // Simulate adding to database and returning the new entry
                const newEntry = { ...data, id: Date.now().toString() };
                campaign.push(newEntry);
                return { data: newEntry };
            } else if (method === 'Get') {
                // Simulate getting all entries
                return { data: campaign };
            }
            break;

        default:
            if (endpoint.startsWith('campaign/')) {
                const id = endpoint.split('/')[1];
                const entry = campaign.find((item) => item.id === parseInt(id));

                if (method === 'Get' && entry) {
                    return { data: entry };
                } else if (method === 'Patch' && data) {
                    // Simulate updating entry
                    const index = campaign.findIndex((item) => item.id === parseInt(id));
                    if (index !== -1) {
                        campaign[index] = { ...campaign[index], ...data };
                        return { data: campaign[index] };
                    }
                } else if (method === 'Delete' && entry) {
                    // Simulate deleting entry
                    campaign = campaign.filter((item) => item.id !== parseInt(id));
                    return { data: {} };
                }
            }
            break;
    }

    return { data: null };
};

export default mockApiHandler;
