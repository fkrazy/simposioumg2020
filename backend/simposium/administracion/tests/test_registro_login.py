from django.test import TestCase
from django.contrib.auth.models import User, Group
from rest_framework.test import APIClient
from rest_framework import status
from ..models import Asistente, EstudianteUmg, Carrera

class AsistenteTestCase(TestCase):
    fixtures = ('datos.json',)

    def setUp(self):
        user = User.objects.create_user(username='elon@gmail.com', email='elon@gmail.com', password='310N@%$')
        user.groups.add(Group.objects.get(name='ASISTENTE'))
        user.groups.add(Group.objects.get(name='ESTUDIANTE'))
        user.save()

        asistente = Asistente(usuario=user, telefono='66666666')
        asistente.save()

        estud = EstudianteUmg(asistente=asistente, carnet='6666-66-666', semestre=5, carrera=Carrera.objects.get(codigo=90))
        estud.save()


    def test_registrologin_asistente(self):
        with self.assertRaises(User.DoesNotExist) as err:
            User.objects.get(username='shaka@gmail.com')

        client = APIClient()
        # prueba del registro
        response = client.post('/api/registro/', {
            'correo': 'shaka@gmail.com',
            'password': '%Sh@k@23#',
            'nombres': 'Shaka',
            'apellidos': 'Laka',
            'telefono': '12345678',
            'es_estudiante': False
        })
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # se inicia sesion despues de hacer login
        response = client.post('/api/login/', {
            'username': 'shaka@gmail.com',
            'password': '%Sh@k@23#'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        # se prueba que los datos sean correctos
        self.assertEqual(data['email'], 'shaka@gmail.com')
        self.assertEqual(data['roles'], ',ASISTENTE')
        self.assertEqual(data['firstLogin'], True)
        self.assertEqual(data['asistente']['telefono'], '12345678')
        with self.assertRaises(KeyError) as err:
            estud = data['estudiante']

        # se vuelve a iniciar sesion
        response = client.post('/api/login/', {
            'username': 'shaka@gmail.com',
            'password': '%Sh@k@23#'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['firstLogin'], False)


    def test_registrologin_estudiante(self):
        with self.assertRaises(User.DoesNotExist) as err:
            User.objects.get(username='shaka2@gmail.com')

        client = APIClient()
        # prueba del registro
        response = client.post('/api/registro/', {
            'correo': 'shaka2@gmail.com',
            'password': '%Sh@k@23#',
            'nombres': 'Shaka2',
            'apellidos': 'Laka',
            'telefono': '01234567',
            'es_estudiante': True,
            'carnet': '1490-09-666',
            'semestre': 8,
            'codigo_carrera': 90
        })
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # se inicia sesion despues de hacer login
        response = client.post('/api/login/', {
            'username': 'shaka2@gmail.com',
            'password': '%Sh@k@23#'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        # se prueba que los datos sean correctos
        self.assertEqual(data['email'], 'shaka2@gmail.com')
        self.assertEqual(data['roles'], ',ASISTENTE,ESTUDIANTE')
        self.assertEqual(data['firstLogin'], True)
        self.assertEqual(data['asistente']['telefono'], '01234567')
        self.assertEqual(data['estudiante']['carnet'], '1490-09-666')
        self.assertEqual(data['estudiante']['semestre'], 8)


        # se vuelve a iniciar sesion
        response = client.post('/api/login/', {
            'username': 'shaka2@gmail.com',
            'password': '%Sh@k@23#'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['firstLogin'], False)

    def test_registro_carnet_repetido(self):
        client = APIClient()
        response = client.post('/api/registro/', {
            'correo': 'prueba@gmail.com',
            'password': '%Sh@k@23#',
            'nombres': 'Prueba',
            'apellidos': 'Probada',
            'telefono': '01232767',
            'es_estudiante': True,
            'carnet': '6666-66-666',
            'semestre': 8,
            'codigo_carrera': 90
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_registro_usuario_repetido(self):
        client = APIClient()
        response = client.post('/api/registro/', {
            'correo': 'elon@gmail.com',
            'password': '%Sh@k@23#',
            'nombres': 'Elongator',
            'apellidos': 'Muskrat',
            'telefono': '11111111',
            'es_estudiante': True,
            'carnet': '2222-66-666',
            'semestre': 8,
            'codigo_carrera': 90
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)