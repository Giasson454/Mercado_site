import sqlite3

def inicializar_banco():
    conn = sqlite3.connect('database.db')
    
    with open('schema.sql', 'r', encoding='utf-8') as f:
        schema = f.read()
    
    conn.executescript(schema)
    conn.commit()
    conn.close()
    print("Banco de dados 'database.db' inicializado conforme a documentacao!")

if __name__ == '__main__':
    inicializar_banco()