"# DjangoPy"

code .
Install 
Django
vscode-icons  

py -m venv .venv
.venv\Scripts\activate.bat

py -m pip install Django
py -m pip install -U pip
py
>>>import django
>>>print(django.get_version())
>>>quit()
django-admin startproject blog
cd blog
py manage.py runserver 9178

-------App and Templates--------
.venv\Scripts\activate.bat
cd myblog
py manage.py migrate
py manage.py createsuperuser admin

SuperAdminKrot1-.venv\Scripts\activate.bat
pip install mysqlclient
pip install mariadb
pip install django-widget-tweaks

python manage.py migrate

https://dash.filess.io/#/app/databases

.venv\Scripts\activate.bat
cd snAPI
python manage.py startapp posts
py manage.py makemigrations
python manage.py migrate

---------Testing ORM----------
py manage.py shell
>>>from posts.models import Post
>>>p=Post()
>>>p
>>>p.title="Пост №1. Краще ви вигулювати собак у парку."
>>>p.save()
>>>Post.objects.all()
>>>exit()
.venv\Scripts\activate.bat
cd snAPI
py manage.py runserver 9178
deactivate
pip install Pillow
pip install djangorestframework
pip install djangorestframework djangorestframework-simplejwt
pip install django-cors-headers
pip install channels
pip freeze > requirements.txt         - копіює всі залежності (пакети) у файл requirements.txt якщо він використовується
docker build -t komar-django .
pip install channels channels_redis

--------------------------
start-project.bat