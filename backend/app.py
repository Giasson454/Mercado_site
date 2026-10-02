from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Lista de produtos atualizada
produtos = [
    {
        "id": "1",
        "codigo": "1",
        "nome": "Arroz 5kg",
        "preco": 25.90,
        "quantidade": 15,
        "descricao": "Arroz tipo 1",
        "imagem": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop"
    },
    {
        "id": "2",
        "codigo": "2",
        "nome": "Feijão Preto 1kg",
        "preco": 8.50,
        "quantidade": 12,
        "descricao": "Feijão preto de alta qualidade",
        "imagem": "https://anba.com.br/wp-content/uploads/2025/11/feijao-preto-foto-Foto-por-CHASSENET-BSIP-VIA-AFP-scaled.jpg"
    },
    {
        "id": "3",
        "codigo": "3",
        "nome": "Macarrão Espaguete 500g",
        "preco": 4.20,
        "quantidade": 25,
        "descricao": "Massa de sêmola com ovos",
        "imagem": "https://tse2.mm.bing.net/th/id/OIP.1xJtLnlfEjWVSTUONLq4VAHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        "id": "4",
        "codigo": "4",
        "nome": "Açúcar Refinado 1kg",
        "preco": 5.10,
        "quantidade": 30,
        "descricao": "Açúcar refinado especial",
        "imagem": "https://viagem.cnnbrasil.com.br/wp-content/uploads/sites/5/2024/07/Acucar-branco-refinado-Pexels.jpg?w=1200&h=1200&crop=1"
    },
    {
        "id": "5",
        "codigo": "5",
        "nome": "Óleo de Soja 900ml",
        "preco": 7.80,
        "quantidade": 18,
        "descricao": "Óleo vegetal de soja purificado",
        "imagem": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop"
    },
    {
        "id": "6",
        "codigo": "6",
        "nome": "Café Torrado e Moído 500g",
        "preco": 16.90,
        "quantidade": 20,
        "descricao": "Café tradicional extra forte",
        "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSEsTV_Fk262OOsCTrKTIh1uvmJ3McDeLFswyaLKU4QAYs468x3iVAtZ5t&s=10"
    }
]

movimentacoes = []

@app.route('/api/produtos', methods=['GET'])
def get_produtos():
    return jsonify(produtos), 200

@app.route('/api/produtos', methods=['POST'])
def add_produto():
    data = request.json or {}
    novo_id = str(len(produtos) + 1 if produtos else 1)
    
    codigo = str(data.get("codigo") or novo_id).strip()
    novo_produto = {
        "id": novo_id,
        "codigo": codigo,
        "nome": data.get("nome", "Novo Produto"),
        "preco": float(data.get("preco", 0)),
        "quantidade": int(data.get("quantidade", 0)),
        "descricao": data.get("descricao", ""),
        "imagem": data.get("imagem") or "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop"
    }
    produtos.append(novo_produto)
    return jsonify({"mensagem": "Produto cadastrado com sucesso!", "produto": novo_produto}), 201

@app.route('/api/produtos/<id>', methods=['DELETE'])
def remover_produto(id):
    global produtos
    prod_id = str(id).strip()
    produtos = [p for p in produtos if str(p.get("id")) != prod_id and str(p.get("codigo")) != prod_id]
    return jsonify({"mensagem": "Produto removido com sucesso!"}), 200

@app.route('/api/movimentacoes', methods=['POST'])
def registrar_movimentacao():
    data = request.json or {}
    prod_id = str(data.get("produto_id") or data.get("codigo") or "").strip()
    qtd = int(data.get("quantidade", 1))
    tipo = str(data.get("tipo", "SAIDA")).upper()

    produto = next((p for p in produtos if str(p.get("id")) == prod_id or str(p.get("codigo")) == prod_id), None)

    if not produto:
        return jsonify({"mensagem": "Produto não encontrado!"}), 404

    if tipo == "SAIDA" and produto["quantidade"] < qtd:
        return jsonify({"mensagem": f"Estoque insuficiente! Disponível: {produto['quantidade']}"}), 400

    if tipo == "SAIDA":
        produto["quantidade"] -= qtd
    else:
        produto["quantidade"] += qtd

    valor_total = float(produto["preco"]) * qtd
    nova_mov = {
        "produto_id": produto["id"],
        "produto_nome": produto["nome"],
        "codigo": produto["codigo"],
        "tipo": tipo,
        "quantidade": qtd,
        "valor_total": valor_total,
        "cliente": data.get("cliente", "Cliente"),
        "data": datetime.now().isoformat()
    }
    movimentacoes.append(nova_mov)
    return jsonify({"mensagem": "Venda realizada com sucesso!", "movimentacao": nova_mov, "estoque_atual": produto["quantidade"]}), 200

@app.route('/api/relatorios/movimentacoes', methods=['GET'])
def get_movimentacoes():
    return jsonify(movimentacoes), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)