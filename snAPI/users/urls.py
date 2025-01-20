from django.urls import path
from .views import UserList, RegisterView, LoginView, UserDetailView
urlpatterns = [
    path('users/', UserList.as_view(), name='user-list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
]
