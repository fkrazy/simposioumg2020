# Generated by Django 2.2.5 on 2020-03-18 16:29

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Asistente',
            fields=[
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='asistente', serialize=False, to=settings.AUTH_USER_MODEL, verbose_name='Usuario')),
                ('telefono', models.CharField(max_length=8)),
            ],
        ),
        migrations.CreateModel(
            name='Carrera',
            fields=[
                ('codigo', models.PositiveIntegerField(primary_key=True, serialize=False, unique=True)),
                ('nombre', models.CharField(max_length=128, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Conferencista',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=64)),
                ('profesion', models.CharField(max_length=128)),
                ('resumen', models.CharField(default='', max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Salon',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=64, unique=True)),
                ('ubicacion', models.CharField(max_length=128)),
                ('capacidad', models.SmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Pago',
            fields=[
                ('titular', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, primary_key=True, related_name='pago', serialize=False, to='administracion.Asistente', verbose_name='Asistente')),
                ('codigo_pago', models.CharField(max_length=32, verbose_name='Código de recibo')),
                ('foto', models.TextField(verbose_name='Foto')),
                ('fecha_registro', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Fecha de registro')),
                ('fecha', models.DateField(null=True, verbose_name='Fecha')),
                ('hora', models.TimeField(null=True, verbose_name='Hora')),
                ('estado', models.SmallIntegerField(choices=[(1, 'Pendiente'), (2, 'Rechazado'), (3, 'Aceptado'), (4, 'Reembolso solicitado'), (5, 'Reembolso aprobado'), (6, 'Reembolsado')], default=1, verbose_name='Estado')),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('asistente', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='ticket', serialize=False, to='administracion.Asistente', verbose_name='Usuario')),
                ('codigo_qr', models.TextField()),
                ('estado', models.PositiveSmallIntegerField(choices=[(1, 'VALIDO'), (2, 'INVALIDADO')], default=1, verbose_name='Estados')),
            ],
        ),
        migrations.CreateModel(
            name='Cuenta',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.CharField(max_length=32, verbose_name='Número de cuenta')),
                ('banco', models.CharField(max_length=64, verbose_name='Banco')),
                ('titular', models.CharField(max_length=128, verbose_name='Titular')),
            ],
            options={
                'unique_together': {('numero', 'banco')},
            },
        ),
        migrations.CreateModel(
            name='Conferencia',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tema', models.CharField(max_length=128, unique=True)),
                ('inicio', models.TimeField(verbose_name='Hora de inicio')),
                ('fin', models.TimeField(verbose_name='Hora de finalización')),
                ('foto', models.ImageField(default='none', upload_to='conferencias')),
                ('conferencista', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='conferencias', to='administracion.Conferencista')),
                ('salon', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='conferencias', to='administracion.Salon')),
            ],
        ),
        migrations.CreateModel(
            name='ValidacionPago',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mensaje', models.CharField(max_length=256, null=True, verbose_name='Mensaje')),
                ('resultado', models.PositiveSmallIntegerField(choices=[(1, 'Rechazado'), (2, 'Aceptado')], default=2, verbose_name='Resultado')),
                ('fecha_hora', models.DateTimeField(default=datetime.datetime.utcnow, verbose_name='Fecha y hora de validación')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='validaciones_pagos', to=settings.AUTH_USER_MODEL, verbose_name='Usuario que validó')),
                ('pago', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='validaciones', to='administracion.Pago', verbose_name='Pago')),
            ],
        ),
        migrations.CreateModel(
            name='Reservacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateTimeField(verbose_name='Fecha de reservación')),
                ('estado', models.SmallIntegerField(choices=[(1, 'Confirmada'), (2, 'Pago pendiente de validar')], default=1, verbose_name='Estado')),
                ('asistente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reservaciones', to='administracion.Asistente', verbose_name='Asistente')),
                ('conferencia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reservaciones', to='administracion.Conferencia', verbose_name='Conferencia')),
            ],
            options={
                'unique_together': {('conferencia', 'asistente')},
            },
        ),
        migrations.AddField(
            model_name='pago',
            name='cuenta',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='pagos', to='administracion.Cuenta', verbose_name='Cuenta'),
        ),
        migrations.CreateModel(
            name='EvaluacionReembolso',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mensaje', models.CharField(max_length=256, null=True, verbose_name='Mensaje')),
                ('resultado', models.PositiveSmallIntegerField(choices=[(1, 'Rechazado'), (2, 'Aceptado'), (3, 'Reembolsado')], default=2, verbose_name='Resultado')),
                ('fecha_hora', models.DateTimeField(default=datetime.datetime.utcnow, verbose_name='Fecha y hora de evaluación')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='evaluaciones_reembolsos', to=settings.AUTH_USER_MODEL, verbose_name='Usuario que evaluó')),
                ('pago', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='evaluaciones_reembolso', to='administracion.Pago', verbose_name='Pago')),
            ],
        ),
        migrations.CreateModel(
            name='EstudianteUmg',
            fields=[
                ('asistente', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='estudianteUmg', serialize=False, to='administracion.Asistente', verbose_name='Asistente')),
                ('carnet', models.CharField(max_length=32, unique=True)),
                ('semestre', models.PositiveSmallIntegerField(verbose_name='Semestre')),
                ('carrera', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='estudiantes', to='administracion.Carrera', verbose_name='Carrera')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='pago',
            unique_together={('cuenta', 'codigo_pago')},
        ),
        migrations.CreateModel(
            name='Asistencia',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hora', models.TimeField(verbose_name='Hora de asistencia')),
                ('conferencia', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='asistencias', to='administracion.Conferencia', verbose_name='Conferencia')),
                ('ticket', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='asistencias', to='administracion.Ticket', verbose_name='Ticket')),
            ],
            options={
                'unique_together': {('conferencia', 'ticket')},
            },
        ),
    ]
