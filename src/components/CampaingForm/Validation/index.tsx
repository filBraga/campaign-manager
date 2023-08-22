import * as yup from 'yup';

export const schema = yup.object().shape({
    id: yup.number().nullable().notRequired(),
    name: yup.string().required('Nome é obrigatório'),
    budget: yup.number().required('Orçamento é obrigatório'),
    audience: yup.string().required('Público é obrigatório'),
    startDate: yup
        .date() // use .date() instead of .date() if you want to use Date objects
        .required('Data de início é obrigatória'),
    endDate: yup
        .date() // use .date() instead of .string() if you want to use Date objects
        .required('Data de término é obrigatória'),
    status: yup
        .string()
        .oneOf(['Ativo', 'Desativado', 'Aguardando ativação', 'Inativo'], 'Status inválido')
        .required('Status é obrigatório'),
});
