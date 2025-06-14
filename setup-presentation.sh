#!/bin/bash

# Setup da Apresentação Automatizada
# Campus Party Brasil 2025

clear
echo "🎬 ════════════════════════════════════════════════════"
echo "   SETUP APRESENTAÇÃO AUTOMATIZADA"
echo "   Campus Party Brasil 2025"
echo "════════════════════════════════════════════════════"
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔧 Configurando ambiente...${NC}"

# Tornar scripts executáveis
chmod +x run-automated-presentation.sh
chmod +x start-mcp-presentation.js
chmod +x setup-presentation.sh

echo -e "${GREEN}✅ Scripts tornados executáveis${NC}"

# Verificar Node.js
if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js encontrado: $(node --version)${NC}"
else
    echo -e "${YELLOW}⚠️ Node.js não encontrado${NC}"
fi

# Verificar dependências
if [[ -f "package.json" ]]; then
    echo -e "${BLUE}📦 Verificando dependências...${NC}"
    if [[ -d "node_modules" ]]; then
        echo -e "${GREEN}✅ Dependências já instaladas${NC}"
    else
        echo -e "${YELLOW}📦 Instalando dependências...${NC}"
        npm install
    fi
else
    echo -e "${YELLOW}⚠️ package.json não encontrado${NC}"
fi

echo ""
echo -e "${GREEN}🎯 SETUP COMPLETO!${NC}"
echo ""
echo -e "${BLUE}📋 Arquivos da apresentação criados:${NC}"
echo "   🎬 start-mcp-presentation.js     - Executor principal"
echo "   🎭 presentation-maestro.js       - Orquestrador completo"  
echo "   🎮 mcp-presentation-controller.js - Controle MCP real"
echo "   🚀 run-automated-presentation.sh - Script interativo"
echo "   📚 APRESENTACAO-AUTOMATIZADA.md  - Documentação completa"
echo ""
echo -e "${YELLOW}🚀 Para iniciar a apresentação:${NC}"
echo "   Opção 1: ./run-automated-presentation.sh"
echo "   Opção 2: node start-mcp-presentation.js"
echo ""
echo -e "${GREEN}🎪 Pronto para impressionar no Campus Party!${NC}"