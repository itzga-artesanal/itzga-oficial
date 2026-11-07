"""Reemplaza la URL de ejemplo por la URL real de tu sitio en GitHub Pages.
Uso:  python configurar_url.py https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/
"""
import sys, pathlib
PH = "https://itzga-artesanal.github.io/itzga-oficial/"
if len(sys.argv) < 2:
    sys.exit(__doc__)
url = sys.argv[1].strip().rstrip("/") + "/"
n = 0
for p in pathlib.Path(__file__).parent.rglob("*"):
    if p.is_file() and p.suffix in {".html", ".xml", ".txt", ".webmanifest"}:
        t = p.read_text(encoding="utf-8")
        if PH in t:
            p.write_text(t.replace(PH, url), encoding="utf-8"); n += 1
print("Listo. Archivos actualizados:", n)
