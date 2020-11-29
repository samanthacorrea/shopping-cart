from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from orders.models import Orders
from .serializers import OrdersSerializer
import logging


class OrdersViewSet(ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer

