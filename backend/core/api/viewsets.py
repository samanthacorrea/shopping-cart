from rest_framework.viewsets import ModelViewSet
from core.models import Products
from .serializers import ProductsSerializer

class ProductsViewSet(ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer