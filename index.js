// 1. Importando o express
const express = require('express');

// 2. Inicializando o aplicativo
const app = express();

// 3. Configurando para a API entender JSON (o formato padrão de comunicação)
app.use(express.json());

//Banco de Dados Falso (em Memória)
let usuarios = [
    {id: 1, nome: "João"},
    {id: 2, nome: "Maria"}
];

// 4. Criando nossa primeira Rota (Endpoint)
app.get('/api/teste', (req, res) => {
    // Quando alguém acessar essa rota, a API responde com esse JSON
    res.json({ mensagem: "Olá! Minha API REST está funcionando perfeitamente!" });
});

// GET: Retorna todos os usuários
app.get('/api/usuarios', (req, res) => {
    res.json(usuarios);
});

// GET com ID: Retorna apenas um usuário específico
app.get('/api/usuarios/:id', (req, res) => {
    // Pegamos o ID que veio na URL (ex: /api/usuarios/1)
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    
    if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    res.json(usuario);
});

// POST: Cria um novo usuário
app.post('/api/usuarios', (req, res) => {
    // Pegamos o nome que o usuário enviou no "corpo" (body) da requisição
    const novoNome = req.body.nome;
    
    const novoUsuario = {
        id: usuarios.length + 1, // Gera um ID falso
        nome: novoNome
    };
    
    usuarios.push(novoUsuario); // Adiciona na nossa lista
    res.status(201).json(novoUsuario); // 201 significa "Criado com sucesso"
});

// PUT: Atualiza um usuário existente
app.put('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const novoNome = req.body.nome;
    
    const usuario = usuarios.find(u => u.id === id);
    
    if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    
    usuario.nome = novoNome; // Atualiza o nome
    res.json(usuario);
});

// DELETE: Apaga um usuário
app.delete('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);
    
    if (index === -1) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    
    usuarios.splice(index, 1); // Remove o usuário da lista
    res.json({ mensagem: "Usuário apagado com sucesso!" });
});

// 5. Definindo a porta em que o servidor vai rodar e "ligando" ele
const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}... 🚀`);
});

app.listen(PORTA, () => {
    console.log('Essa foi a minha primeira API com CRUD');
});