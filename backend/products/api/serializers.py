from rest_framework.serializers import ModelSerializer
from products.models import Products


class ProductsSerializer(ModelSerializer):
    class Meta:
        model = Products
        fields = ['id', 'name', 'description', 'price', 'image', 'stock_quantity']
        #fields = ['id', 'name', 'description', 'price', 'stock_quantity']
