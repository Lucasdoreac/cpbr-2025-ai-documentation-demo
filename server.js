const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const md = new MarkdownIt();

// Middleware
app.use(express.static('.'));
app.use('/docs', express.static('docs'));
app.use('/src', express.static('src'));
app.use(express.json());

// Stats globais
let serverStats = {
    filesMonitored: 0,
    docsGenerated: 0,
    timeSaved: 0,
    connections: 0,
    startTime: new Date()
};

// Garantir diretórios
const ensureDirectories = () => {
    const dirs = ['./src', './docs', './public'];
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};

ensureDirectories();

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/stats', (req, res) => {
    const uptime = Math.floor((Date.now() - serverStats.startTime.getTime()) / 1000);
    res.json({
        ...serverStats,
        uptime: uptime,
        uptimeFormatted: formatUptime(uptime)
    });
});

app.get('/api/files', (req, res) => {
    try {
        const srcFiles = getFilesRecursive('./src');
        const docFiles = getFilesRecursive('./docs');
        
        res.json({
            source: srcFiles,
            documentation: docFiles,
            total: srcFiles.length + docFiles.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/docs/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join('./docs', filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Documentation not found' });
        }
        
        const content = fs.readFileSync(filePath, 'utf8');
        const html = md.render(content);
        
        res.json({
            filename: filename,
            content: content,
            html: html,
            lastModified: fs.statSync(filePath).mtime
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/didactic', (req, res) => {
    res.sendFile(path.join(__dirname, 'didactic-viewer.html'));
});

app.get('/viewer', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>AI Docs Viewer - Live</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #1a1a1a;
            color: #ffffff;
            margin: 0;
            padding: 20px;
        }
        .header {
            background: linear-gradient(45deg, #00ff88, #8338ec);
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 30px;
            text-align: center;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            border: 2px solid #00ff88;
        }
        .stat-number {
            font-size: 2.5em;
            font-weight: bold;
            color: #00ff88;
        }
        .content-area {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 30px;
        }
        .file-list {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 20px;
            max-height: 600px;
            overflow-y: auto;
        }
        .doc-viewer {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 20px;
            max-height: 600px;
            overflow-y: auto;
        }
        .file-item {
            padding: 10px;
            margin: 5px 0;
            background: rgba(131, 56, 236, 0.2);
            border-radius: 8px;
            cursor: pointer;
            border: 1px solid transparent;
            transition: all 0.3s ease;
        }
        .file-item:hover {
            border-color: #00ff88;
            background: rgba(0, 255, 136, 0.2);
        }
        .file-item.active {
            border-color: #00ff88;
            background: rgba(0, 255, 136, 0.3);
        }
        .live-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            background: #ff0000;
            border-radius: 50%;
            animation: pulse 2s infinite;
            margin-right: 10px;
        }
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
        }
        .activity-log {
            background: #1e1e1e;
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
            max-height: 200px;
            overflow-y: auto;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        .log-entry {
            margin: 5px 0;
            padding: 5px;
            border-left: 3px solid #00ff88;
            padding-left: 10px;
        }
        .timestamp {
            color: #00ff88;
            margin-right: 10px;
        }
        pre {
            background: #2a2a2a;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
        }
        code {
            background: rgba(255, 255, 255, 0.1);
            padding: 2px 6px;
            border-radius: 4px;
        }
        h1, h2, h3 { color: #00ff88; }
        a { color: #8338ec; }
    </style>
</head>
<body>
    <div class="header">
        <h1><span class="live-indicator"></span>AI Documentation System - Live Viewer</h1>
        <p>Campus Party Brasil 2025 - Documentação em Tempo Real</p>
    </div>

    <div class="stats">
        <div class="stat-card">
            <div class="stat-number" id="files-monitored">0</div>
            <div>Arquivos Monitorados</div>
        </div>
        <div class="stat-card">
            <div class="stat-number" id="docs-generated">0</div>
            <div>Docs Gerados</div>
        </div>
        <div class="stat-card">
            <div class="stat-number" id="connections">0</div>
            <div>Conexões Ativas</div>
        </div>
        <div class="stat-card">
            <div class="stat-number" id="uptime">0s</div>
            <div>Tempo Online</div>
        </div>
    </div>

    <div class="content-area">
        <div class="file-list">
            <h3>📁 Documentação Disponível</h3>
            <div id="file-list-content">
                <p>Carregando arquivos...</p>
            </div>
        </div>
        
        <div class="doc-viewer">
            <h3>📄 Visualizador de Documentos</h3>
            <div id="doc-content">
                <p>Selecione um arquivo na lista para visualizar a documentação gerada automaticamente.</p>
            </div>
        </div>
    </div>

    <div class="activity-log">
        <h3>📊 Log de Atividade em Tempo Real</h3>
        <div id="activity-log"></div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        let currentStats = {};

        // Elementos DOM
        const filesMonitoredEl = document.getElementById('files-monitored');
        const docsGeneratedEl = document.getElementById('docs-generated');
        const connectionsEl = document.getElementById('connections');
        const uptimeEl = document.getElementById('uptime');
        const fileListEl = document.getElementById('file-list-content');
        const docContentEl = document.getElementById('doc-content');
        const activityLogEl = document.getElementById('activity-log');

        // Atualizar stats
        function updateStats(stats) {
            currentStats = stats;
            filesMonitoredEl.textContent = stats.filesMonitored || 0;
            docsGeneratedEl.textContent = stats.docsGenerated || 0;
            connectionsEl.textContent = stats.connections || 0;
            uptimeEl.textContent = stats.uptimeFormatted || '0s';
        }

        // Carregar lista de arquivos
        async function loadFileList() {
            try {
                const response = await fetch('/api/files');
                const data = await response.json();
                
                let html = '';
                if (data.documentation && data.documentation.length > 0) {
                    data.documentation.forEach(file => {
                        html += \`<div class="file-item" onclick="loadDocument('\${file.name}')">\${file.name}</div>\`;
                    });
                } else {
                    html = '<p>Nenhuma documentação gerada ainda. Modifique um arquivo em /src para ver a mágica acontecer!</p>';
                }
                
                fileListEl.innerHTML = html;
            } catch (error) {
                fileListEl.innerHTML = '<p>Erro ao carregar lista de arquivos</p>';
            }
        }

        // Carregar documento
        async function loadDocument(filename) {
            try {
                const response = await fetch(\`/api/docs/\${filename}\`);
                const data = await response.json();
                
                docContentEl.innerHTML = data.html;
                
                // Marcar como ativo
                document.querySelectorAll('.file-item').forEach(item => {
                    item.classList.remove('active');
                    if (item.textContent === filename) {
                        item.classList.add('active');
                    }
                });
            } catch (error) {
                docContentEl.innerHTML = '<p>Erro ao carregar documento</p>';
            }
        }

        // Adicionar entrada no log
        function addLogEntry(message, type = 'info') {
            const timestamp = new Date().toLocaleTimeString();
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            entry.innerHTML = \`<span class="timestamp">[\${timestamp}]</span> \${message}\`;
            
            activityLogEl.insertBefore(entry, activityLogEl.firstChild);
            
            // Manter apenas 20 entradas
            const entries = activityLogEl.querySelectorAll('.log-entry');
            if (entries.length > 20) {
                entries[entries.length - 1].remove();
            }
        }

        // Socket events
        socket.on('connect', () => {
            addLogEntry('🔗 Conectado ao servidor', 'success');
            loadFileList();
        });

        socket.on('docUpdate', (data) => {
            addLogEntry(\`📝 \${data.filename} atualizado\`, 'update');
            loadFileList(); // Recarregar lista
        });

        socket.on('statsUpdate', (data) => {
            updateStats(data);
        });

        socket.on('fileChange', (data) => {
            addLogEntry(\`🔄 Arquivo modificado: \${data.filename}\`, 'change');
        });

        socket.on('disconnect', () => {
            addLogEntry('❌ Desconectado do servidor', 'error');
        });

        // Carregar stats iniciais
        fetch('/api/stats')
            .then(response => response.json())
            .then(updateStats)
            .catch(console.error);

        // Atualizar stats periodicamente
        setInterval(() => {
            fetch('/api/stats')
                .then(response => response.json())
                .then(updateStats)
                .catch(console.error);
        }, 5000);

        // Carregar lista inicial
        loadFileList();
        
        // Log inicial
        addLogEntry('🚀 Sistema de documentação AI iniciado');
        addLogEntry('👁️ Monitorando mudanças em tempo real');
    </script>
</body>
</html>
    `);
});

// WebSocket para updates em tempo real
io.on('connection', (socket) => {
    serverStats.connections++;
    console.log(`👥 Cliente conectado. Total: ${serverStats.connections}`);
    
    // Enviar stats atuais
    socket.emit('statsUpdate', serverStats);
    
    socket.on('disconnect', () => {
        serverStats.connections--;
        console.log(`👋 Cliente desconectado. Total: ${serverStats.connections}`);
    });
});

// Monitorar mudanças na documentação
if (fs.existsSync('./docs')) {
    fs.watch('./docs', { recursive: true }, (eventType, filename) => {
        if (filename && filename.endsWith('.md')) {
            console.log(`📄 Documentação atualizada: ${filename}`);
            
            try {
                const content = fs.readFileSync(`./docs/${filename}`, 'utf8');
                serverStats.docsGenerated++;
                
                io.emit('docUpdate', {
                    filename: filename,
                    content: content,
                    timestamp: new Date().toISOString()
                });
                
                io.emit('statsUpdate', serverStats);
            } catch (error) {
                console.error('Erro ao ler arquivo:', error);
            }
        }
    });
}

// Monitorar mudanças no código fonte
if (fs.existsSync('./src')) {
    fs.watch('./src', { recursive: true }, (eventType, filename) => {
        if (filename) {
            console.log(`🔄 Arquivo fonte modificado: ${filename}`);
            serverStats.filesMonitored++;
            
            io.emit('fileChange', {
                filename: filename,
                eventType: eventType,
                timestamp: new Date().toISOString()
            });
            
            io.emit('statsUpdate', serverStats);
        }
    });
}

// Utility functions
function getFilesRecursive(dir) {
    const files = [];
    
    if (!fs.existsSync(dir)) {
        return files;
    }
    
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            files.push(...getFilesRecursive(fullPath));
        } else {
            files.push({
                name: item,
                path: fullPath,
                size: stat.size,
                modified: stat.mtime
            });
        }
    });
    
    return files;
}

function formatUptime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Parando servidor...');
    server.close(() => {
        console.log('✅ Servidor parado com sucesso');
        process.exit(0);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('\n🌐 ═══════════════════════════════════════');
    console.log('🚀 AI Documentation Server iniciado!');
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`👁️ Viewer: http://localhost:${PORT}/viewer`);
    console.log('🎤 Apresentação: http://localhost:${PORT}');
    console.log('═══════════════════════════════════════\n');
    console.log('🔴 LIVE: Sistema pronto para demonstração!');
    console.log('📁 Monitorando: ./src (código fonte)');
    console.log('📝 Documentos: ./docs (gerados automaticamente)');
    console.log('\n💡 Dica: Modifique qualquer arquivo em ./src para ver a documentação sendo gerada em tempo real!\n');
});

module.exports = { app, server, io };