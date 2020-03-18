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


## Carga de datos iniciales
Para cargar los datos iniciales hay que ejecutar:
```
python manage.py loaddata datos
```
Esto crear&aacute; dos usuarios que se pueden utilizar para iniciar sesi&oacute;n: 
1. solomeo@gmail.com que es superusuario(se puede ingresar al admin de django con &eacute;l) y tiene el rol ADMIN.
1. voldemort@gmail.com que tiene el rol ADMIN pero no es superusuario.

> La ejecuci&oacute;n de este comando borrar&aacute; los datos de las tablas.

> Si quieren hacer pruebas con usuarios con el rol ASISTENTE deber&aacute;n crearlos desde la p&aacute;gina de registro.