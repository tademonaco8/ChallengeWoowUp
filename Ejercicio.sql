--Escribir una consulta SQL que traiga todos los clientes que han comprado en total más de 100,000$ en los últimos 12 meses usando las siguientes tablas: 
--Clientes: ID, Nombre, Apellido
--Ventas: Fecha, Sucursal, Numero_factura, Importe, Id_cliente

SELECT 
    CL.Nombre,
    CL.Apellido
 FROM Cliente CL 
 INNER JOIN Ventas V on CL.ID = V.Id_cliente
 WHERE V.Fecha >= Dateadd(YEAR,-1,Getdate())
 GROUP BY CL.Nombre, CL.Apellido
 HAVING SUM(V.Importe) > 100000;