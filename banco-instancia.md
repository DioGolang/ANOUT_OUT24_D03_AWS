# Criação da Instância EC2 para Banco de Dados

1. Repita os passos de criação da instância. (arquivo: api-instancia.md)  5432

2. Instalar PostgreSQL:

```bash
sudo apt update && \
sudo apt install -y git
```

```bash
sudo apt install -y postgresql postgresql-contrib 
```

Iniciar o PostgreSQL: Após a instalação, inicie o serviço PostgreSQL:

```bash
sudo systemctl start postgresql
```

Habilitar o PostgreSQL para iniciar no boot: Para garantir que o PostgreSQL seja iniciado automaticamente após a reinicialização, execute:

```bash
sudo systemctl enable postgresql

```

serviço está ativo:
```bash
sudo systemctl status postgresql
sudo systemctl status 'postgresql*'
```



3. Configurar Acesso Remoto:

Edite pg_hba.conf e postgresql.conf para permitir conexões externas.

Editar o arquivo postgresql.conf: O PostgreSQL escuta na interface local (127.0.0.1) por padrão. Para permitir conexões externas, é necessário editar o arquivo de configuração.

```bash

sudo nano /etc/postgresql/16/main/postgresql.conf

```

Encontre a linha que define o parâmetro listen_addresses e altere para aceitar conexões de qualquer IP, ou apenas de um IP específico:

```bash
listen_addresses = '*'
```

Editar o arquivo pg_hba.conf: O arquivo pg_hba.conf controla quais IPs podem se conectar ao banco de dados. Ele está localizado no mesmo diretório de dados (/var/lib/pgsql/data/pg_hba.conf).

Abra o arquivo para edição:

```bash
sudo nano /etc/postgresql/16/main/pg_hba.conf

```
Adicione a seguinte linha ao final do arquivo para permitir conexões de qualquer IP na rede (substitua 0.0.0.0/0 por um intervalo de IPs mais seguro, se necessário):

```bash

host    all             all             0.0.0.0/0            md5


```
- host: Tipo de conexão (TCP/IP).
- all: Permite conexões para qualquer banco de dados.
- all: Permite qualquer usuário.
0.0.0.0/0: Permite conexões de qualquer IP.
- md5: Exige autenticação usando senha criptografada.

Reiniciar o PostgreSQL: Após alterar os arquivos de configuração, reinicie o PostgreSQL para aplicar as alterações:

```bash
sudo systemctl restart postgresql
```

4. Acesso o PostgreSQL
```bash
sudo -i -u postgres
psql
```

Criar o Banco de dados
```bash
CREATE DATABASE api_db;
```
Criar o Usuário:
```bash
CREATE USER api_user WITH ENCRYPTED PASSWORD 'sua_senha_segura';
```

Conceder Permissões ao Usuário:
```bash
GRANT ALL PRIVILEGES ON DATABASE api_db TO api_user;

```

Permitir que o Usuário Crie Tabelas:

```bash
ALTER DATABASE api_db OWNER TO api_user;

```
5. Testar Conexão Local no Servidor do Banco

```bash
psql -h localhost -U api_user -d api_db
```

6. Testar Conexão Remota da Instância Node.js

```bash
psql -h ip-privado-db -p 5432 -U api_user -d api_db

```