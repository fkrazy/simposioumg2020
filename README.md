# simposioumg2020

estructura django:
proyecto
  proyecto
    settings
    urls
  api
    models
      model1
    serializers
      serializer1
    views
      view1
    urls


funcionamiento rest framework https://www.django-rest-framework.org/tutorial/quickstart/


para el login y seguridad https://django-allauth.readthedocs.io/en/latest/installation.html


para los modelos https://docs.djangoproject.com/en/3.0/topics/db/models/

para endpoints de cruds: 
listar: get http://127.0.0.1:8000/administracion/carreras/
crear: post http://127.0.0.1:8000/administracion/carreras/
editar: post http://127.0.0.1:8000/administracion/carreras/1/
eliminar: delete http://127.0.0.1:8000/administracion/carreras/1/
obtener: get http://127.0.0.1:8000/administracion/carreras/1/

en postman al ingresar http://127.0.0.1:8000/administracion/ me muestra los endpoints disponibles

