from django.urls import path
from .views import RegisterView, UserView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('user/', UserView.as_view()),
]
