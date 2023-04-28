create database Todo_app
go

use todo tutorial
go

CREATE TABLE usuario (
usuario_id INT AUTO_INCREMENT PRIMARY key,
name VARCHAR (255),
email VARCHAR (255) UNIQUE NOT NULL,
password VARCHAR (255)
);
go

CREATE TABLE tareas (
tareas_id INT AUTO_INCREMENT PRIMARY key,
title VARCHAR (255),
completado BOOLEAN DEFAULT false,
user_id INT NOT NULL,
FOREIGN KEY (user_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE
);
go

CREATE TABLE buscar_tareas(
buscar_id INT AUTO_INCREMENT PRIMARY key,
tarea_id INT,
usuario_id INT,
buscar_por_id INT,
FOREIGN KEY (tarea_id) REFERENCES tareas(tareas_id) ON DELETE CASCADE,
FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE,
FOREIGN KEY (buscar_por_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE
);
go

INSERT INTO usuario (name,email,password) VALUES ('jonatan','correo1@correo.com',123456),('LOL','correo2@correo.com',6942)
go
 
INSERT INTO tareas (title,user_id) VALUES ('comer',1),('dormir',1)
GO

INSERT INTO buscar_compa (todo_id,user_id,buscar_por_id) VALUES (1,1,2)
GO

SELECT todos.*, buscar_compa.buscar_por_id FROM todos
LEFT JOIN buscar_compa ON todos.id = buscar_compa.todo_id
WHERE todos.user_id = 2 OR buscar_compa.buscar_por_id = 2;