import sqlite3

def popular_banco():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # RN-01: Limite do Catálogo de Produtos estritamente aos 03 produtos da empresa
    produtos = [
        (
            'PROD-001',
            'Geleia Artesanal de Morango 300g',
            'Geleia natural produzida com frutas selecionadas sem conservantes.',
            8.50,
            18.00,
            50,
            'https://via.placeholder.com/200?text=Geleia+Morango'
        ),
        (
            'PROD-002',
            'Doce de Leite Caseiro 500g',
            'Doce de leite tradicional em pingo, receita familiar.',
            10.00,
            22.00,
            40,
            'https://via.placeholder.com/200?text=Doce+de+Leite'
        ),
        (
            'PROD-003',
            'Liqueur de Jabuticaba 500ml',
            'Licor artesanal envelhecido naturalmente.',
            15.00,
            35.00,
            30,
            'https://via.placeholder.com/200?text=Licor+Jabuticaba'
        )
    ]

    cursor.executemany('''
        INSERT OR IGNORE INTO produtos (codigo, nome, descricao, custo, valor_venda, estoque, imagem_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', produtos)

    conn.commit()
    conn.close()
    print("Banco populado com os 3 produtos oficiais com sucesso!")

if __name__ == '__main__':
    popular_banco()