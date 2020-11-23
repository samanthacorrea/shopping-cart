from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework.viewsets import ModelViewSet
from products.models import Products
from .serializers import ProductsSerializer


class ProductsViewSet(ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

    #def list(self, request, *args, **kwargs):
     #   return Response({'teste': 123})

    #def create(self, request, *args, **kwargs):
    #    return super(ProductsViewSet, self).create(self, request, *args, **kwargs)

    #@action(methods=['get'], detail=False)
    #def denunciar(self, request):
    #    pass

    @action(methods=['get'], detail=True)
    def denunciar(self, request, pk=None):
        pass

    @action(methods=['get'], detail=False)
    def teste(self, request):
        pass
