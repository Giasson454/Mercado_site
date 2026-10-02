# 🛒 Mercado_site - Sistema de Gestão de Estoque e Vendas

> **Projeto Prático Académico Full-Stack (MVP)**  
> Desenvolvido para a transição digital de uma empresa familiar de 03 produtos.

---

## 📌 Visão Geral do Projeto

Este sistema foi projetado para substituir o controlo analógico (em papel) de uma empresa familiar por uma solução Web integrada e funcional. O ecossistema contempla uma vitrine digital para clientes, um motor de pedidos de compra com atualização automática do saldo em estoque e um painel de inteligência de vendas com relatórios temporais e gráficos comparativos.

---

## 🚀 Funcionalidades Principais

* **Cadastro dos 03 Produtos:** Gestão dos dados cruciais (Código ID, Nome, Descrição, Custo, Preço de Venda, Estoque Disponível e Imagem).
* **Vitrine Digital (Catálogo):** Interface atraente e responsiva para apresentação visual dos produtos e preços.
* **Formulário de Pedido (Checkout):** Processamento dinâmico de compras.
* **Baixa Automática em Estoque:** Subtração imediata da quantidade comprada do saldo de estoque no banco de dados.
* **Relatórios Temporais:** Filtragem de vendas por intervalo de datas (visão Diária, Semanal e Mensal).
* **Gráfico Comparativo:** Visualização em barras do desempenho de vendas dos 03 produtos lado a lado.
* **Persistência de Dados (Bónus):** Armazenamento relacional utilizando **SQLite**.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (Puro)
* **Backend:** Node.js / Python
* **Banco de Dados:** SQLite3
* **Versionamento & Controlo de Ações:** Git e GitHub

---

## 👥 Equipa e Distribuição de Papéis (Squad)

| Integrante | Papel no Projeto | Turma | Responsabilidades |
| :--- | :--- | :--- | :--- |
| **João Giasson** | Gerente de Projeto | Turma 1 | Planeamento, controlo de cronograma, acompanhamento de commits e coordenação da apresentação. |
| **Thomaz Alves Falkenbach** | Analista de Sistemas | Turma 2 | Modelação de requisitos (RF, RNF, RN), documentação formal e validação de testes. |
| **Eduardo Crestani** | Programador 1 (Frontend) | Turma 2 | Desenvolvimento do catálogo visual, formulário de compra e renderização dos gráficos. |
| **Bernardo Teixeira** | Programador 2 (Backend / DB) | Turma 2 | Criação de APIs, lógica de baixa em estoque, filtros por data e banco SQLite. |

---

## 📂 Estrutura do Repositório

```text
Mercado_site/
├── docs/                     # Documentação oficial do projeto
│   ├── requisitos.pdf        # Documentação de Requisitos (RF, RNF, RN)
│   └── plano_gestao.pdf      # Planilha de Ações e Gestão
├── frontend/                 # Páginas HTML, estilos CSS e scripts JS
├── backend/                  # Servidor, rotas e regras de negócio
├── database/                 # Script de criação e ficheiro SQLite (database.db)
└── README.md                 # Visão geral do repositório
