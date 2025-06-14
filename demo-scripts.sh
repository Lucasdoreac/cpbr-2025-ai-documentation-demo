#!/bin/bash

# Demo Scripts para Campus Party Brasil 2025
# Documentação em Tempo Real na Era da IA
# Comandos para executar durante a apresentação

echo "🚀 DEMO SCRIPTS - CPBR 2025"
echo "📋 Documentação em Tempo Real na Era da IA"
echo "═══════════════════════════════════════"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Função para esperar input do usuário
wait_for_key() {
    echo -e "${YELLOW}⏸️  Pressione ENTER para continuar...${NC}"
    read -r
}

# Função para mostrar comando antes de executar
show_and_run() {
    echo -e "${CYAN}💻 Executando: ${1}${NC}"
    eval "$1"
    echo ""
}

echo -e "${GREEN}🎬 DEMONSTRAÇÃO: Setup Inicial${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Script 1: Setup do projeto
setup_demo() {
    echo -e "${BLUE}📦 1. Configurando ambiente de demonstração...${NC}"
    
    wait_for_key
    show_and_run "npm install"
    
    wait_for_key
    show_and_run "mkdir -p src docs public"
    
    echo -e "${GREEN}✅ Setup concluído!${NC}"
    echo ""
}

# Script 2: Iniciar serviços
start_services() {
    echo -e "${BLUE}🌐 2. Iniciando serviços em paralelo...${NC}"
    
    wait_for_key
    echo -e "${YELLOW}🔄 Iniciando servidor web...${NC}"
    gnome-terminal --tab --title="Server" -- bash -c "node server.js; exec bash" 2>/dev/null || \
    osascript -e 'tell application "Terminal" to do script "cd \"'$(pwd)'\" && node server.js"' 2>/dev/null || \
    start cmd /k "node server.js" 2>/dev/null || \
    echo "Por favor, abra um novo terminal e execute: node server.js"
    
    sleep 2
    
    wait_for_key
    echo -e "${YELLOW}👁️ Iniciando file watcher...${NC}"
    gnome-terminal --tab --title="Watcher" -- bash -c "node watcher.js; exec bash" 2>/dev/null || \
    osascript -e 'tell application "Terminal" to do script "cd \"'$(pwd)'\" && node watcher.js"' 2>/dev/null || \
    start cmd /k "node watcher.js" 2>/dev/null || \
    echo "Por favor, abra um novo terminal e execute: node watcher.js"
    
    sleep 2
    
    echo -e "${GREEN}✅ Serviços iniciados!${NC}"
    echo -e "${PURPLE}📍 Acesse: http://localhost:3000${NC}"
    echo -e "${PURPLE}👁️ Viewer: http://localhost:3000/viewer${NC}"
    echo ""
}

# Script 3: Demonstração com arquivos
demo_files() {
    echo -e "${BLUE}📝 3. Criando arquivos para demonstração...${NC}"
    
    wait_for_key
    echo -e "${YELLOW}📄 Criando calculadora simples...${NC}"
    cat > src/calculator.js << 'EOF'
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
EOF
    
    echo -e "${GREEN}✅ Arquivo criado: src/calculator.js${NC}"
    
    wait_for_key
    echo -e "${YELLOW}📄 Criando API REST...${NC}"
    cat > src/api.js << 'EOF'
const express = require('express');
const Calculator = require('./calculator');

const app = express();
app.use(express.json());

const calc = new Calculator();

/**
 * API REST para Calculadora
 * Demonstração de documentação automática
 */

// Endpoint para soma
app.post('/api/add', (req, res) => {
    const { a, b } = req.body;
    
    if (typeof a !== 'number' || typeof b !== 'number') {
        return res.status(400).json({ 
            error: 'Parâmetros devem ser números' 
        });
    }
    
    const result = calc.add(a, b);
    res.json({ 
        operation: 'add',
        a, b, result,
        timestamp: new Date().toISOString()
    });
});

// Endpoint para subtração
app.post('/api/subtract', (req, res) => {
    const { a, b } = req.body;
    
    if (typeof a !== 'number' || typeof b !== 'number') {
        return res.status(400).json({ 
            error: 'Parâmetros devem ser números' 
        });
    }
    
    const result = calc.subtract(a, b);
    res.json({ 
        operation: 'subtract',
        a, b, result,
        timestamp: new Date().toISOString()
    });
});

// Endpoint para histórico
app.get('/api/history', (req, res) => {
    res.json({
        history: calc.getHistory(),
        count: calc.getHistory().length
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🧮 Calculator API rodando na porta ${PORT}`);
});

module.exports = app;
EOF
    
    echo -e "${GREEN}✅ Arquivo criado: src/api.js${NC}"
    
    wait_for_key
    echo -e "${YELLOW}📄 Criando utilitários...${NC}"
    cat > src/utils.js << 'EOF'
/**
 * Utilitários para o sistema de calculadora
 * Funções auxiliares e helpers
 */

const fs = require('fs');
const path = require('path');

/**
 * Formata números para exibição
 * @param {number} num - Número para formatar
 * @param {number} decimals - Casas decimais
 * @returns {string} Número formatado
 */
function formatNumber(num, decimals = 2) {
    return parseFloat(num).toFixed(decimals);
}

/**
 * Valida se um valor é um número válido
 * @param {any} value - Valor para validar
 * @returns {boolean} True se é número válido
 */
function isValidNumber(value) {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Salva histórico em arquivo
 * @param {Array} history - Array com histórico
 * @param {string} filename - Nome do arquivo
 */
function saveHistoryToFile(history, filename = 'calculator_history.json') {
    const data = {
        timestamp: new Date().toISOString(),
        history: history,
        total_operations: history.length
    };
    
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

/**
 * Carrega histórico de arquivo
 * @param {string} filename - Nome do arquivo
 * @returns {Array} Histórico carregado
 */
function loadHistoryFromFile(filename = 'calculator_history.json') {
    try {
        if (fs.existsSync(filename)) {
            const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
            return data.history || [];
        }
    } catch (error) {
        console.error('Erro ao carregar histórico:', error);
    }
    return [];
}

/**
 * Gera relatório de estatísticas
 * @param {Array} history - Histórico de operações
 * @returns {Object} Estatísticas
 */
function generateStats(history) {
    const operations = {
        add: 0,
        subtract: 0,
        multiply: 0,
        divide: 0
    };
    
    history.forEach(op => {
        if (op.includes('+')) operations.add++;
        if (op.includes('-')) operations.subtract++;
        if (op.includes('*')) operations.multiply++;
        if (op.includes('/')) operations.divide++;
    });
    
    return {
        total_operations: history.length,
        operations_by_type: operations,
        generated_at: new Date().toISOString()
    };
}

module.exports = {
    formatNumber,
    isValidNumber,
    saveHistoryToFile,
    loadHistoryFromFile,
    generateStats
};
EOF
    
    echo -e "${GREEN}✅ Arquivo criado: src/utils.js${NC}"
    echo ""
    echo -e "${PURPLE}🎯 Agora observe a documentação sendo gerada em tempo real!${NC}"
    echo -e "${PURPLE}👁️ Acesse: http://localhost:3000/viewer${NC}"
}

# Script 4: Comandos Claude Code para executar na apresentação
claude_code_commands() {
    echo -e "${BLUE}🤖 4. Comandos Claude Code para demonstração${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    echo -e "${YELLOW}📋 COMANDOS PARA EXECUTAR:${NC}"
    echo ""
    
    echo -e "${CYAN}# 1. Gerar README completo${NC}"
    echo 'claude code "Crie um README.md completo para este projeto com badges, instalação, exemplos de uso e documentação da API"'
    echo ""
    
    echo -e "${CYAN}# 2. Criar testes automatizados${NC}"
    echo 'claude code "Gere testes unitários completos para todos os arquivos em src/ usando Jest"'
    echo ""
    
    echo -e "${CYAN}# 3. Documentar API com Swagger${NC}"
    echo 'claude code "Crie documentação Swagger/OpenAPI completa para a API em src/api.js"'
    echo ""
    
    echo -e "${CYAN}# 4. Gerar Dockerfile e docker-compose${NC}"
    echo 'claude code "Crie Dockerfile otimizado e docker-compose.yml para este projeto"'
    echo ""
    
    echo -e "${CYAN}# 5. Análise de código e melhorias${NC}"
    echo 'claude code "Analise o código em src/ e sugira melhorias de performance, segurança e boas práticas"'
    echo ""
    
    echo -e "${CYAN}# 6. Criar guia de contribuição${NC}"
    echo 'claude code "Gere CONTRIBUTING.md com guias para desenvolvedores, padrões de código e processo de PR"'
    echo ""
    
    echo -e "${CYAN}# 7. Documentação de deploy${NC}"
    echo 'claude code "Crie guia completo de deploy com CI/CD, variáveis de ambiente e monitoramento"'
    echo ""
    
    echo -e "${CYAN}# 8. Refatorar para TypeScript${NC}"
    echo 'claude code "Converta todos os arquivos JavaScript para TypeScript com tipagem completa"'
}

# Script 5: Modificações ao vivo
live_modifications() {
    echo -e "${BLUE}⚡ 5. Modificações em tempo real${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    wait_for_key
    echo -e "${YELLOW}🔄 Adicionando nova funcionalidade...${NC}"
    
    # Adicionar função de multiplicação
    cat >> src/calculator.js << 'EOF'

    /**
     * Multiplica dois números
     * @param {number} a - Primeiro número  
     * @param {number} b - Segundo número
     * @returns {number} Resultado da multiplicação
     */
    multiply(a, b) {
        const result = a * b;
        this.history.push(`${a} * ${b} = ${result}`);
        return result;
    }

    /**
     * Divide dois números
     * @param {number} a - Dividendo
     * @param {number} b - Divisor
     * @returns {number} Resultado da divisão
     * @throws {Error} Se divisor for zero
     */
    divide(a, b) {
        if (b === 0) {
            throw new Error('Divisão por zero não é permitida');
        }
        const result = a / b;
        this.history.push(`${a} / ${b} = ${result}`);
        return result;
    }
EOF
    
    echo -e "${GREEN}✅ Funcionalidades adicionadas!${NC}"
    
    wait_for_key
    echo -e "${YELLOW}🔄 Modificando API...${NC}"
    
    # Adicionar endpoints na API
    cat >> src/api.js << 'EOF'

// Endpoint para multiplicação
app.post('/api/multiply', (req, res) => {
    const { a, b } = req.body;
    
    if (typeof a !== 'number' || typeof b !== 'number') {
        return res.status(400).json({ 
            error: 'Parâmetros devem ser números' 
        });
    }
    
    const result = calc.multiply(a, b);
    res.json({ 
        operation: 'multiply',
        a, b, result,
        timestamp: new Date().toISOString()
    });
});

// Endpoint para divisão
app.post('/api/divide', (req, res) => {
    const { a, b } = req.body;
    
    if (typeof a !== 'number' || typeof b !== 'number') {
        return res.status(400).json({ 
            error: 'Parâmetros devem ser números' 
        });
    }
    
    try {
        const result = calc.divide(a, b);
        res.json({ 
            operation: 'divide',
            a, b, result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});
EOF
    
    echo -e "${GREEN}✅ API atualizada!${NC}"
    echo -e "${PURPLE}📄 Documentação sendo atualizada automaticamente...${NC}"
}

# Script 6: Stats finais
show_final_stats() {
    echo -e "${BLUE}📊 6. Estatísticas finais da demonstração${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    echo -e "${GREEN}✅ Sistema funcionando perfeitamente!${NC}"
    echo ""
    echo -e "${YELLOW}📈 Resultados alcançados:${NC}"
    echo "• ⚡ Documentação gerada em tempo real"
    echo "• 🤖 Integração com IA funcional"
    echo "• 👥 Plateia acompanhando ao vivo"
    echo "• 📱 Interface responsiva"
    echo "• 🔄 Updates automáticos"
    echo ""
    echo -e "${PURPLE}🌐 URLs para a plateia:${NC}"
    echo "• Apresentação: http://localhost:3000"
    echo "• Viewer ao vivo: http://localhost:3000/viewer"
    echo "• API docs: http://localhost:3000/docs"
    echo ""
    echo -e "${CYAN}🚀 Próximos passos:${NC}"
    echo "• Implementar em produção"
    echo "• Integrar com Claude Code real"
    echo "• Expandir para outros tipos de arquivo"
    echo "• Adicionar mais templates de documentação"
}

# Menu principal
main_menu() {
    echo ""
    echo -e "${GREEN}🎯 MENU DE DEMONSTRAÇÃO${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "1. 📦 Setup inicial do projeto"
    echo "2. 🌐 Iniciar serviços"
    echo "3. 📝 Criar arquivos de demonstração"
    echo "4. 🤖 Comandos Claude Code"
    echo "5. ⚡ Modificações ao vivo"
    echo "6. 📊 Estatísticas finais"
    echo "7. 🔄 Executar demo completa"
    echo "0. ❌ Sair"
    echo ""
    echo -e "${YELLOW}Escolha uma opção (0-7): ${NC}"
    read -r choice
    
    case $choice in
        1) setup_demo ;;
        2) start_services ;;
        3) demo_files ;;
        4) claude_code_commands ;;
        5) live_modifications ;;
        6) show_final_stats ;;
        7) 
            echo -e "${GREEN}🚀 Executando demo completa...${NC}"
            setup_demo
            start_services
            demo_files
            claude_code_commands
            live_modifications
            show_final_stats
            ;;
        0) 
            echo -e "${GREEN}👋 Obrigado por usar o AI Docs Demo!${NC}"
            exit 0
            ;;
        *) 
            echo -e "${RED}❌ Opção inválida!${NC}"
            main_menu
            ;;
    esac
    
    echo ""
    wait_for_key
    main_menu
}

# Verificar se estamos no diretório correto
if [[ ! -f "package.json" ]]; then
    echo -e "${RED}❌ Execute este script no diretório do projeto (onde está o package.json)${NC}"
    exit 1
fi

# Iniciar menu
main_menu