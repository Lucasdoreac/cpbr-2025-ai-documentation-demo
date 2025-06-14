/**
 * Demonstração AO VIVO - Campus Party Brasil 2025
 * Este arquivo está sendo criado durante a apresentação!
 */

class CPBRDemo {
    constructor() {
        this.evento = 'Campus Party Brasil 2025';
        this.tema = 'Documentação IA';
        this.plateia = 'Incrível!';
    }

    /**
     * Mostra como a IA revoluciona documentação
     * @param {string} codigo - Código para documentar
     * @returns {string} Documentação gerada pela IA
     */
    revolucionarDocumentacao(codigo) {
        // Simular processamento IA
        const tempoIA = 0.001; // segundos
        const tempoManual = 1800; // 30 minutos
        
        console.log(`IA processou em ${tempoIA}s vs ${tempoManual}s manual`);
        
        return 'Documentação gerada automaticamente pela IA!';
    }

    /**
     * Calcula economia real em dinheiro
     * @param {number} programadores - Número de devs na empresa
     * @returns {object} Economia calculada
     */
    calcularEconomia(programadores) {
        const horasPorDev = 40 * 60 / 60; // 40 min por arquivo convertido para horas
        const custoPorHora = 80; // R$ por hora
        const economiaAnual = programadores * horasPorDev * 22 * 12 * custoPorHora;
        
        return {
            programadores,
            economiaAnual: `R$ ${economiaAnual.toLocaleString()}`,
            roi: '2500%',
            tempoRetorno: '2 semanas'
        };
    }
}

module.exports = CPBRDemo;