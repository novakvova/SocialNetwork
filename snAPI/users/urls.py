from django.urls import path
from .views import UserList, RegisterView, LoginView
urlpatterns = [
    path('users/', UserList.as_view(), name='user-list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
