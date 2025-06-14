#!/bin/bash

# Script de Inicialização da Apresentação Automatizada
# Campus Party Brasil 2025 - Documentação 4.0 na Era da IA

clear
echo "🎬 ════════════════════════════════════════════════════"
echo "   APRESENTAÇÃO AUTOMATIZADA - CLAUDE MAESTRO"
echo "   Campus Party Brasil 2025"
echo "   Documentação 4.0 na Era da IA"
echo "════════════════════════════════════════════════════"
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
if [[ ! -f "presentation-maestro.js" ]]; then
    echo -e "${RED}❌ Erro: Execute este script no diretório do projeto${NC}"
    echo "   Use: cd /Users/lucascardoso/apps/MCP/cpbr && ./run-automated-presentation.sh"
    exit 1
fi

echo -e "${BLUE}🎯 APRESENTAÇÃO AUTOMATIZADA${NC}"
echo -e "${GREEN}   ⏱️ Duração: 4 minutos${NC}"
echo -e "${YELLOW}   🎭 Controle total pelo Claude${NC}"
echo -e "${PURPLE}   🎪 Experiência única!${NC}"
echo ""

echo -e "${CYAN}📋 O que será automatizado:${NC}"
echo "   🎥 Slides navegando sozinhos"
echo "   📝 Sticky Notes com falas"
echo "   💻 Cursor abrindo e escrevendo código"
echo "   🤖 IA documentando em tempo real"
echo "   📝 Git commits automáticos"
echo "   🎙️ Narração contextual"
echo ""

echo -e "${YELLOW}🎛️ Controles durante apresentação:${NC}"
echo "   ⏸️ ESPAÇO - Pausar/Retomar"
echo "   ⏹️ ESC - Parar apresentação"
echo ""

# Verificar dependências
echo -e "${BLUE}🔍 Verificando dependências...${NC}"

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado${NC}"
    exit 1
fi

# Verificar se servidor está rodando
if ! lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}⚠️ Servidor não está rodando. Iniciando...${NC}"
    # Iniciar servidor em background
    node server.js &
    SERVER_PID=$!
    sleep 3
    echo -e "${GREEN}✅ Servidor iniciado (PID: $SERVER_PID)${NC}"
else
    echo -e "${GREEN}✅ Servidor já está rodando${NC}"
fi

# Verificar Cursor (opcional)
if ! command -v cursor &> /dev/null; then
    echo -e "${YELLOW}⚠️ Cursor não encontrado (demo de código será simulada)${NC}"
else
    echo -e "${GREEN}✅ Cursor encontrado${NC}"
fi

# Verificar Stickies (macOS)
if ! command -v osascript &> /dev/null; then
    echo -e "${YELLOW}⚠️ AppleScript não disponível (Sticky Notes serão simuladas)${NC}"
else
    echo -e "${GREEN}✅ AppleScript disponível${NC}"
fi

echo ""
echo -e "${GREEN}🚀 Tudo pronto para apresentação!${NC}"
echo ""

# Menu de opções
echo -e "${CYAN}📋 Escolha o modo de apresentação:${NC}"
echo "1. 🚀 Apresentação Completa (4 minutos)"
echo "2. ⚡ Modo Rápido (2 minutos)"
echo "3. 🎯 Apenas Demo Código (1 minuto)"
echo "4. 🧪 Teste de Sistemas"
echo "0. ❌ Cancelar"
echo ""

read -p "Escolha uma opção (0-4): " choice

case $choice in
    1)
        echo -e "${GREEN}🚀 Iniciando apresentação completa...${NC}"
        PRESENTATION_MODE="full"
        ;;
    2)
        echo -e "${YELLOW}⚡ Iniciando modo rápido...${NC}"
        PRESENTATION_MODE="fast"
        ;;
    3)
        echo -e "${PURPLE}🎯 Iniciando demo de código...${NC}"
        PRESENTATION_MODE="demo"
        ;;
    4)
        echo -e "${BLUE}🧪 Executando testes...${NC}"
        PRESENTATION_MODE="test"
        ;;
    0)
        echo -e "${RED}❌ Cancelado pelo usuário${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}❌ Opção inválida${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${RED}🔴 ATENÇÃO: Apresentação iniciará em 5 segundos!${NC}"
echo -e "${YELLOW}   Posicione as telas como desejado${NC}"
echo -e "${CYAN}   Tela 1: Browser (slides)${NC}"
echo -e "${CYAN}   Tela 2: Sticky Notes${NC}"
echo -e "${CYAN}   Tela 3: Cursor (código)${NC}"
echo ""

# Countdown
for i in {5..1}; do
    echo -ne "\r${RED}Iniciando em: $i segundos...${NC}"
    sleep 1
done
echo ""

echo -e "${GREEN}🎬 APRESENTAÇÃO INICIADA!${NC}"
echo ""

# Executar apresentação com o modo escolhido
export PRESENTATION_MODE
node presentation-maestro.js

# Cleanup
echo ""
echo -e "${BLUE}🧹 Limpeza pós-apresentação...${NC}"

# Parar servidor se foi iniciado por este script
if [[ ! -z "$SERVER_PID" ]]; then
    kill $SERVER_PID 2>/dev/null
    echo -e "${GREEN}✅ Servidor parado${NC}"
fi

echo -e "${GREEN}🎉 Apresentação concluída!${NC}"
echo -e "${PURPLE}   Obrigado Campus Party Brasil 2025!${NC}"