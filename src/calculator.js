/**
 * Calculadora Simples - Demo CPBR 2025
 * Sistema de documentação automática com IA
 */

class Calculator {
    constructor() {
        this.history = [];
    }

    /**
     * Soma dois números
     * @param {number} a - Primeiro número
     * @param {number} b - Segundo número
     * @returns {number} Resultado da soma
     */
    add(a, b) {
        const result = a + b;
        this.history.push(`${a} + ${b} = ${result}`);
        return result;
    }

    /**
     * Subtrai dois números
     * @param {number} a - Primeiro número
     * @param {number} b - Segundo número
     * @returns {number} Resultado da subtração
     */
    subtract(a, b) {
        const result = a - b;
        this.history.push(`${a} - ${b} = ${result}`);
        return result;
    }

    /**
     * Obtém o histórico de operações
     * @returns {Array} Array com histórico
     */
    getHistory() {
        return this.history;
    }
}

module.exports = Calculator;