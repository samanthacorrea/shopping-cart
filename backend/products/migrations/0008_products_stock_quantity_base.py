# Generated by Django 3.1.3 on 2020-11-25 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_products_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='stock_quantity_base',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
