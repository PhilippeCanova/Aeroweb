import glob
from pathlib import Path
"""
    Script permettant de supprimer les fichiers de compilation
    Notammment lors du changement d'une branche à l'autre
"""
    
base_dir = Path(__file__).resolve().parent.parent
liste = sorted(Path(base_dir).joinpath('src').rglob("*.py[co]"))

if liste:
    print("Deleting :")

for fichier in liste:
    print (fichier)
    fichier.unlink()

liste = sorted(Path(base_dir).joinpath('src').rglob("__pycache__"))
for rep in liste:
    if rep.is_dir():
        print (rep)
        rep.rmdir()



