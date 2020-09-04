from register.models import Signup
from rest_framework import viewsets, permissions
from .serializer import SignupSerializer

# Signup Viewset
class SignupViewSet(viewsets.ModelViewSet):
    permission_classes =[
        permissions.AllowAny
    ]
    serializer_class = SignupSerializer

    def get_queryset(self):
        return self.request.user.register.all()

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)
