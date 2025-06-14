# 🤝 Contributing to CPBR 2025 AI Documentation Demo

Obrigado por considerar contribuir para este projeto! Este demo foi criado para o Campus Party Brasil 2025 e demonstra o poder da IA na documentação de software.

## 🚀 Como Contribuir

### 1. Fork o Projeto
```bash
# Clone seu fork
git clone https://github.com/SEU_USERNAME/cpbr-2025-ai-documentation-demo.git
cd cpbr-2025-ai-documentation-demo
```

### 2. Configurar Ambiente
```bash
# Instalar dependências
npm install

# Configurar scripts
chmod +x scripts/*.sh
./scripts/setup-presentation.sh
```

### 3. Criar Branch
```bash
git checkout -b feature/nova-funcionalidade
```

### 4. Fazer Mudanças
- Mantenha o foco no objetivo educacional
- Teste sempre antes de commitar
- Siga as convenções de código existentes

### 5. Testar
```bash
# Testar servidor
npm start

# Testar apresentação
npm run presentation

# Verificar sistema
npm run check-system
```

### 6. Commit
```bash
git add .
git commit -m "feat: adicionar nova funcionalidade impressionante"
```

### 7. Pull Request
- Descreva claramente as mudanças
- Inclua screenshots se aplicável
- Mencione o contexto Campus Party Brasil 2025

## 📋 Tipos de Contribuições Bem-Vindas

### 🎯 **Melhorias na Apresentação**
- Novos slides ou animações
- Melhor timing ou narração
- Efeitos visuais mais impactantes

### 🤖 **Integração MCP**
- Novos MCPs para automação
- Melhor controle de aplicações
- Integração com mais ferramentas

### 🌍 **Internacionalização**
- Tradução para outros idiomas
- Adaptação cultural
- Exemplos localizados

### 📚 **Documentação**
- Guias mais claros
- Exemplos práticos
- Troubleshooting

### 🎨 **Interface**
- Design mais moderno
- UX melhorado
- Responsividade móvel

### ⚡ **Performance**
- Otimizações de velocidade
- Redução de uso de memória
- Carregamento mais rápido

## 🎯 Guidelines de Desenvolvimento

### **Convenções de Commit**
Seguimos [Conventional Commits](https://conventionalcommits.org/):

```
feat: nova funcionalidade
fix: correção de bug
docs: mudanças na documentação
style: formatação, ponto e vírgula, etc
refactor: refatoração de código
test: adicionando testes
chore: atualizações de build, etc
```

### **Estrutura de Branches**
- `main` - Código estável para produção
- `develop` - Branch de desenvolvimento
- `feature/*` - Novas funcionalidades
- `fix/*` - Correções de bugs
- `docs/*` - Melhorias na documentação

### **Padrões de Código**
- **JavaScript**: ES6+ moderno
- **HTML**: Semântico e acessível
- **CSS**: Mobile-first
- **Comentários**: Em português para contexto CPBR

### **Estrutura de Arquivos**
```
cpbr/
├── presentation/          # Scripts de apresentação
├── web/                  # Interface web
├── scripts/              # Scripts de automação
├── docs/                 # Documentação
├── assets/               # Imagens e recursos
└── examples/             # Exemplos práticos
```

## 🧪 Testando Suas Mudanças

### **Testes Locais**
```bash
# Servidor básico
npm start
# Acesse: http://localhost:3000

# Apresentação simulada
npm run presentation

# Verificação de sistema
npm run check-system
```

### **Teste da Apresentação Completa**
1. Configure múltiplas telas
2. Execute `./run-automated-presentation.sh`
3. Verifique timing e sincronia
4. Teste interação da plateia

### **Validação de Qualidade**
- [ ] Código funciona em Node.js 18+
- [ ] Interface responsiva
- [ ] Documentação atualizada
- [ ] Scripts executáveis
- [ ] Links funcionais

## 🎪 Contexto Campus Party Brasil 2025

Este projeto foi especificamente criado para o **Campus Party Brasil 2025** com o tema **"Documentação 4.0 na Era da IA"**.

### **Objetivos Principais**
1. **Educar** sobre o potencial da IA
2. **Impressionar** com automação total
3. **Inspirar** adoção de ferramentas IA
4. **Demonstrar** ROI quantificável

### **Público-Alvo**
- Desenvolvedores iniciantes e experientes
- Gestores de TI
- Estudantes de tecnologia
- Entusiastas de IA

### **Mensagem Central**
> "De 30 minutos para 0.001 segundos: como a IA revoluciona a documentação de software"

## 🆘 Precisa de Ajuda?

### **Canais de Suporte**
- 📧 **Email**: contribuicoes@exemplo.com
- 💬 **Discord**: [Comunidade CPBR AI](https://discord.gg/cpbr-ai)
- 🐦 **Twitter**: [@cpbr_ai_demo](https://twitter.com/cpbr_ai_demo)

### **Dúvidas Comuns**
- **"Como testar a apresentação?"** → Use `npm run presentation`
- **"MCPs não funcionam?"** → Verifique se Claude Code está configurado
- **"Slides não avançam?"** → Verifique porta 3000 e WebSockets

### **Reportar Problemas**
Use nossos templates de issue:
- [🐛 Bug Report](https://github.com/lucascardoso/cpbr-2025-ai-documentation-demo/issues/new?template=bug_report.md)
- [💡 Feature Request](https://github.com/lucascardoso/cpbr-2025-ai-documentation-demo/issues/new?template=feature_request.md)

## 🏆 Reconhecimento

Contribuidores são reconhecidos:
- **README.md** - Seção de créditos
- **Apresentação** - Slide de agradecimentos
- **GitHub** - Contributors automático
- **Campus Party** - Menção durante evento

### **Hall da Fama**
Os melhores contribuidores ganham:
- 🥇 Badge especial no GitHub
- 🎟️ Convite para Campus Party
- 📚 Acesso a recursos premium
- 💼 Network com especialistas

## 📜 Código de Conduta

Seguimos o [Contributor Covenant](CODE_OF_CONDUCT.md). Resumindo:

✅ **Seja respeitoso e inclusivo**  
✅ **Foque no valor educacional**  
✅ **Colabore construtivamente**  
✅ **Mantenha o ambiente profissional**  

❌ **Sem discriminação ou assédio**  
❌ **Sem spam ou autopromoção**  
❌ **Sem conteúdo ofensivo**  

## 🎯 Próximos Passos

Após sua contribuição:

1. **Review** - Mantenedores revisarão seu PR
2. **Feedback** - Poderemos solicitar ajustes
3. **Merge** - Contribuição aprovada será integrada
4. **Deploy** - Mudanças vão para produção
5. **Reconhecimento** - Você será creditado!

---

**🎉 Obrigado por ajudar a revolucionar a documentação na era da IA!**

*Vamos juntos impressionar o Campus Party Brasil 2025!*

---

*Última atualização: Janeiro 2025*