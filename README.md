# Guia Interativo de Diagnóstico de Rede Doméstica

Este projeto é uma ferramenta interativa que ajuda os usuários a diagnosticar e resolver problemas comuns de rede doméstica através de um sistema de perguntas e respostas guiadas.

## Características

- Interface intuitiva e responsiva
- Diagnóstico passo a passo para problemas comuns de rede
- Explicações detalhadas de conceitos e ferramentas de rede
- Suporte para modo offline (PWA)
- Design otimizado para dispositivos móveis e desktop

## Tecnologias Utilizadas

- HTML5
- CSS3 com Tailwind CSS
- JavaScript (Vanilla)
- Service Worker para funcionalidade offline

## Estrutura do Projeto

```
/
├── index.html              # Página principal
├── manifest.json           # Configuração PWA
├── service-worker.js       # Service Worker para funcionalidade offline
├── css/
│   ├── styles.css          # Estilos principais
│   └── animations.css      # Animações específicas
├── js/
│   ├── main.js             # Lógica principal da aplicação
│   └── diagnostic-data.js  # Dados da árvore de diagnóstico
└── images/                 # Ícones e imagens
```

## Deployment

Este projeto está configurado para ser hospedado no GitHub Pages. Para fazer o deploy:

1. Faça fork ou clone este repositório
2. Habilite o GitHub Pages nas configurações do repositório, apontando para a branch principal
3. O site estará disponível em `https://[seu-usuario].github.io/[nome-do-repositorio]/`

## Desenvolvimento Local

Para executar este projeto localmente:

1. Clone o repositório
2. Abra o arquivo `index.html` em um navegador web ou use um servidor local (recomendado)

Caso queira utilizar um servidor local:
```bash
# Usando Python
python -m http.server 8000

# Ou instale o pacote serve via npm
npm install -g serve
serve
```

## Personalização

Para personalizar este guia:

1. Modifique o arquivo `js/diagnostic-data.js` para alterar o fluxo de diagnóstico
2. Ajuste os estilos em `css/styles.css` conforme necessário
3. Adicione novas seções ou recursos conforme a necessidade

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.