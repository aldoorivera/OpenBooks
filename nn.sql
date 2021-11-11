CREATE DATABASE  IF NOT EXISTS `openbooks` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `openbooks`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: openbooks
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autores`
--

DROP TABLE IF EXISTS `autores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autores` (
  `idautores` int NOT NULL AUTO_INCREMENT,
  `nombre_autor` varchar(45) NOT NULL,
  PRIMARY KEY (`idautores`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autores`
--

LOCK TABLES `autores` WRITE;
/*!40000 ALTER TABLE `autores` DISABLE KEYS */;
INSERT INTO `autores` VALUES (2,'Agatha Cristhie'),(3,'James Patterson'),(4,'Miguel de Cervantes');
/*!40000 ALTER TABLE `autores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos_literarios`
--

DROP TABLE IF EXISTS `generos_literarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos_literarios` (
  `idgl` int NOT NULL AUTO_INCREMENT,
  `generos_literarios` varchar(45) NOT NULL,
  PRIMARY KEY (`idgl`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos_literarios`
--

LOCK TABLES `generos_literarios` WRITE;
/*!40000 ALTER TABLE `generos_literarios` DISABLE KEYS */;
INSERT INTO `generos_literarios` VALUES (1,'Ficcion'),(2,'Crimen'),(3,'Horror'),(4,'Misterio'),(5,'Fantasia');
/*!40000 ALTER TABLE `generos_literarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libro_categorias`
--

DROP TABLE IF EXISTS `libro_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libro_categorias` (
  `idgl` int NOT NULL,
  `idlibros` int NOT NULL,
  PRIMARY KEY (`idgl`,`idlibros`),
  KEY `fk_generos_categorias_idx` (`idgl`),
  KEY `fk_libro_categorias_idx` (`idlibros`),
  CONSTRAINT `fk_generos_categorias` FOREIGN KEY (`idgl`) REFERENCES `generos_literarios` (`idgl`),
  CONSTRAINT `fk_libro_categorias` FOREIGN KEY (`idlibros`) REFERENCES `libros` (`idlibros`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libro_categorias`
--

LOCK TABLES `libro_categorias` WRITE;
/*!40000 ALTER TABLE `libro_categorias` DISABLE KEYS */;
INSERT INTO `libro_categorias` VALUES (1,2),(2,1),(2,2),(3,1),(4,1);
/*!40000 ALTER TABLE `libro_categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libros`
--

DROP TABLE IF EXISTS `libros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libros` (
  `idlibros` int NOT NULL AUTO_INCREMENT,
  `nombre_libro` varchar(45) NOT NULL,
  `num_paginas` int NOT NULL,
  `descripcion` longtext,
  `libro` varchar(250) DEFAULT NULL,
  `img_libro` varchar(250) DEFAULT NULL,
  `idautores` int NOT NULL,
  `editorial` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idlibros`),
  KEY `fk_libros_autores_idx` (`idautores`),
  CONSTRAINT `fk_libros_autores` FOREIGN KEY (`idautores`) REFERENCES `autores` (`idautores`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libros`
--

LOCK TABLES `libros` WRITE;
/*!40000 ALTER TABLE `libros` DISABLE KEYS */;
INSERT INTO `libros` VALUES (1,'And Then There Where None',150,'Ocho personas, todas desconocidas entre sí, están invitadas a Indian Island, frente a la costa inglesa. Vera Claythorne, ex institutriz, cree que la han contratado como secretaria; Philip Lombard, un aventurero, y William Blore, un ex detective, creen que los han contratado para buscar problemas durante el fin de semana; El Dr. Armstrong cree que lo contrataron para cuidar a la esposa del dueño de la isla. Emily Brent, el general Macarthur, Tony Marston y el juez Wargrave creen que van a visitar a viejos amigos. Cuando llegan a la isla, los invitados son recibidos por el Sr. y la Sra. Rogers, el mayordomo y el ama de llaves, quienes informan que el anfitrión, alguien a quien llaman Sr. Owen, no llegará hasta el día siguiente. Esa noche, mientras todos los invitados se reúnen en el salón después de una excelente cena, escuchan una voz grabada que acusa a cada uno de ellos de un asesinato específico cometido en el pasado y nunca descubierto. Comparan notas y se dan cuenta de que ninguno de ellos, incluidos los sirvientes, conoce al “Sr. Owen \", lo que sugiere que fueron traídos aquí de acuerdo con el extraño plan de alguien.',NULL,'https://firebasestorage.googleapis.com/v0/b/openbooks-bd974.appspot.com/o/And%20Then%20There%20Where%20None.png?alt=media&token=3c78ae9c-0b9d-465d-b355-10e6f62e9c15',2,'La Fuente'),(2,'Crooked House',220,'El multimillonario Aristide Leonides acaba de morir, aparentemente de un infarto. El investigador privado Charles Hayward es abordado por su nieta Sophia y le pide que investigue su muerte ya que ella cree que fue asesinado. Hayward asume el caso y visita la propiedad de Leonides, interrogando a la familia. Descubre que está lejos de ser un caso simple: la familia es increíblemente disfuncional y nada es lo que parece.',NULL,'https://firebasestorage.googleapis.com/v0/b/openbooks-bd974.appspot.com/o/Crooked%20House.png?alt=media&token=b4fcdb92-fa1e-4380-a9de-885eee6e3465',2,'La Fuente'),(3,'Worst Case',202,'El hijo de una de las familias más ricas de Nueva York es secuestrado de la calle y tomado como rehén. Pero este secuestrador no exige dinero. En cambio, interroga a su prisionero sobre el precio que otros pagan por su vida de lujo. . . y las respuestas incorrectas son fatales. El detective Michael Bennett dirige la investigación.',NULL,'https://firebasestorage.googleapis.com/v0/b/openbooks-bd974.appspot.com/o/Worst%20Case.png?alt=media&token=627d9268-b774-4430-9b12-610e26f66da9',3,'Del Rey');
/*!40000 ALTER TABLE `libros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcadores`
--

DROP TABLE IF EXISTS `marcadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcadores` (
  `idusuarios` varchar(45) NOT NULL,
  `idlibros` int NOT NULL,
  PRIMARY KEY (`idusuarios`,`idlibros`),
  KEY `fk_usuarios_marcadores_idx` (`idusuarios`),
  KEY `fk_libros_marcadores_idx` (`idlibros`),
  CONSTRAINT `fk_libros_marcadores` FOREIGN KEY (`idlibros`) REFERENCES `libros` (`idlibros`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_usuarios_marcadores` FOREIGN KEY (`idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcadores`
--

LOCK TABLES `marcadores` WRITE;
/*!40000 ALTER TABLE `marcadores` DISABLE KEYS */;
INSERT INTO `marcadores` VALUES ('ACRU_98',1),('ACRU_98',2);
/*!40000 ALTER TABLE `marcadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuarios` varchar(45) NOT NULL,
  `password` varchar(250) NOT NULL,
  `nombe_usuario` varchar(45) NOT NULL,
  `apellido_usuario` varchar(45) NOT NULL,
  `email` varchar(250) NOT NULL,
  PRIMARY KEY (`idusuarios`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('ACRU_98','$2b$10$8Qx77haTEETNnJKUKS5dN.TEzRCgSHhTfA76HHPWbrTGatcpUHVwK','Ana','Reyes','example@example.com'),('Am98-56','$2b$10$k.QB72KIZYIqTki2ZKc3M.L14X2BpIouAWu1CHO83SkshdMV4WudW','Alex','Martinez','alexmrtnz902@gmail.com'),('Jp-15','$2b$10$QKXlqemt/aDdbOjgBYfVweBoVBLYSSodhaMUmLs.346VDxSmKzHIe','Jorge','Pineda','Example2@example.com');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-08  0:30:28
