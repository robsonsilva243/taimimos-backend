# 🎀 TaiMimos Manager — Backend

Backend do sistema **TaiMimos Manager**, responsável por gerenciar clientes, pedidos e parcelas (contas a receber), integrado com PostgreSQL via Prisma e pronto para deploy no Render.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **Railway (Banco de Dados)**
- **Render (Deploy do Backend)**
- **CORS**
- **Dotenv**

---

## 📁 Estrutura do Projeto
backend/
│
├── index.js # Servidor principal (Express)
├── package.json # Dependências e scripts
├── prisma/
│ ├── schema.prisma # Modelo do banco de dados
│ └── migrations/ # Histórico de migrations
├── prisma.config.ts # Configuração do Prisma
└── routes/
├── clients.js # Rotas de clientes
├── orders.js # Rotas de pedidos
└── installments.js # Rotas de parcelas


---

## 🗄️ Modelo do Banco (Resumo)

### **Client (Cliente)**
- id (Int)
- nome (String)
- telefone (String?)
- email (String?)
- orders (Relação)
- installments (Relação)

### **Order (Pedido)**
- id (Int)
- clientId (Int)
- descricao (String?)
- valor (Float)
- parcelas (Int)
- dataEntrega (String?)
- status (String)

### **Installment (Parcela)**
- id (Int)
- orderId (Int)
- clientId (Int)
- numero (Int)
- totalParcelas (Int)
- valor (Float)
- vencimento (String)
- status (String)

---

## ⚙️ Variáveis de Ambiente (.env)

Crie um arquivo **.env** na raiz do backend:



DATABASE_URL="sua_url_do_railway_aqui"
PORT=3333


Exemplo de DATABASE_URL:



postgresql://usuario:senha@host:porta/nome_do_banco


---

## ▶️ Como rodar localmente

### 1) Instalar dependências


npm install


### 2) Rodar migrations (se ainda não rodou)


npx prisma migrate dev --name init


### 3) Subir o servidor


npm start


O backend rodará em:


http://localhost:3333


---

## 🌐 Rotas da API

### **Clientes**


GET /clients
POST /clients
PUT /clients/:id
DELETE /clients/:id


### **Pedidos**


GET /orders
POST /orders
PUT /orders/:id
DELETE /orders/:id


### **Parcelas (Contas a Receber)**


GET /installments
POST /installments
PUT /installments/:id → marcar como pago
DELETE /installments/:id


---

## ☁️ Deploy no Render

### Configuração no Render:

- **Build Command:**


npm install


- **Start Command:**


npm start


- **Variável de Ambiente:**


DATABASE_URL = (sua URL do Railway)


---

## 🧠 Funcionalidades Principais

✔ Cadastro de clientes  
✔ Criação de pedidos com múltiplas parcelas  
✔ Geração automática de parcelas  
✔ Controle de status (Pendente/Pago)  
✔ Integração com Dashboard Financeiro  
✔ Alertas de parcelas vencidas  

---

## 👩‍🍳 Desenvolvido para:
**TaiMimos — Confeitaria Artesanal**

---

## 📌 Próximos Passos (Opcional)
- Autenticação (login)
- Perfis de usuário (admin/funcionário)
- Relatórios em PDF
- Exportação de dados para Excel
