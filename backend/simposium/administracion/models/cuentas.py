from django.db import models


class Cuenta(models.Model):
    numero = models.CharField(max_length=30, verbose_name="Número de cuenta")
    banco = models.CharField(max_length=30, verbose_name="Banco")
    titular = models.CharField(max_length=30, verbose_name='Titular')

    class Meta:
        unique_together = [['numero','banco']]

    def __str__(self):
        return self.numero
