for local shell scripts that are related to the project,

Pour lancer env : source env/bin/activate
Pour sortir : deactivate

Installer les requirements (avec env activé):
pip install -r requirements/dev.txt

Si les dépendances sont déjà installées, générer un fichier avec :
pip freeze > requirements/_base.txt

# Pour résoudre le problème de droit sur certains répertoires dans docker : 
#docker-compose run --user root gunicorn sh -c "chown -R myproject:root /home/myproject/static"
docker-compose run --user root gunicorn sh -c "chown -R myproject:root /home/myproject/media"

$ docker exec -it django_docker_gunicorn_1 bash
$ source env/bin/activate
(env)$ python manage.py migrate
(env)$ python manage.py collectstatic
(env)$ python manage.py createsuperuser
