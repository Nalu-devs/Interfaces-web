CREATE TABLE users(
    'ID' int(11) PRIMARY KEY AUTO_INCREMENT,
    'NOME' varchar(150) NOT NULL,
    'DESCRICAO' varchar(550) NOT NULL,
    'PRECO' varchar(150) NOT NULL,
    'ESTOQUE' varchar(20) NOT NULL,
    'ACAO' boolean
)