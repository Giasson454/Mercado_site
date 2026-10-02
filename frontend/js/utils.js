/**
 * Funções Utilitárias do Sistema
 * Módulo independente para formatação de dados e cálculo de datas.
 */

// 1. Formata valores numéricos para a moeda brasileira (R$)
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// 2. Formata datas ISO (AAAA-MM-DD) para o padrão brasileiro (DD/MM/AAAA)
function formatarData(dataISO) {
    if (!dataISO) return '';
    const [ano, mes, dia] = dataISO.split('T')[0].split('-');
    return `${dia}/${mes}/${ano}`;
}

// 3. Retorna o intervalo de datas (Início e Fim) para os relatórios temporais
function obterIntervaloDatas(tipoFiltro) {
    const hoje = new Date();
    let dataInicio = new Date();

    if (tipoFiltro === 'diario') {
        dataInicio = new Date(hoje);
    } else if (tipoFiltro === 'semanal') {
        dataInicio.setDate(hoje.getDate() - 7);
    } else if (tipoFiltro === 'mensal') {
        dataInicio.setMonth(hoje.getMonth() - 1);
    }

    return {
        inicio: dataInicio.toISOString().split('T')[0],
        fim: hoje.toISOString().split('T')[0]
    };
}
