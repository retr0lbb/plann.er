# Planner
Planner é um gerenciador de viagens simples e fácil de usar, desenvolvido para ajudar qualquer pessoa a planejar suas viagens de forma eficiente e organizada. Sabe aquelas viagens sem planejamento onde algumas pessoas confirmam presença, mas não aparecem? O Planner está aqui para resolver isso.

## Funcionalidades Principais
- Criação de Viagens: Organize todas as suas viagens em um único lugar, com detalhes e datas bem definidas.
- Atividades Planejadas: Adicione atividades e eventos para cada dia da viagem, garantindo que todos saibam o que fazer.
- Links Importantes: Armazene links essenciais como códigos de reserva do Airbnb ou contratos de aluguel de carros, acessíveis para todos os participantes.
- Evita Confusões: Elimine a necessidade de criar inúmeros grupos de chat para cada viagem. Tudo que você precisa está no Planner.

## Objetivo
O Planner foi criado para fornecer uma ferramenta prática e intuitiva que facilita a organização de viagens, garantindo que todos os participantes estejam informados e preparados. Diga adeus aos grupos de viagem antigos e confusos, como o "viagem praia 2015". Utilize essa incrível ferramenta para planejar suas próximas aventuras de forma simples e eficiente.


## Súmario
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como contribuir](#contribuição)
- [Tecnologias](#tecnologias-usadas-no-projeto)
- [Agradecimentos](#agradecimentos)


## Estrutura do projeto
esse projeto é um projeto do tipo **monorepo** ou seja ha apenas 1 repositorio para varios projetos, nesse caso apenas 2, um para o cliente ou seja o site em si e um para o servidor que lida com todo o esquema de banco de dados entre outras coisaas

```bash
/planner
|--apps/
|   --client/
|   --server/
|--README.md
|--.gitignore
|--turbo.json
|--etc
```
## Instalação
caso queira instalar o projeto para ver por si mesmo ou apenas testar localmente a aplicação esses são os passos que você deve seguir para conseguir instalar corretamente o projeto

#### Requisitos:
- [node 20.x](https://nodejs.org/pt)

1. clone esse repositorio localmente.
```bash
git clone https://github.com/retr0lbb/plann.er.git
```
2. instale o tuborepo para gerenciar as dependencias.
```bash
npm install turbo
```
> !nota do desenvolvedor: é recomendavel instalar o turborepo globalmente na sua maquina assim como o typescript

3. instale as dependencias dos aplicativos.
```bash
npm install -ws 
```
4. ultilize o turborepo para rodar as duas aplicações simultaneamente.
```bash
npx turbo dev
```

5. (opicional) faça o build do projeto.
```bash
npx turbo build
```

> !nota do desenvolvedor: algumas dependencias podem estar desconexas ou faltando nos package.json dos projetos individualmente caso > encontra alguma crie um issue nesse repositorio para que eu possa arrumar ou veja a parte [Como contribuir](#como-contribuir) para ajudar no projeto


## Como contribuir
Se você deseja contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (git checkout -b feature/nome-da-feature).
3. Faça commit das suas alterações (git commit -am 'Adiciona nova feature').
4. Faça push para a branch (git push origin feature/nome-da-feature).
5. Abra um Pull Request.

nesse projeto eu adoto os padrões de commit classicos como por exemplo "feat: add button" porém eu gosto de adicionar o escopo que eu estou trabalhando junto do commit assim por exempo "feat(server): add client routing" mas essa regra não é impirica.


## Tecnologias usadas no projeto
### cliente: 
- [framer-motion](https://www.framer.com/motion/)
- [lucide-react](https://lucide.dev/icons/)
- [nextui.org](https://nextui.org)
- [talwind-css](https://tailwindcss.com)
- [vite-react](https://vitejs.dev)
- [react-router-dom](https://reactrouter.com/en/main)
- [axios](https://axios-http.com/ptbr/docs/intro)

## Servidor:
- [fastify](https://fastify.dev)
- [prisma](https://www.prisma.io)
- [zod](https://zod.dev)
- [nodemailer](https://nodemailer.com)

## Usadas por ambos:
- [typescript](https://www.typescriptlang.org)
- [dayjs](https://day.js.org)


## Agradecimentos
obrigado ao NLW da rocketseat por nos estregar o design do projeto, eu aprendi muitas coisas novas com esse ultimo NLW e mal posso esperar para colocalas em pratica em novos projetos, nesse mesmo projeto por exemplo eu testei o conceito de *monorepo* que foi uma experiencia verdadeiramente desafiadora para mim, quase sempre eu enfrentava novos problemas que eu nunca tive antes, mas olhando em retrospecto e vendo os desafios que eu consegui superar e o aprendizado que eu ganhei depois de cada um deles me deixa inspirado para sempre continuar programando e indo em busca de novos desafios, muito obrigado rocketseat <3
