from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.models import Products
from .serializers import ProductsSerializer

class ProductsViewSet(ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

    #def list(self, request, *args, **kwargs):
     #   return Response({'teste': 123})

    #@action(methods=['get'], detail=False)
    #def denunciar(self, request):
    #    pass