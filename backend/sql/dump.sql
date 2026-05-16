CREATE SCHEMA `inciveldelivery` ;

CREATE TABLE `inciveldelivery`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(225) NULL,
  `email` VARCHAR(225) NULL,
  `senha` VARCHAR(225) NULL,
  `telefone` BIGINT NULL,
  `cpf` BIGINT NULL,
  `ativo` INT NULL DEFAULT 1,
  PRIMARY KEY (`idusuario`));

