use ecoscan;
CREATE DATABASE IF NOT EXISTS ecoscan;
USE ecoscan;

CREATE TABLE IF NOT EXISTS Usuario (
    ID_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('Administrador', 'Padrao') NOT NULL,
    datacadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Escaneamento (
    ID_scan INT PRIMARY KEY AUTO_INCREMENT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    local_latitude DECIMAL(10,8) NOT NULL,
    local_longitude DECIMAL(11,8) NOT NULL,
    residuo_nome VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    ID_FK_usuario INT NOT NULL,
    FOREIGN KEY (ID_FK_usuario) REFERENCES Usuario(ID_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Mensagem_Educativa (
    ID_mensagem INT PRIMARY KEY AUTO_INCREMENT,
    nome_residuo VARCHAR(100) NOT NULL,
    texto TEXT NOT NULL
);
SHOW CREATE TABLE Usuario;
SHOW CREATE TABLE Escaneamento;
DESCRIBE Escaneamento;