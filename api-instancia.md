# Instância EC2 para a API

1. EC2 > instâncias > Launch Instance.
2. configurar a Instâcia:
- Escolha Amazon Linux 2 ou Ubuntu 22.04 LTS
- Tipo da instância: exemplo t2.micro
- Configure as regras de segurança (Security Groups):
  - HTTP: Porta 80.
  - HTTPS: Porta 443.
  - SSH: Porta 22 (seu IP).

3. Conectar via SSH

Inicie o agente SSH:

```bash
eval "$(ssh-agent)"
```
Adicione a chave ao agente:
```bash
ssh-add ~/.ssh/sua_chave.pem
```

```bash
ssh -i "sua_chave.pem" ec2-user@seu-ip-publico
```

4. Instalar Dependências:

```bash
sudo apt update -y 
```
Instalar Git
```bash
sudo apt install -y git
```

```bash
sudo apt install -y postgresql postgresql-contrib
```

```bash
sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash 
```

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  
```

```bash
nvm install --lts
```

```bash
sudo npm i -g @nestjs/cli
sudo npm install pm2 -g 
```


```bash
sudo apt install -y nginx
```

5. Configurar Nginx:


Verificar novamente as regras do Security Group (AWS)
   Type: HTTP
   Port: 80
   Source: 0.0.0.0/0

inicie o Nginx com:

```bash
sudo systemctl start nginx

```
Habilitar o Nginx para iniciar no boot:

```bash
sudo systemctl enable nginx
```

- Passo 2: Configurar o Nginx para Proxy Reverso

Abra ou crie o arquivo de configuração:

```bash
sudo nano /etc/nginx/conf.d/nestjs.conf
```

```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

Verificar a configuração do Nginx:
```bash
sudo nginx -t
```

Recarregar o Nginx:
```bash

sudo systemctl reload nginx

```

Execute o comando novamente para confirmar:

```bash
sudo lsof -i -P -n | grep LISTEN | grep nginx

```

Passo 6: Usar PM2 ou Systemd para Gerenciar sua Aplicação Node.js

```bash
pm2 start dist/main.js --name nestjs-app 
pm2 startup 
pm2 save 
```