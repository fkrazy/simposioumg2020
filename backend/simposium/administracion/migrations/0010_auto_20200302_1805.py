# Generated by Django 2.2.5 on 2020-03-03 00:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administracion', '0009_auto_20200302_1747'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pago',
            name='codigo_pago',
            field=models.CharField(max_length=30, unique=True, verbose_name='Código de recibo'),
        ),
    ]