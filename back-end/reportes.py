from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter()

@router.get("/reportes")
def get_reportes(db: Session = Depends(get_db)):
    data = (
        db.query(
            models.Pedido.id.label("pedido_id"),
            models.Pedido.estado,
            models.Producto.nombre.label("producto"),
            models.DetallePedido.cantidad,
            models.DetallePedido.subtotal
        )
        .join(models.DetallePedido, models.Pedido.id == models.DetallePedido.pedido_id)
        .join(models.Producto, models.DetallePedido.producto_id == models.Producto.id)
        .all()
    )

    return [
        {
            "pedido_id": d.pedido_id,
            "estado": d.estado,
            "producto": d.producto,
            "cantidad": d.cantidad,
            "subtotal": float(d.subtotal)
        }
        for d in data
    ]
