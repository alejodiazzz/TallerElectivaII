Diagramas

Casos de uso:
```mermaid
flowchart TB
    subgraph Actores
        A1[Usuario no autenticado]
        A2[Usuario autenticado]
    end

    subgraph Sistema
        UC1((Consultar lista de productos))
        UC2((Consultar producto por ID))
        UC3((Iniciar sesión))
        UC4((Actualizar inventario))
    end

    A1 --> UC1
    A1 --> UC2
    A2 --> UC3
    A2 --> UC4
    UC4 --> UC3


