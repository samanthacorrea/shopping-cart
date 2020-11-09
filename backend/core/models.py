from django.db import models


class Products(models.Model):
    name = models.TextField()
    description = models.TextField()
    price = models.DecimalField(max_digits=7, decimal_places=2)
    stock_quantity = models.IntegerField()
    # image = models.ImageField(upload_to="cart", null=True, blank=True)


def __str__(self):
    return self.name
