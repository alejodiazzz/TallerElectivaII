Diagramas

Casos de uso:
```mermaid
usecaseDiagram
actor Cliente
actor Usuario as U
actor Administrador as A

Cliente --> (Consultar productos)
Cliente --> (Filtrar producto por ID)

U --> (Iniciar sesión)
U --> (Gestionar inventario)

(Iniciar sesión) .> (Validar credenciales) : include
(Gestionar inventario) .> (Entrada de producto) : include
(Gestionar inventario) .> (Salida de producto) : include

(Entrada de producto) .> (Actualizar stock) : include
(Salida de producto) .> (Validar stock mínimo) : include

