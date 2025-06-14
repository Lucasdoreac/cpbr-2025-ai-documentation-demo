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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🧮 Calculator API rodando na porta ${PORT}`);
});

module.exports = app;