from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# =========================================
# PRODUCTOS
# =========================================
class ProductoBase(BaseModel):
    nombre: str
    categoria: Optional[str] = None
    stock: Optional[int] = 0
    precio: Optional[float] = 0.0


class ProductoCreate(ProductoBase):
    pass


class ProductoOut(ProductoBase):
    id: int
    class Config:
        from_attributes = True


# =========================================
# CLIENTES
# =========================================
class ClienteBase(BaseModel):
    nombre: str
    correo: Optional[str] = None
    telefono: Optional[str] = None


class ClienteCreate(ClienteBase):
    pass


class ClienteOut(ClienteBase):
    id: int
    class Config:
        from_attributes = True


# =========================================
# DETALLE PEDIDOS
# =========================================
class DetallePedidoBase(BaseModel):
    producto_id: int
    cantidad: int


class DetallePedidoOut(DetallePedidoBase):
    id: int
    subtotal: float
    class Config:
        from_attributes = True


# =========================================
# PEDIDOS
# =========================================
class PedidoBase(BaseModel):
    cliente_id: int
    estado: Optional[str] = "Pendiente"


class PedidoCreate(PedidoBase):
    detalles: List[DetallePedidoBase]


class PedidoOut(PedidoBase):
    id: int
    fecha: datetime
    total: Optional[float] = 0.0
    detalles: Optional[List[DetallePedidoOut]] = []
    class Config:
        from_attributes = True
