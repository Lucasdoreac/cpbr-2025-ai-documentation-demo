const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class AIDocWatcher {
    constructor() {
        this.watcher = null;
        this.lastChange = new Date();
        this.filesWatched = 0;
        this.docsGenerated = 0;
        this.timesSaved = [];
    }

    start() {
        console.log('\n🤖 AI Documentation Watcher iniciado...');
        console.log('📁 Monitorando diretório: ./src');
        console.log('📝 Documentos serão gerados em: ./docs');
        console.log('🔴 LIVE: Acompanhe em http://localhost:3000\n');
        
        // Garantir que os diretórios existem
        this.ensureDirectories();
        
        // Configurar watcher
        this.watcher = chokidar.watch('./src/**/*.{js,ts,py,md}', {
            ignored: [/node_modules/, /\.git/, /docs/],
            persistent: true,
            ignoreInitial: false
        });

        // Event handlers
        this.watcher.on('add', this.handleFileAdd.bind(this));
        this.watcher.on('change', this.handleFileChange.bind(this));
        this.watcher.on('unlink', this.handleFileDelete.bind(this));
        this.watcher.on('error', this.handleError.bind(this));
        
        // Stats periodicas
        setInterval(this.logStats.bind(this), 30000);
    }

    ensureDirectories() {
        const dirs = ['./src', './docs', './public'];
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`📁 Diretório criado: ${dir}`);
            }
        });
    }

    async handleFileAdd(filePath) {
        this.filesWatched++;
        console.log(`➕ Novo arquivo detectado: ${filePath}`);
        await this.generateDocumentation(filePath, 'add');
    }

    async handleFileChange(filePath) {
        console.log(`📝 Arquivo modificado: ${filePath}`);
        await this.generateDocumentation(filePath, 'change');
    }

    async handleFileDelete(filePath) {
        console.log(`🗑️ Arquivo removido: ${filePath}`);
        const docPath = this.getDocPath(filePath);
        if (fs.existsSync(docPath)) {
            fs.unlinkSync(docPath);
            console.log(`📄 Documentação removida: ${docPath}`);
        }
    }

    handleError(error) {
        console.error('❌ Erro no watcher:', error);
    }

    async generateDocumentation(filePath, action) {
        const startTime = Date.now();
        
        try {
            console.log(`🔄 Processando ${filePath}...`);
            
            // Ler conteúdo do arquivo
            const content = fs.readFileSync(filePath, 'utf8');
            const docPath = this.getDocPath(filePath);
            
            // Gerar documentação com Claude Code simulation
            const aiDoc = await this.generateAIDoc(content, filePath, action);
            
            // Escrever documentação
            fs.writeFileSync(docPath, aiDoc);
            
            const timeSpent = Date.now() - startTime;
            this.timesSaved.push(timeSpent);
            this.docsGenerated++;
            
            console.log(`✅ Documentação gerada: ${docPath} (${timeSpent}ms)`);
            
            // Notificar servidor websocket se estiver rodando
            this.notifyServer(docPath, aiDoc);
            
        } catch (error) {
            console.error(`❌ Erro ao processar ${filePath}:`, error.message);
        }
    }

    getDocPath(filePath) {
        const relativePath = path.relative('./src', filePath);
        const docFileName = path.parse(relativePath).name + '.md';
        return path.join('./docs', docFileName);
    }

    async generateAIDoc(content, filePath, action) {
        // Simulação de análise IA - em produção seria integração real com Claude Code
        const fileName = path.basename(filePath);
        const extension = path.extname(filePath);
        const lineCount = content.split('\n').length;
        const wordCount = content.split(/\s+/).length;
        
        // Análise básica do código
        const functions = this.extractFunctions(content, extension);
        const imports = this.extractImports(content, extension);
        const exports = this.extractExports(content, extension);
        
        const timestamp = new Date().toISOString();
        
        return `# ${fileName} - Documentação Auto-Gerada

## 📊 Informações Gerais
- **Arquivo**: \`${filePath}\`
- **Linhas**: ${lineCount}
- **Palavras**: ${wordCount}
- **Última atualização**: ${timestamp}
- **Ação**: ${action === 'add' ? 'Arquivo adicionado' : 'Arquivo modificado'}

## 📦 Imports e Dependências
${imports.length > 0 ? imports.map(imp => `- \`${imp}\``).join('\n') : '- Nenhum import detectado'}

## 🔧 Funções e Métodos
${functions.length > 0 ? functions.map(func => `
### \`${func.name}\`
- **Linha**: ${func.line}
- **Parâmetros**: ${func.params || 'Nenhum'}
- **Descrição**: ${func.description || 'Auto-detectada pelo AI Analyzer'}
`).join('\n') : '- Nenhuma função detectada'}

## 📤 Exports
${exports.length > 0 ? exports.map(exp => `- \`${exp}\``).join('\n') : '- Nenhum export detectado'}

## 📋 Análise de Código

### Complexidade Estimada
- **Simples**: ${functions.length <= 3 ? '✅' : '❌'}
- **Bem estruturado**: ${imports.length > 0 || exports.length > 0 ? '✅' : '⚠️'}
- **Documentado**: ${content.includes('//') || content.includes('/*') ? '✅' : '❌ (Considere adicionar comentários)'}

### Sugestões de Melhoria
${this.generateSuggestions(content, extension)}

## 🚀 Exemplo de Uso
\`\`\`${extension.replace('.', '')}
// TODO: Adicione exemplos de uso aqui
// Este conteúdo será gerado automaticamente pelo Claude Code
\`\`\`

---
*📡 Documentação gerada automaticamente pelo AI Doc System*  
*🤖 Powered by Claude Code + File Watcher*  
*⚡ Processado em tempo real - ${timestamp}*

> 💡 **Dica**: Esta documentação é atualizada automaticamente sempre que o arquivo é modificado!
`;
    }

    extractFunctions(content, extension) {
        const functions = [];
        const lines = content.split('\n');
        
        lines.forEach((line, index) => {
            let match;
            
            // JavaScript/TypeScript functions
            if (extension === '.js' || extension === '.ts') {
                match = line.match(/(?:function\s+(\w+)|(?:const|let|var)\s+(\w+)\s*=\s*(?:function|\(.*\)\s*=>)|(\w+)\s*:\s*function)/);
                if (match) {
                    functions.push({
                        name: match[1] || match[2] || match[3],
                        line: index + 1,
                        params: this.extractParams(line),
                        description: 'Função JavaScript detectada'
                    });
                }
            }
            
            // Python functions
            if (extension === '.py') {
                match = line.match(/def\s+(\w+)\s*\(/);
                if (match) {
                    functions.push({
                        name: match[1],
                        line: index + 1,
                        params: this.extractParams(line),
                        description: 'Função Python detectada'
                    });
                }
            }
        });
        
        return functions;
    }

    extractImports(content, extension) {
        const imports = [];
        const lines = content.split('\n');
        
        lines.forEach(line => {
            let match;
            
            if (extension === '.js' || extension === '.ts') {
                match = line.match(/(?:import\s+.*from\s+['"](.+)['"]|const\s+.*=\s+require\(['"](.+)['"]\))/);
                if (match) {
                    imports.push(match[1] || match[2]);
                }
            }
            
            if (extension === '.py') {
                match = line.match(/(?:import\s+(\w+)|from\s+(\w+))/);
                if (match) {
                    imports.push(match[1] || match[2]);
                }
            }
        });
        
        return [...new Set(imports)]; // Remove duplicates
    }

    extractExports(content, extension) {
        const exports = [];
        const lines = content.split('\n');
        
        lines.forEach(line => {
            let match;
            
            if (extension === '.js' || extension === '.ts') {
                match = line.match(/export\s+(?:default\s+)?(?:function\s+)?(\w+)|module\.exports\s*=\s*(\w+)/);
                if (match) {
                    exports.push(match[1] || match[2]);
                }
            }
        });
        
        return [...new Set(exports)];
    }

    extractParams(line) {
        const match = line.match(/\(([^)]*)\)/);
        return match ? match[1].trim() : '';
    }

    generateSuggestions(content, extension) {
        const suggestions = [];
        
        if (!content.includes('//') && !content.includes('/*')) {
            suggestions.push('- 💬 Adicione comentários para melhor legibilidade');
        }
        
        if (content.includes('console.log') || content.includes('print(')) {
            suggestions.push('- 🧹 Considere remover logs de debug para produção');
        }
        
        if (content.length > 1000) {
            suggestions.push('- ✂️ Arquivo longo - considere dividir em módulos menores');
        }
        
        if (suggestions.length === 0) {
            suggestions.push('- ✨ Código bem estruturado, continue assim!');
        }
        
        return suggestions.join('\n');
    }

    notifyServer(docPath, content) {
        // Em produção, enviaria via WebSocket para o servidor
        // Por ora, apenas salva um arquivo de log
        const logEntry = {
            timestamp: new Date().toISOString(),
            file: docPath,
            action: 'doc_generated',
            size: content.length
        };
        
        const logPath = './docs/activity.json';
        let log = [];
        
        if (fs.existsSync(logPath)) {
            try {
                log = JSON.parse(fs.readFileSync(logPath, 'utf8'));
            } catch (e) {
                log = [];
            }
        }
        
        log.push(logEntry);
        // Manter apenas os 50 últimos entries
        if (log.length > 50) {
            log = log.slice(-50);
        }
        
        fs.writeFileSync(logPath, JSON.stringify(log, null, 2));
    }

    logStats() {
        const avgTime = this.timesSaved.length > 0 
            ? Math.round(this.timesSaved.reduce((a, b) => a + b, 0) / this.timesSaved.length)
            : 0;
            
        console.log('\n📊 ESTATÍSTICAS:');
        console.log(`📁 Arquivos monitorados: ${this.filesWatched}`);
        console.log(`📝 Documentos gerados: ${this.docsGenerated}`);
        console.log(`⚡ Tempo médio de processamento: ${avgTime}ms`);
        console.log(`💾 Último update: ${this.lastChange.toLocaleTimeString()}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }

    stop() {
        if (this.watcher) {
            this.watcher.close();
            console.log('🛑 AI Doc Watcher parado');
        }
    }
}

// Inicializar watcher
const watcher = new AIDocWatcher();

// Handlers para parar gracefully
process.on('SIGINT', () => {
    console.log('\n🛑 Parando AI Doc Watcher...');
    watcher.stop();
    process.exit(0);
});

process.on('SIGTERM', () => {
    watcher.stop();
    process.exit(0);
});

// Iniciar
watcher.start();

module.exports = AIDocWatcher;