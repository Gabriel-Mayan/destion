# Destion Frontend

O **Destion** é uma aplicação web desenvolvida em **Next.js** que permite comunicação em tempo real entre usuários através de chats e gerenciamento de mensagens. A aplicação inclui funcionalidades de autenticação, registro, recuperação de senha e edição de perfil, além de integração com o backend para persistência de dados e envio de notificações.

O frontend é modular e escalável, utilizando componentes reutilizáveis, contextos React para gerenciamento de estado e **Socket.IO** para comunicação em tempo real. Ele pode ser executado de forma independente, mas para que todas as funcionalidades funcionem corretamente, deve ser conectado ao backend da API.

## Estrutura do Projeto

- **src/app/api**: Rotas da API para autenticação, chat, mensagens e usuários. Implementa endpoints usando **Next.js API Routes**.  
- **src/app/home**: Páginas principais da aplicação, incluindo chat, configurações e perfil do usuário.  
- **src/app/login, register, recovery**: Páginas de autenticação, registro e recuperação de senha.  
- **src/components**: Componentes reutilizáveis da aplicação:  
  - **Bases**: Botões, inputs, layouts e elementos de UI básicos.  
  - **Chat e ChatRoom**: Componentes para visualização e envio de mensagens, gerenciamento de salas de chat.  
  - **Forms**: Formulários de autenticação, criação/edição de usuários e chats.  
  - **Modal e Sections**: Modais e seções visuais da página, como hero section.  
- **src/config**: Configurações globais, incluindo socket.io e notificações.  
- **src/context**: Contextos React para sockets e tema.  
- **src/lib**: Fontes, tema, estilos globais e metadados.  
- **src/middlewares**: Middlewares para redirecionamento de autenticação e gerenciamento de sessão.  
- **src/services**: Serviços para comunicação com API, autenticação e lógica de aplicação.  
- **src/utils**: Utilitários, como notificações e helpers.  
- **public/assets**: Imagens e logos usadas na aplicação.

## Tecnologias Utilizadas

- **Next.js** (framework React)  
- **React** (biblioteca para interface)  
- **TypeScript**  
- **Socket.IO Client**  
- **Tailwind CSS / CSS-in-JS**  
- **NextAuth.js** (autenticação)  
- **React Context / Hooks** (gerenciamento de estado)  

## Configuração do Ambiente

O projeto utiliza variáveis de ambiente definidas em `.env.local`. Um exemplo está disponível em `.env.local.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_SOCKET_URL=http://localhost:8080
NEXTAUTH_URL=http://localhost:3000
```

> Ajuste as variáveis conforme o ambiente e a porta do backend.

## Instalação e Execução

```bash
# Instalar dependências
npm install
# ou
yarn install

# Rodar em desenvolvimento
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Build para Produção

```bash
# Build da aplicação
npm run build
# ou
yarn build

# Rodar em produção
npm run start
# ou
yarn start
```

## Observações

- Pode ser executado de forma independente, mas para autenticação, chat e outras funcionalidades é necessário que o backend esteja ativo.  
- Usa **Socket.IO** para comunicação em tempo real com o backend.  
- Componentes e layouts são modulares e reutilizáveis para facilitar manutenção e escalabilidade.

