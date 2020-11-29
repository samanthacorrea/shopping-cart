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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        logger = logging.getLogger(__name__)
        logger.error(request.data)
        if int(request.data.get('cardId')) == 1:
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response({'message': 'Compra não realizada! Verifique se os dados do seu cartão são válidos.'}, status=status.HTTP_403_FORBIDDEN)