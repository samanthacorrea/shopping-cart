from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework.viewsets import ModelViewSet
from products.models import Products
from .serializers import ProductsSerializer
import logging


from rest_framework.parsers import JSONParser





class ProductsViewSet(ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        return super(ProductsViewSet, self).get_serializer(*args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        logger = logging.getLogger(__name__)
        logger.error(request.data)
        return self.update(request, *args, **kwargs)

    @action(methods=["patch"], detail=True)
    def decrement(self, request, pk=None, *args, **kwargs):
        kwargs['partial'] = True
        product = Products.objects.get(pk=pk)
        logger = logging.getLogger(__name__)
        logger.error(request.data)
        if product.stock_quantity > 0:
            product.stock_quantity -= 1
            request.data.update({'stock_quantity': product.stock_quantity})
            return self.update(request, *args, **kwargs)
        return Response({'message': 'Não há mais estoque desse produto!'}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["patch"], detail=True)
    def increment(self, request, pk=None, *args, **kwargs):
        kwargs['partial'] = True
        product = Products.objects.get(pk=pk)
        product.stock_quantity += 1
        request.data.update({'stock_quantity': product.stock_quantity})
        return self.update(request, *args, **kwargs)

    @action(methods=["patch"], detail=True)
    def update_stock(self, request, pk=None, *args, **kwargs):
        kwargs['partial'] = True
        product = Products.objects.get(pk=pk)
        logger = logging.getLogger(__name__)
        logger.error(product.stock_quantity)
        request._full_data = {'stock_quantity': (product.stock_quantity + int(request.data.get('stock_quantity')))}
        logger.error(request._full_data)
        return self.update(request, *args, **kwargs)