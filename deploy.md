# Deploy 

1. Clonar o Repositório na EC2:
- No script de automação, após acessar a instância EC2 via SSH, você deve clonar o repositório do seu projeto a partir do GitHub

2. Instalar o Node.js:

- Antes de clonar o repositório, é necessário garantir que o Node.js esteja instalado na instância EC2. Caso não tenha o Node.js instalado, o script deve instalá-lo.

3. Instalar as Dependências da API:

- Após clonar o repositório, entre no diretório do projeto e execute npm install ou yarn install para instalar todas as dependências necessárias.

4. Configuração de Variáveis de Ambiente:

- O script também deve garantir que as variáveis de ambiente necessárias para a aplicação (como as variáveis de banco de dados, JWT, etc.) estejam corretamente configuradas.

5. Iniciar a API:

Finalmente, o script pode iniciar a aplicação NestJS. Normalmente, a aplicação seria iniciada com o comando npm run start:prod

# Passos para Configurar o Deploy Automático usando GitHub Actions:

1. Configuração Inicial do GitHub Actions:
   Primeiro, você precisa criar um arquivo de workflow no seu repositório do GitHub para definir as etapas que o GitHub Actions deve executar durante o processo de deploy.

1. Criar a Pasta de Workflow: No seu repositório, crie a pasta .github/workflows se ela ainda não existir. Dentro dela, crie um arquivo de workflow, por exemplo: deploy.yml.

O caminho completo seria: .github/workflows/deploy.yml.

2. Configuração do Arquivo de Workflow: O arquivo de workflow define os passos para automatizar o processo de deploy. Aqui está um exemplo básico para rodar o deploy em uma instância EC2:

```yaml

name: Deploy to EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Check out the code
        uses: actions/checkout@v2

      - name: Set up SSH key
        uses: webfactory/ssh-agent@v0.5.3
        with:
          ssh-private-key: ${{ secrets.EC2_SSH_PRIVATE_KEY }}

      - name: Ensure NVM and Node.js are loaded
        run: |
          ssh -o StrictHostKeyChecking=no ubuntu@${{ secrets.EC2_IP }} << 'EOF'
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" || exit
            node --version || exit
            npm --version || exit
          EOF

      - name: Deploy to EC2
        run: |
          ssh -o StrictHostKeyChecking=no ubuntu@${{ secrets.EC2_IP }} << 'EOF'
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" || exit
          
            cd /home/ubuntu/ANOUT_OUT24_D03_AWS || exit
            git pull origin main || exit
            npm install || exit
            npm run build || exit
            pm2 restart api-nestjs || pm2 start dist/main.js --name "api-nestjs"
          EOF
```
2. Explicação do Workflow:
   on.push.branches: Este trigger faz com que o deploy seja iniciado sempre que um commit é feito na branch main (ou qualquer outra branch que você utilizar).

actions/checkout@v2: Faz o checkout do código mais recente do repositório.

webfactory/ssh-agent@v0.5.3: Usa o SSH para acessar a instância EC2. O segredo EC2_SSH_PRIVATE_KEY será armazenado nas configurações de segredos do repositório do GitHub, permitindo que a chave SSH privada seja utilizada para se autenticar.

Conectar à EC2 via SSH e executar o deploy:

A variável EC2_IP é o endereço IP público da sua instância EC2, que também deve ser configurada como segredo no GitHub.
O script SSH dentro do comando ssh atualiza o repositório (git pull), instala as dependências (npm install), compila o projeto (npm run build), e reinicia a aplicação usando o pm2.
3. Adicionar Segredos no GitHub:
   Agora você precisa adicionar informações sensíveis (como a chave SSH privada e o IP da EC2) como segredos no GitHub para garantir que os dados não sejam expostos:

Acesse seu repositório no GitHub.
Vá para Settings > Secrets > New repository secret.
Adicione os seguintes segredos:
EC2_SSH_PRIVATE_KEY: Adicione a chave privada SSH gerada anteriormente para acessar a instância EC2.
EC2_IP: O IP público da sua instância EC2.
4. Passos Adicionais:
   Instalar Dependências: Certifique-se de que sua instância EC2 tenha o Node.js, npm, pm2 e outras dependências necessárias instaladas.

Configuração do PM2: A linha pm2 restart api-nestjs || pm2 start dist/main.js --name "api-nestjs" no script do deploy tenta reiniciar a aplicação se ela já estiver sendo gerida pelo pm2. Caso contrário, ele inicia a aplicação pela primeira vez. O pm2 garantirá que sua API esteja sempre em execução, mesmo após reinicializações da instância.

5. Verificando o Pipeline:
   Depois de configurar o arquivo de workflow no repositório e adicionar os segredos, você pode fazer um push para a branch main (ou a branch que você configurou para o deploy), e o GitHub Actions automaticamente rodará o workflow e fará o deploy na sua instância EC2.