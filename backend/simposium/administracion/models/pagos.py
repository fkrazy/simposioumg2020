from django.db import models

from .cuentas import Cuenta


class Pago(models.Model):
    PENDIENTE = 0
    PAGADO = 1

    ESTADOS = (
        (PENDIENTE, 'Pendiente'),
        (PAGADO, 'Pagado')
    )

    codigo_pago = models.CharField(max_length=30, verbose_name="Número de cuenta")
    cuenta = models.ForeignKey(Cuenta, related_name='pagos', verbose_name='Cuenta', on_delete=models.PROTECT)
    foto = models.FileField(verbose_name='Foto')
    titular = models.CharField(max_length=30, verbose_name='Titular')
    fecha = models.DateField(verbose_name='Fecha')
    hora = models.TimeField(verbose_name='Hora')
    estado = models.SmallIntegerField(verbose_name='Estado', choices=ESTADOS, default=PENDIENTE)

    def __str__(self):
        return self.codigo_pago
