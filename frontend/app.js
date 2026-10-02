const API_BASE_URL = 'http://127.0.0.1:5000/api';

// Garante sessão Admin para acesso a todas as funções
if (!localStorage.getItem('usuarioLogado')) {
    localStorage.setItem('usuarioLogado', JSON.stringify({ nome: 'bernardo thomas', perfil: 'admin' }));
}

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);
}

document.addEventListener('DOMContentLoaded', async () => {
    initSessaoEHeader();

    if (document.getElementById('produtos-container')) {
        await renderizarProdutos();
        initCheckout();
        initCadastroProduto();
    }
});

async function getProdutos() {
    try {
        const res = await fetch(`${API_BASE_URL}/produtos`);
        if (!res.ok) throw new Error('Erro ao carregar produtos');
        return await res.json();
    } catch (error) {
        console.error('Erro na API /produtos:', error);
        return [];
    }
}

function getUsuarioLogado() {
    return JSON.parse(localStorage.getItem('usuarioLogado')) || { nome: 'Admin', perfil: 'admin' };
}

function initSessaoEHeader() {
    const usuario = getUsuarioLogado();
    const displayUser = document.getElementById('user-info-display');
    if (displayUser) displayUser.textContent = `Olá, ${usuario.nome} (${usuario.perfil === 'admin' ? 'Admin' : 'Cliente'})`;

    const seccaoCadastro = document.getElementById('cadastro-produto-section');
    if (seccaoCadastro) {
        seccaoCadastro.style.display = 'block'; // Sempre visível para testes de Admin
    }
}

async function renderizarProdutos() {
    const container = document.getElementById('produtos-container');
    const select = document.getElementById('select-produto');
    if (!container) return;

    const produtos = await getProdutos();

    container.innerHTML = '';
    if (select) select.innerHTML = '<option value="" disabled selected>-- Selecione um produto --</option>';

    produtos.forEach(p => {
        const preco = parseFloat(p.preco || 0);
        const precoFormat = preco.toFixed(2).split('.');
        const quantidadeEstoque = p.quantidade !== undefined ? p.quantidade : 0;
        const idOuCodigo = String(p.codigo || p.id);
        const descricao = p.descricao || 'Sem descrição.';
        const imagem = p.imagem || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop';

        const article = document.createElement('article');
        article.className = 'produto-card';
        article.style.border = '1px solid #ddd';
        article.style.borderRadius = '8px';
        article.style.padding = '15px';
        article.style.marginBottom = '20px';
        article.style.textAlign = 'center';

        article.innerHTML = `
            <div class="img-container">
                <img src="${imagem}" alt="${p.nome}" style="width:100%; max-height:200px; object-fit:cover; border-radius:8px;">
            </div>
            <p><strong>Cód: ${idOuCodigo}</strong></p>
            <h3>${p.nome}</h3>
            <p>${descricao}</p>
            <p style="font-size: 1.2rem; font-weight: bold; color: #2e7d32;">R$ ${precoFormat[0]},${precoFormat[1]}</p>
            <p>Estoque disponível: <strong id="estoque-val-${idOuCodigo}">${quantidadeEstoque}</strong> un.</p>
            <button onclick="removerProduto('${idOuCodigo}')" style="background-color: #d32f2f; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; margin-top: 8px;">
                🗑️ Excluir Produto
            </button>
        `;
        container.appendChild(article);

        if (select && quantidadeEstoque > 0) {
            const opt = document.createElement('option');
            opt.value = idOuCodigo;
            opt.textContent = `${p.nome} (Estoque: ${quantidadeEstoque}) - R$ ${precoFormat[0]},${precoFormat[1]}`;
            select.appendChild(opt);
        }
    });
}

async function removerProduto(id) {
    if (!confirm('Deseja realmente remover este produto?')) return;

    try {
        const res = await fetch(`${API_BASE_URL}/produtos/${id}`, { method: 'DELETE' });
        const data = await res.json();
        alert(data.mensagem || 'Produto removido!');
        await renderizarProdutos();
    } catch (err) {
        alert('Erro ao remover produto.');
    }
}

function initCheckout() {
    const formPedido = document.getElementById('form-pedido');
    if (!formPedido) return;

    formPedido.addEventListener('submit', async (e) => {
        e.preventDefault();

        const select = document.getElementById('select-produto');
        const produtoId = select ? select.value : '';
        const qtdInput = document.getElementById('quantidade');
        const qtd = qtdInput ? parseInt(qtdInput.value) : 1;

        if (!produtoId) {
            alert('Por favor, selecione um produto.');
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/movimentacoes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    produto_id: String(produtoId),
                    codigo: String(produtoId),
                    tipo: 'SAIDA',
                    quantidade: qtd,
                    cliente: 'bernardo thomas'
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.mensagem || 'Erro ao realizar venda.');
                return;
            }

            alert(`Venda realizada com sucesso! Novo estoque: ${data.estoque_atual}`);
            await renderizarProdutos();
            formPedido.reset();
        } catch (err) {
            alert('Erro ao comunicar com o servidor.');
        }
    });
}

function initCadastroProduto() {
    const formCad = document.getElementById('form-cadastro-produto');
    if (!formCad) return;

    formCad.addEventListener('submit', async (e) => {
        e.preventDefault();

        const produto = {
            nome: document.getElementById('cad-nome')?.value.trim(),
            codigo: document.getElementById('cad-codigo')?.value.trim() || '',
            preco: parseFloat(document.getElementById('cad-preco')?.value || 0),
            quantidade: parseInt(document.getElementById('cad-estoque')?.value || 0),
            descricao: document.getElementById('cad-descricao')?.value.trim() || '',
            imagem: document.getElementById('cad-imagem')?.value.trim() || ''
        };

        try {
            const res = await fetch(`${API_BASE_URL}/produtos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produto)
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.mensagem || 'Erro ao cadastrar produto.');
                return;
            }

            alert(`Produto "${produto.nome}" cadastrado com sucesso!`);
            await renderizarProdutos();
            formCad.reset();
        } catch (err) {
            alert('Erro ao conectar ao servidor.');
        }
    });
}