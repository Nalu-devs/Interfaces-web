CREATE TABLE users(
    'ID' int(11) PRIMARY KEY AUTO_INCREMENT,
    'LOGIN' varchar(50) NOT NULL,
    'NOME' varchar(150) NOT NULL,
    'EMAIL' varchar(150) NOT NULL,
    'SENHA' varchar(50) NOT NULL,
    'ATIVO' boolean
)