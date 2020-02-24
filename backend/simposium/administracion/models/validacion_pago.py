from django.contrib.auth.models import User
from django.db import models

from .pagos import Pago


class ValidacionPago(models.Model):
    POR_VERIFICAR = 1
    VERIFICADO = 2

    resultados = (
        (POR_VERIFICAR, 'Por verificar'),
        (VERIFICADO, 'Verificado')
    )

    mensaje = models.CharField(max_length=300, verbose_name="Mensaje")
    resultado = models.SmallIntegerField(verbose_name='Resultado', choices=resultados, default=POR_VERIFICAR)

    # relaciones
    pago = models.ForeignKey(Pago, related_name='Validaciones', verbose_name='Pago', on_delete=models.PROTECT)
    usuario = models.ForeignKey(User, related_name='Validaciones', verbose_name='Usuario', on_delete=models.PROTECT)

    def __str__(self):
        return f'{self.pago} - {self.usuario}'
