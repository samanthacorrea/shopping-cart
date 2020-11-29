from django.db import models

from django.db import models


class Orders(models.Model):
    cardId = models.IntegerField()
    address = models.TextField()
    productsId = models.JSONField()


def __str__(self):
    return self.name