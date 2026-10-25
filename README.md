# North Star

Site de planejamento de intercâmbio desenvolvido por **Júlia Zanini Stein e Sofia França Cavalheiro**, da turma **62.2**.

O projeto reúne destinos, modalidades de intercâmbio, dicas, custos, documentos, agenda e cronograma em uma interface feita com HTML, CSS e JavaScript.

## Como executar

1. Baixe o projeto em **Code > Download ZIP** e extraia o arquivo, ou clone o repositório.
2. Mantenha os arquivos HTML, `style.css`, `images.css`, a pasta `js` e a pasta `assets` juntos na pasta principal.
3. Abra essa pasta no VS Code e execute `index.html` com a extensão **Live Server**.
4. Acesse as outras páginas pelos botões e menus do site.

Outra opção, caso tenha Python instalado, é abrir o terminal na pasta do projeto e executar:

```bash
python -m http.server 8000
```

Depois, abra [http://localhost:8000](http://localhost:8000) no navegador. O servidor deve usar a pasta que contém `index.html`.

Use o mesmo endereço e navegador durante os testes: os dados são guardados no `localStorage` desse endereço. Ao abrir os HTML diretamente pelo gerenciador de arquivos, o compartilhamento do armazenamento entre páginas pode variar conforme o navegador.

## Funcionalidades

- Cadastro e login demonstrativos.
- Pesquisa de destinos e lista de favoritos.
- Seleção de país no catálogo e envio da escolha ao cronograma.
- Cronograma com destino, modalidade, duração e etapas concluídas.
- Agenda com criação, edição, conclusão e exclusão de tarefas.
- Checklist e cadastro de documentos.
- Consulta de custos e registro de orçamento.
- Perfil com edição de nome, e-mail, telefone e foto.
- Prévia, troca e remoção da foto de perfil, com validação de PNG, JPG ou WebP de até 500 KB.
- Chat demonstrativo com histórico separado por e-mail no mesmo navegador.
- Notificações, preferências e registro local de dúvidas no suporte.
- Layout com adaptações para telas menores e recursos de navegação por teclado.

## Correções desta atualização

- **Destino do cronograma:** o botão “Planejar intercâmbio” envia o país selecionado. A escolha permanece após atualizar a página.
- **Perfil:** acrescentadas a prévia e a remoção da foto, além da verificação de leitura da imagem antes de salvar.
- **Chat:** cada e-mail passa a ter seu próprio histórico local. A tela acompanha a mudança de conta entre abas, e falhas ao salvar não apagam a mensagem digitada.
- **Bandeiras:** os emojis foram substituídos por seis imagens PNG locais, com textos alternativos.
- **Dicas:** ajustado o dimensionamento das ilustrações nos cartões e na leitura dos artigos.

## Dados e limites da demonstração

O site funciona no navegador, sem servidor de autenticação ou banco de dados remoto. O login não verifica a senha contra uma conta cadastrada. As mensagens do chat não são enviadas a outras pessoas ou dispositivos.

A separação por e-mail foi acrescentada ao histórico do chat. Os demais dados, como agenda, documentos e planejamento, continuam no armazenamento local compartilhado da aplicação.

As mensagens do formato anterior são mantidas no armazenamento original, mas não são atribuídas automaticamente a um e-mail nem aparecem no novo histórico. O formato antigo não permite identificar com segurança a conta responsável por cada mensagem.

Limpar os dados do navegador remove os registros locais. Usar outro endereço ou navegador cria um armazenamento separado.

## Critérios de avaliação

| Critério | Recursos presentes no projeto |
| --- | --- |
| Deploy e funcionamento — 2,0 pontos | Entrada por `index.html`, arquivos separados e referências locais. A URL publicada precisa ser conferida após o envio. |
| Interatividade sem recarregamento — 2,0 pontos | Formulários com `preventDefault()` e atualização da interface nas ações de cadastro, edição e exclusão. |
| Persistência de dados — 2,0 pontos | Uso de `localStorage` para recuperar as informações ao retornar às páginas. |
| Estabilidade do console — 2,0 pontos | Validações de formulários e tratamento de falhas de armazenamento. O console deve ser acompanhado nos testes no navegador. |
| Adaptabilidade, responsividade e acessibilidade — 2,0 pontos | Meta viewport, media queries, HTML semântico, foco visível, textos alternativos e atributos ARIA. |

## Conferência antes da entrega

1. Escolha um país diferente do Canadá, clique em “Planejar intercâmbio” e confirme o destino após atualizar a página.
2. No perfil, teste adicionar, trocar, cancelar a edição e remover uma foto. Confira se a alteração salva permanece após atualizar a página.
3. No chat, envie uma mensagem usando um e-mail, mude o e-mail e confira os históricos ao alternar entre eles.
4. Crie, edite e exclua uma tarefa e um documento; confira a persistência após atualizar a página.
5. Confira as bandeiras, as dicas e os diálogos em uma tela de computador e em uma tela de celular.
6. Abra o console do navegador e confira a URL publicada após atualizar o GitHub Pages.

## Referências das correções

As melhorias foram incorporadas a partir da versão do [repositório North-Stars de Enzo-kk09](https://github.com/Enzo-kk09/North-Stars/tree/e7962f5794e568e992d7c27811628a9e75660d3b).

A origem e os créditos das bandeiras estão em [assets/flags/README.md](assets/flags/README.md).
