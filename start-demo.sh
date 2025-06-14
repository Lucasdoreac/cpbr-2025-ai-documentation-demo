#!/bin/bash

# Script Simplificado para Iniciar Demonstração
# Campus Party Brasil 2025 - Documentação IA

clear
echo "🤖 ════════════════════════════════════════════"
echo "   DOCUMENTAÇÃO 4.0 - DEMONSTRAÇÃO DIDÁTICA"
echo "   Campus Party Brasil 2025"
echo "════════════════════════════════════════════"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Verificar se estamos no diretório correto
if [[ ! -f "package.json" ]]; then
    echo -e "${RED}❌ Erro: Execute este script no diretório do projeto${NC}"
    echo "   Use: cd /Users/lucascardoso/apps/MCP/cpbr && ./start-demo.sh"
    exit 1
fi

echo -e "${BLUE}📋 URLs da Demonstração:${NC}"
echo -e "${GREEN}   🎓 DIDÁTICA (Para leigos):${NC} http://localhost:3000/didactic"
echo -e "${CYAN}   👁️ TÉCNICA (Para devs):${NC}  http://localhost:3000/viewer"
echo -e "${PURPLE}   🎤 APRESENTAÇÃO:${NC}        http://localhost:3000"
echo ""

echo -e "${YELLOW}🚀 Iniciando servidor...${NC}"
echo ""

# Verificar se já existe um processo rodando na porta 3000
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}⚠️ Porta 3000 já em uso. Parando processo anterior...${NC}"
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# Função para abrir URLs automaticamente
open_urls() {
    sleep 3
    echo ""
    echo -e "${GREEN}🌐 Abrindo URLs automaticamente...${NC}"
    
    # Tentar abrir no navegador (macOS)
    if command -v open &> /dev/null; then
        open "http://localhost:3000/didactic"
        sleep 1
        open "http://localhost:3000/viewer" 
    # Linux
    elif command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:3000/didactic"
        sleep 1
        xdg-open "http://localhost:3000/viewer"
    # Windows
    elif command -v start &> /dev/null; then
        start "http://localhost:3000/didactic"
        sleep 1
        start "http://localhost:3000/viewer"
    else
        echo -e "${YELLOW}💡 Abra manualmente no navegador:${NC}"
        echo "   http://localhost:3000/didactic"
    fi
}

# Iniciar abertura de URLs em background
open_urls &

echo -e "${GREEN}✅ Sistema iniciado com sucesso!${NC}"
echo ""
echo -e "${CYAN}💡 DICAS PARA APRESENTAÇÃO:${NC}"
echo -e "   1. Acesse ${GREEN}http://localhost:3000/didactic${NC} para versão simplificada"
echo -e "   2. Clique nos botões para demonstrar ao vivo"
echo -e "   3. Use calculadora de economia para impactar plateia"
echo -e "   4. Para parar: Ctrl+C"
echo ""
echo -e "${PURPLE}🎬 ROTEIRO SUGERIDO:${NC}"
echo -e "   → Mostrar problema (manual vs IA)"
echo -e "   → Clicar 'Criar Arquivo' → cronometrar"
echo -e "   → Clicar 'Modificar Código' → mostrar update automático"
echo -e "   → Clicar 'Calcular Economia' → impacto financeiro"
echo ""
echo -e "${RED}🔴 SISTEMA PRONTO PARA APRESENTAÇÃO!${NC}"
echo ""

# Iniciar servidor
node server.js