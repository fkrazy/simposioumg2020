# Generated by Django 2.2.5 on 2020-03-02 21:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('administracion', '0007_carrera_codigo'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cuenta',
            old_name='numero_cuenta',
            new_name='numero',
        ),
        migrations.AlterUniqueTogether(
            name='cuenta',
            unique_together={('numero', 'banco')},
        ),
    ]
