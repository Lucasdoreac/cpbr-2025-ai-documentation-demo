/**
 * Presentation Maestro - Orquestrador da Apresentação Automatizada
 * Campus Party Brasil 2025 - Documentação 4.0 na Era da IA
 * 
 * Este script coordena:
 * - Playwright (slides)
 * - AppleScript (Sticky Notes + Cursor)
 * - Git (commits automáticos)
 * - Narração contextual
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class PresentationMaestro {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 15;
        this.isRunning = false;
        this.isPaused = false;
        this.startTime = null;
        
        // Timeline da apresentação (em segundos)
        this.timeline = {
            0: 'slide1_introduction',
            15: 'slide2_problem',
            30: 'slide3_revolution', 
            45: 'slide4_architecture',
            60: 'slide5_setup',
            75: 'demo_preparation',
            85: 'open_cursor',
            90: 'create_calculator_file',
            95: 'write_code_class',
            100: 'write_code_constructor',
            105: 'write_code_add_method',
            115: 'save_file',
            120: 'show_ai_documentation',
            135: 'modify_code_add_subtract',
            145: 'show_auto_update',
            155: 'git_commit_automatic',
            170: 'slide11_results',
            185: 'slide12_tools',
            200: 'slide13_success_cases',
            215: 'slide14_next_steps',
            230: 'slide15_conclusion'
        };

        // Narrativas para cada etapa
        this.narratives = {
            slide1_introduction: "🎪 Bem-vindos ao Campus Party Brasil 2025! Vou mostrar como a IA está revolucionando a documentação de software!",
            slide2_problem: "😵 Vejam os problemas que enfrentamos: 70% das documentações estão desatualizadas, perdemos 4 horas por dia!",
            slide3_revolution: "🚀 Em 2024 tudo mudou! Mercado de IA atingiu $184 bilhões, 78% das empresas adotaram IA!",
            slide4_architecture: "🏗️ A arquitetura é simples: Claude Code detecta mudanças, IA processa, documentação aparece!",
            slide5_setup: "⚙️ Agora vou mostrar isso funcionando na prática. Preparem-se para ver a mágica!",
            demo_preparation: "🎬 Iniciando demonstração ao vivo. Vocês vão ver código sendo criado e documentado automaticamente!",
            open_cursor: "💻 Abrindo o Cursor automaticamente... vejam, nem toquei no mouse!",
            create_calculator_file: "📄 Criando arquivo calculator.js... Claude está programando ao vivo!",
            write_code_class: "⌨️ Escrevendo classe Calculator... observem cada linha sendo digitada!",
            write_code_constructor: "🏗️ Adicionando construtor... a IA já está analisando o código!",
            write_code_add_method: "➕ Implementando método add... documentação JSDoc incluída!",
            save_file: "💾 Salvando arquivo... o sistema vai detectar instantaneamente!",
            show_ai_documentation: "⚡ MÁGICA! Documentação gerada em 0.001 segundos! Cronometrem vocês mesmos!",
            modify_code_add_subtract: "🔄 Agora vou modificar o código adicionando método subtract...",
            show_auto_update: "✨ Documentação atualizada automaticamente! Zero intervenção humana!",
            git_commit_automatic: "📝 Fazendo commit automático no Git... até o versionamento é automatizado!",
            slide11_results: "📊 Resultados: 99.9% economia de tempo, de 30 minutos para 0.001 segundos!",
            slide12_tools: "🛠️ Ferramentas disponíveis: Confluence, Notion, GitBook, Claude Code...",
            slide13_success_cases: "🏆 Casos reais: Lumen economizou $50M, Thomson Reuters 10x mais rápido!",
            slide14_next_steps: "🎯 Próximos passos: escolham uma ferramenta, testem, meçam ROI, implementem!",
            slide15_conclusion: "🎉 Conclusão: Esta é a revolução da documentação 4.0! Implementem hoje mesmo!"
        };

        // Código que será escrito ao vivo
        this.liveCodeLines = [
            "/**",
            " * Calculadora Demonstração CPBR 2025",
            " * Criada AO VIVO durante apresentação!",
            " */",
            "",
            "class Calculator {",
            "    constructor() {",
            "        this.history = [];",
            "        console.log('Calculator criada ao vivo!');",
            "    }",
            "",
            "    /**",
            "     * Soma dois números",
            "     * @param {number} a - Primeiro número", 
            "     * @param {number} b - Segundo número",
            "     * @returns {number} Resultado da soma",
            "     */",
            "    add(a, b) {",
            "        const result = a + b;",
            "        this.history.push(`${a} + ${b} = ${result}`);",
            "        return result;",
            "    }",
            "}",
            "",
            "module.exports = Calculator;"
        ];
    }

    /**
     * Inicia a apresentação automatizada
     */
    async startPresentation() {
        console.log('🎬 INICIANDO APRESENTAÇÃO AUTOMATIZADA');
        console.log('🎯 Campus Party Brasil 2025 - Documentação 4.0');
        console.log('⏱️ Duração estimada: 4 minutos');
        console.log('════════════════════════════════════════\n');

        this.isRunning = true;
        this.startTime = Date.now();

        // Criar Sticky Note inicial
        await this.createStickyNote("🎪 APRESENTAÇÃO INICIADA", "Documentação 4.0 na Era da IA\nCampus Party Brasil 2025\n\nStatus: Iniciando...");

        // Navegar para slide inicial
        await this.navigateToSlide(0);

        // Iniciar timeline
        this.runTimeline();
    }

    /**
     * Executa a timeline da apresentação
     */
    runTimeline() {
        const checkTime = () => {
            if (!this.isRunning || this.isPaused) return;

            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            
            if (this.timeline[elapsed]) {
                this.executeStep(this.timeline[elapsed]);
            }

            // Continuar verificando
            setTimeout(checkTime, 100);
        };

        checkTime();
    }

    /**
     * Executa uma etapa específica
     */
    async executeStep(step) {
        console.log(`⚡ Executando: ${step} (${this.getElapsedTime()})`);
        
        try {
            switch(step) {
                case 'slide1_introduction':
                    await this.slide1_Introduction();
                    break;
                case 'slide2_problem':
                    await this.slide2_Problem();
                    break;
                case 'slide3_revolution':
                    await this.slide3_Revolution();
                    break;
                case 'slide4_architecture':
                    await this.slide4_Architecture();
                    break;
                case 'slide5_setup':
                    await this.slide5_Setup();
                    break;
                case 'demo_preparation':
                    await this.demoPreparation();
                    break;
                case 'open_cursor':
                    await this.openCursor();
                    break;
                case 'create_calculator_file':
                    await this.createCalculatorFile();
                    break;
                case 'write_code_class':
                    await this.writeCodeClass();
                    break;
                case 'write_code_constructor':
                    await this.writeCodeConstructor();
                    break;
                case 'write_code_add_method':
                    await this.writeCodeAddMethod();
                    break;
                case 'save_file':
                    await this.saveFile();
                    break;
                case 'show_ai_documentation':
                    await this.showAIDocumentation();
                    break;
                case 'modify_code_add_subtract':
                    await this.modifyCodeAddSubtract();
                    break;
                case 'show_auto_update':
                    await this.showAutoUpdate();
                    break;
                case 'git_commit_automatic':
                    await this.gitCommitAutomatic();
                    break;
                case 'slide11_results':
                    await this.slide11_Results();
                    break;
                case 'slide12_tools':
                    await this.slide12_Tools();
                    break;
                case 'slide13_success_cases':
                    await this.slide13_SuccessCases();
                    break;
                case 'slide14_next_steps':
                    await this.slide14_NextSteps();
                    break;
                case 'slide15_conclusion':
                    await this.slide15_Conclusion();
                    break;
                default:
                    console.log(`❌ Etapa desconhecida: ${step}`);
            }
        } catch (error) {
            console.error(`❌ Erro na etapa ${step}:`, error);
        }
    }

    // ==================== SLIDES ====================

    async slide1_Introduction() {
        await this.navigateToSlide(0);
        await this.updateStickyNote("🎪 SLIDE 1 - INTRODUÇÃO", this.narratives.slide1_introduction);
        await this.speak(this.narratives.slide1_introduction);
    }

    async slide2_Problem() {
        await this.navigateToSlide(1);
        await this.updateStickyNote("😵 SLIDE 2 - O PROBLEMA", this.narratives.slide2_problem);
        await this.speak(this.narratives.slide2_problem);
    }

    async slide3_Revolution() {
        await this.navigateToSlide(2);
        await this.updateStickyNote("🚀 SLIDE 3 - REVOLUÇÃO 2024", this.narratives.slide3_revolution);
        await this.speak(this.narratives.slide3_revolution);
    }

    async slide4_Architecture() {
        await this.navigateToSlide(3);
        await this.updateStickyNote("🏗️ SLIDE 4 - ARQUITETURA", this.narratives.slide4_architecture);
        await this.speak(this.narratives.slide4_architecture);
    }

    async slide5_Setup() {
        await this.navigateToSlide(4);
        await this.updateStickyNote("⚙️ SLIDE 5 - PREPARAÇÃO DEMO", this.narratives.slide5_setup);
        await this.speak(this.narratives.slide5_setup);
    }

    // ==================== DEMO AO VIVO ====================

    async demoPreparation() {
        await this.updateStickyNote("🎬 DEMO AO VIVO", this.narratives.demo_preparation);
        await this.speak(this.narratives.demo_preparation);
        await this.navigateToSlide(5); // Slide de demo
    }

    async openCursor() {
        await this.updateStickyNote("💻 ABRINDO CURSOR", this.narratives.open_cursor);
        await this.speak(this.narratives.open_cursor);
        
        // AppleScript para abrir Cursor
        const script = `
            tell application "Cursor" to activate
            delay 1
            tell application "System Events"
                keystroke "n" using command down
            end tell
            delay 0.5
        `;
        await this.runAppleScript(script);
    }

    async createCalculatorFile() {
        await this.updateStickyNote("📄 CRIANDO ARQUIVO", this.narratives.create_calculator_file);
        await this.speak(this.narratives.create_calculator_file);
        
        // Salvar como calculator-live.js
        const script = `
            tell application "System Events"
                keystroke "s" using command down
                delay 1
                type text "calculator-live.js"
                delay 0.5
                key code 36
            end tell
        `;
        await this.runAppleScript(script);
    }

    async writeCodeClass() {
        await this.updateStickyNote("⌨️ ESCREVENDO CLASSE", this.narratives.write_code_class);
        await this.speak(this.narratives.write_code_class);
        
        // Escrever primeiras linhas
        const lines = this.liveCodeLines.slice(0, 6);
        await this.typeCodeLines(lines);
    }

    async writeCodeConstructor() {
        await this.updateStickyNote("🏗️ ADICIONANDO CONSTRUTOR", this.narratives.write_code_constructor);
        await this.speak(this.narratives.write_code_constructor);
        
        // Escrever construtor
        const lines = this.liveCodeLines.slice(6, 11);
        await this.typeCodeLines(lines);
    }

    async writeCodeAddMethod() {
        await this.updateStickyNote("➕ MÉTODO ADD", this.narratives.write_code_add_method);
        await this.speak(this.narratives.write_code_add_method);
        
        // Escrever método add completo
        const lines = this.liveCodeLines.slice(11);
        await this.typeCodeLines(lines);
    }

    async saveFile() {
        await this.updateStickyNote("💾 SALVANDO ARQUIVO", this.narratives.save_file);
        await this.speak(this.narratives.save_file);
        
        const script = `
            tell application "System Events"
                keystroke "s" using command down
            end tell
        `;
        await this.runAppleScript(script);
        
        await this.delay(1000);
    }

    async showAIDocumentation() {
        await this.updateStickyNote("⚡ IA PROCESSANDO!", this.narratives.show_ai_documentation);
        await this.speak(this.narratives.show_ai_documentation);
        
        // Mostrar documentação gerada
        await this.navigateToUrl('http://localhost:3000/viewer');
        await this.delay(3000);
    }

    async modifyCodeAddSubtract() {
        await this.updateStickyNote("🔄 MODIFICANDO CÓDIGO", this.narratives.modify_code_add_subtract);
        await this.speak(this.narratives.modify_code_add_subtract);
        
        // Voltar para Cursor e adicionar método subtract
        const script = `
            tell application "Cursor" to activate
            delay 0.5
            tell application "System Events"
                key code 125 -- down arrow
                key code 125 -- down arrow  
                key code 36 -- enter
                type text "    subtract(a, b) { return a - b; }"
                keystroke "s" using command down
            end tell
        `;
        await this.runAppleScript(script);
    }

    async showAutoUpdate() {
        await this.updateStickyNote("✨ ATUALIZAÇÃO AUTOMÁTICA", this.narratives.show_auto_update);
        await this.speak(this.narratives.show_auto_update);
        
        // Mostrar documentação atualizada
        await this.navigateToUrl('http://localhost:3000/viewer');
        await this.delay(2000);
    }

    async gitCommitAutomatic() {
        await this.updateStickyNote("📝 GIT COMMIT AUTOMÁTICO", this.narratives.git_commit_automatic);
        await this.speak(this.narratives.git_commit_automatic);
        
        // Fazer commit automático
        const commands = [
            'cd /Users/lucascardoso/apps/MCP/cpbr',
            'git add .',
            'git commit -m "feat: Add Calculator class created live during presentation\\n\\n- Implemented Calculator with add/subtract methods\\n- Created during Campus Party Brasil 2025 demo\\n- AI documentation generated automatically\\n\\n🤖 Generated with Claude Code\\nCo-Authored-By: Claude <noreply@anthropic.com>"'
        ];
        
        for (const cmd of commands) {
            await this.runCommand(cmd);
        }
    }

    // ==================== SLIDES FINAIS ====================

    async slide11_Results() {
        await this.navigateToSlide(10);
        await this.updateStickyNote("📊 RESULTADOS", this.narratives.slide11_results);
        await this.speak(this.narratives.slide11_results);
    }

    async slide12_Tools() {
        await this.navigateToSlide(11);
        await this.updateStickyNote("🛠️ FERRAMENTAS", this.narratives.slide12_tools);
        await this.speak(this.narratives.slide12_tools);
    }

    async slide13_SuccessCases() {
        await this.navigateToSlide(12);
        await this.updateStickyNote("🏆 CASOS DE SUCESSO", this.narratives.slide13_success_cases);
        await this.speak(this.narratives.slide13_success_cases);
    }

    async slide14_NextSteps() {
        await this.navigateToSlide(13);
        await this.updateStickyNote("🎯 PRÓXIMOS PASSOS", this.narratives.slide14_next_steps);
        await this.speak(this.narratives.slide14_next_steps);
    }

    async slide15_Conclusion() {
        await this.navigateToSlide(14);
        await this.updateStickyNote("🎉 CONCLUSÃO", this.narratives.slide15_conclusion);
        await this.speak(this.narratives.slide15_conclusion);
        
        // Finalizar apresentação
        setTimeout(() => {
            this.finishPresentation();
        }, 5000);
    }

    // ==================== UTILITÁRIOS ====================

    async navigateToSlide(slideNumber) {
        // Simular navegação usando Playwright
        console.log(`📄 Navegando para slide ${slideNumber + 1}`);
        this.currentSlide = slideNumber;
        
        // Se necessário, implementar navegação real via Playwright MCP
        // Por ora, simular delay
        await this.delay(500);
    }

    async navigateToUrl(url) {
        console.log(`🌐 Navegando para: ${url}`);
        // Implementar via Playwright MCP se necessário
        await this.delay(1000);
    }

    async createStickyNote(title, content) {
        const script = `
            tell application "Stickies"
                activate
                set newNote to make new note
                set contents of newNote to "${title}\\n\\n${content}"
                set bounds of newNote to {100, 100, 400, 300}
            end tell
        `;
        await this.runAppleScript(script);
    }

    async updateStickyNote(title, content) {
        const script = `
            tell application "Stickies"
                activate
                try
                    set contents of note 1 to "${title}\\n\\n${content}\\n\\nTempo: ${this.getElapsedTime()}"
                end try
            end tell
        `;
        await this.runAppleScript(script);
    }

    async typeCodeLines(lines) {
        for (const line of lines) {
            await this.typeLine(line);
            await this.delay(200);
        }
    }

    async typeLine(text) {
        const script = `
            tell application "System Events"
                type text "${text}"
                key code 36
            end tell
        `;
        await this.runAppleScript(script);
        await this.delay(300);
    }

    async runAppleScript(script) {
        return new Promise((resolve, reject) => {
            const cleanScript = script.replace(/"/g, '\\"');
            exec(`osascript -e "${cleanScript}"`, (error, stdout, stderr) => {
                if (error) {
                    console.error('AppleScript error:', error);
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        });
    }

    async runCommand(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error('Command error:', error);
                    reject(error);
                } else {
                    console.log('Command output:', stdout);
                    resolve(stdout);
                }
            });
        });
    }

    async speak(text) {
        console.log(`🎙️ Narração: ${text}`);
        
        // Opcional: usar say command do macOS
        // await this.runCommand(`say "${text}"`);
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getElapsedTime() {
        if (!this.startTime) return '00:00';
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // ==================== CONTROLES ====================

    pause() {
        this.isPaused = true;
        console.log('⏸️ Apresentação pausada');
    }

    resume() {
        this.isPaused = false;
        console.log('▶️ Apresentação retomada');
    }

    stop() {
        this.isRunning = false;
        console.log('⏹️ Apresentação parada');
    }

    async finishPresentation() {
        this.isRunning = false;
        console.log('\n🎉 APRESENTAÇÃO CONCLUÍDA!');
        console.log(`⏱️ Tempo total: ${this.getElapsedTime()}`);
        console.log('🎯 Campus Party Brasil 2025 - Obrigado!');
        
        await this.updateStickyNote("🎉 FIM!", "Apresentação concluída!\\n\\nObrigado Campus Party Brasil 2025!\\n\\nTempo: " + this.getElapsedTime());
        
        // Opcional: voltar para slide inicial
        await this.navigateToSlide(0);
    }
}

// Exportar para uso
module.exports = PresentationMaestro;

// Se executado diretamente, iniciar apresentação
if (require.main === module) {
    const maestro = new PresentationMaestro();
    
    console.log('🎬 CLAUDE PRESENTATION MAESTRO');
    console.log('Pressione ENTER para iniciar a apresentação automatizada...');
    
    process.stdin.once('data', () => {
        maestro.startPresentation();
    });
    
    // Controles de teclado
    process.stdin.setRawMode(true);
    process.stdin.on('data', (key) => {
        if (key.toString() === ' ') {
            maestro.isPaused ? maestro.resume() : maestro.pause();
        } else if (key.toString() === '\u001b') { // ESC
            maestro.stop();
            process.exit(0);
        }
    });
}