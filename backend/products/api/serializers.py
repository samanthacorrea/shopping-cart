from rest_framework.serializers import ModelSerializer
from products.models import Products


class ProductsSerializer(ModelSerializer):
    class Meta:
        model = Products
        fields = ['id', 'name', 'author', 'description', 'price', 'image', 'stock_quantity']

