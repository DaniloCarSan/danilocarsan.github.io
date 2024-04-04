---
title: Configurando um ambiente de desenvolvimento com AWS Cloud9 + AWS Code Commit + Laravel Sail
date: 2024-03-31
tags:
    - AWS
    - Code Commit
    - Cloud9
    - Git
    - Laravel
    - Laravel Sail
    - Docker
    - Tutorial
---

Olá, espero que esteja bem ! 

No post de hoje vou ensinar como configurar um ambiente de desenvolvimento utilizando o Cloud9, Code Commit e o Laravel Sail. O principal beneficio é poder acessar seu ambiente de qualquer lugar apenas necessitando de internet e um navegador. Também temos o benefício de ter um ambiente totalmente integrado com os serviços da AWS. Uma coisa que precisa entender é que isso vai funcionar para quase qualquer ambiente mas facilitara muito sua vida se seu ambiente já estiver utilizando Docker.

Vamos lá !

# Requisitos

Bem, para esse tutorial não abordarei a criação e configuração do Cloud9 + Code Commit, pois já abordei isso em um post anterior, por isso para continuar de uma olhada no post anterior

[Como configurar o Code Commit + Cloud9 na AWS](https://danilocarsan.github.io/Posts/AWS/Code-Commit/Como-configurar-o-Code-Commit-+-Cloud9-na-AWS)

Se você seguiu os passos do post anterior, você deve ter um repositório em seu Cloud9, caso tenha criado alguns arquivos do post anterior remova-os.

![Clou9](./../../../images/2024/03/31/1.png)

# Configurando Docker Compose

Quando você cria um ambiente no Cloud9 o Docker já vem instalado, entretanto o Docker Compose não, por isso você deve realizar a instalação do mesmo para que no passo de instalação do Laravel + Sail não tenhamos problema.

````
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker-compose version

````

# Configurando Composer

O Cloud9 suporta várias linguagens, o PHP já vem instalado por padrão o que nos falta aqui é o Composer. Seguindo a documentação do composer faça a instalação seguindo os passos do Linux.

Documentação: https://getcomposer.org/download/

1 - Em seu terminal execute os comandos a baixo

````
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
````
````
php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
````
````
php composer-setup.php
````
````
php -r "unlink('composer-setup.php');"
````

````
sudo mv composer.phar /usr/local/bin/composer
````

2 - Se tudo tiver dado certo, no terminal do Cloud9 rode o comando abaixo, o resultado deve ser a saida com a versão do Composer

````
composer --version
````

![Instalação composer](./../../../images/2024/03/31/2.png)

# Instalando Laravel + Sail

1 - Seguindo a documentação do Laravel, para instalar o Laravel vamos executar o seguinte comando ma raiz da pasta
**/environment/** do Cloud9, este passi demorar um pouco.

````
composer create-project laravel/laravel:^11.0 example-app
````

2 - Após seu projeto ter sido criádo mova os arquivo para a pasta de seu repositório
````
cd example-app
shopt -s dotglob && mv * ../meurepositorio
cd ..
rm -rf example-app
cd meurepositorio
````

Lembrando que se você olhar a documentação há outras formas de instalação siga a que melhor lhe serve.

3 - Na raiz do seu projeto instale o Laravel Sail

````
composer require laravel/sail --dev
```` 

4 - Escolha os serviços que deseja instalar, no meu caso só vou escolher o mysql

````
php artisan sail:install
````
![Mysql Service](./../../../images/2024/03/31/3.png)

5 - Execute o comando para seu ambiente inicar e configurar os serviços, isso pode demorar um pouco, depois de tudo estiver configurado sua aplicação estará sendo executada na porta 80, o proximos passos será expor nossa aplicação para a internet.

````
./vendor/bin/sail up
````
![Laravel executando na porta 80](./../../../images/2024/03/31/4.png)


# Acessando e expondo a aplicação para a internet

1 - Para visualizar nossa aplicação clique no botão **share** no canto superior direito

![Share clou9](./../../../images/2024/03/31/5.png)

2 - Será aberto uma janela, nessa clique no IP da instância que se localiza no campo **Application**, então clique na opção **Open**

![Janela Preview](./../../../images/2024/03/31/6.png)

3 - Antes verifique está acessando com HTTP e não com HTTPS, depois de verificado você pode ver que recebemos um erro e não conseguimos acessar a aplicação. Isso acontece porque apesar de nossa instância, onde o Cloud9 está sendo executado, possuir um IP público a porta ao qual estamos querendo acessar no caso a 80, não está sendo exposta para a internet. Para corrigir isso precisamos adicionar uma regra a Security Group associada a nossa intância. 

![Erro ](./../../../images/2024/03/31/7.png)

5 - Para adicionar essa regra a security group, navegue até o serviço de EC2, e selecione as instâncias que estão em execução

![Buscar serviço EC2](./../../../images/2024/03/31/8.png)
 
![Instancias em execução](./../../../images/2024/03/31/9.png)

5 - Na página das instancias que estão em execução, selecione sua instâcia ao qual seu Cloud9 foi iniciado, logo após seleciona-la, na parte inferior da página será mostrado alguma informações de sua instância. Na aba **security** clique no link da security group que está em baixo de **Security groups**.

![Security group](./../../../images/2024/03/31/10.png)

6 - Na página da security group, na aba de **inbound rules**(regras de entrada) vamos clicar em **Edit inbound rules** 

![Edit Security group](./../../../images/2024/03/31/11.png)

7 - Clique em **Add rule** e adicione um regra de entrada que libere a porta 80 para ser acessada por qualquer IP da internet, lembrando que você pode estar customizando isso, como por exemplo adicionando apenas o seu IP. Por fim de um **Save Rules**
````
Type: Custom TCP
Port range: 80
Source: 0.0.0.0/0
````
![Edit Security group](./../../../images/2024/03/31/12.png)

# Parabéns

Voltanto a sua aba do navegador e recarregando a página você deve conseguir acessar sua aplicação normalmente

![Aplicação em excução](./../../../images/2024/03/31/13.png)

# Commit das alterações

Agora que sua aplicação está configurada e sendo executada você pode estar fazendo o commit das alterações e as enviando para seu repositório que foi configurado

````
git commit add -A
git commit -m "configuração do projeto"
git push origin master
````

# Exclusão dos recursos

Não se esqueça de excluir o Cloud9 ao final do teste, caso queira prosseguir com mais teste mas queira parar e deixar para outro momento o Cloud9 para sua instância depois de alguns minutos de inatividade, agora se você quiser para na hora basta navegar até o serviço de EC2 selecionar sua EC2 e depois dar um **Stop instance**

# Conclusão

Bem é isso, espero que tenha gostado e tenha lhe agregado em algo, caso tenha duvida ou tenha algum problema comenta abaixo, dentro do possível estarei lhe respondendo, obrigado por ter chegado até aqui.

# Referências

[Instalação docker compose](https://docs.docker.com/compose/install/linux/)
[Composer instalação](https://getcomposer.org/download/)
[Laravel Sail instalação](https://laravel.com/docs/11.x#sail-on-linux)
[Instalação docker compose](https://stackoverflow.com/questions/63708035/installing-docker-compose-on-amazon-ec2-linux-2-9kb-docker-compose-file)
[Cloud9 Preview](https://docs.aws.amazon.com/cloud9/latest/user-guide/app-preview.html#app-preview-preview-app)