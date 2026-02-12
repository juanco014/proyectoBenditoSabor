# models.py
from datetime import datetime
from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey,
    Numeric
)
from sqlalchemy.orm import relationship
from database import Base

# =========================================
# TABLA: usuarios
# =========================================
class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    correo = Column(String(100), unique=True, nullable=False)
    contrasena = Column(String(200), nullable=False)
    rol = Column(String(50), default="empleado")


# =========================================
# TABLA: clientes
# =========================================
class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    correo = Column(String)
    telefono = Column(String)

    # 🔗 Relación con Pedido
    pedidos = relationship("Pedido", back_populates="cliente")


# =========================================
# TABLA: productos
# =========================================
class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    categoria = Column(String(50))
    stock = Column(Integer, nullable=False)
    precio = Column(Numeric(10, 2), nullable=False)

    detalle_pedidos = relationship("DetallePedido", back_populates="producto")


# =========================================
# TABLA: pedidos

class Pedido(Base):
    __tablename__ = "pedidos"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("clientes.id"))
    fecha = Column(DateTime, default=datetime.utcnow)
    total = Column(Float, default=0.0)
    estado = Column(String, default="pendiente")

    # 🔗 Relación con Cliente
    cliente = relationship("Cliente", back_populates="pedidos")

    detalle_pedidos = relationship(
        "DetallePedido",
        back_populates="pedido",
        cascade="all, delete-orphan"
    )


# =========================================
# TABLA: detalle_pedidos
# =========================================
class DetallePedido(Base):
    __tablename__ = "detalle_pedidos"

    id = Column(Integer, primary_key=True, index=True)
    pedido_id = Column(Integer, ForeignKey("pedidos.id", ondelete="CASCADE"))
    producto_id = Column(Integer, ForeignKey("productos.id"))
    cantidad = Column(Integer, nullable=False)
    subtotal = Column(Numeric(10, 2))

    pedido = relationship("Pedido", back_populates="detalle_pedidos")
    producto = relationship("Producto", back_populates="detalle_pedidos")
