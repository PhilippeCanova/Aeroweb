for local shell scripts that are related to the project,

Pour lancer env : source env/bin/activate
Pour sortir : deactivate

Installer les requirements (avec env activé):
pip install -r requirements/dev.txt

Si les dépendances sont déjà installées, générer un fichier avec :
pip freeze > requirements/_base.txt
