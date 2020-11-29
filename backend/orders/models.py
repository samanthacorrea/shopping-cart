from django.db import models

from django.db import models


class Orders(models.Model):
    productId = models.IntegerField()
    productQuantity = models.IntegerField()
    unitPrice = models.DecimalField(max_digits=7, decimal_places=2)
    cardId = models.IntegerField()
    total = models.DecimalField(max_digits=7, decimal_places=2)
    address = models.TextField()


def __str__(self):
    return self.name