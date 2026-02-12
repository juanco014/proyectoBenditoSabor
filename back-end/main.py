from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session, joinedload
from database import SessionLocal, engine, get_db
from sqlalchemy import text
from database import engine
import models
from fastapi.middleware.cors import CORSMiddleware
from reportes import router as reportes_router  # ✅ Import correcto
from models import Pedido

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# ✅ Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # O ["http://127.0.0.1:5500"] si usas Live Server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Dependencia DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Endpoints normales
@app.get("/usuarios")
def get_usuarios(db: Session = Depends(get_db)):
    return db.query(models.Usuario).all()

@app.get("/productos")
def get_productos(db: Session = Depends(get_db)):
    return db.query(models.Producto).all()


@app.get("/detalle_pedidos")
def get_detalles(db: Session = Depends(get_db)):
    return db.query(models.DetallePedido).all()

@app.get("/clientes")
def get_clientes(db: Session = Depends(get_db)):
    return db.query(models.Cliente).all()

@app.get("/inventario")
def get_inventario(db: Session = Depends(get_db)):
    return db.query(models.Producto).all()

@app.get("/pedidos")
def get_pedidos(db: Session = Depends(get_db)):
    pedidos = db.query(models.Pedido).all()

    return [
        {
            "id": p.id,
            "fecha": p.fecha,
            "total": float(p.total),
            "estado": p.estado,
            "cliente": p.cliente.nombre if p.cliente else "Desconocido"
        }
        for p in pedidos
    ]


# ✅ Incluir el router de reportes
app.include_router(reportes_router)

@app.get("/test-db")
def test_db():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT NOW();"))
            return {"status": "Conectado ✅", "hora_servidor": str(result.scalar())}
    except Exception as e:
        return {"status": "Error ❌", "detalle": str(e)}