CREATE DATABASE ecoscan;
USE ecoscan;

CREATE TABLE Usuario (
    ID_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('Administrador', 'Padrao') NOT NULL,
    datacadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Escaneamento (
    ID_scan INT PRIMARY KEY AUTO_INCREMENT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    local_latitude DECIMAL(10,8) NOT NULL,
    local_longitude DECIMAL(11,8) NOT NULL,
    residuo_nome VARCHAR(100) NOT NULL,
    ID_FK_usuario INT NOT NULL,
    FOREIGN KEY (ID_FK_usuario) REFERENCES Usuario(ID_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Mensagem_Educativa (
    ID_mensagem INT PRIMARY KEY AUTO_INCREMENT,
    nome_residuo VARCHAR(100) NOT NULL,
    texto TEXT NOT NULL
);
