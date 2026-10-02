-- Tabela de Produtos conforme SRS (Seção 5)
CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo TEXT NOT NULL UNIQUE,
    nome TEXT NOT NULL,
    descricao TEXT,
    custo REAL NOT NULL,
    valor_venda REAL NOT NULL,
    estoque INTEGER NOT NULL DEFAULT 0,
    imagem_url TEXT
);

-- Tabela de Vendas conforme SRS (Seção 5)
CREATE TABLE IF NOT EXISTS vendas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    valor_total REAL NOT NULL,
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos (id)
);