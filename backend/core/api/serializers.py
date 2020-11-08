from rest_framework.serializers import ModelSerializer
from core.models import Products

class ProductsSerializer(ModelSerializer):
    class Meta:
        model = Products
        fields = ['id', 'name', 'description', 'price', 'stock_quantity']