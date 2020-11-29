from rest_framework.serializers import ModelSerializer
from orders.models import Orders


class OrdersSerializer(ModelSerializer):
    class Meta:
        model = Orders
        fields = ['id', 'cardId', 'address', 'productsId']