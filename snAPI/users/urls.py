from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import UserList, RegisterView, LoginView, UserDetailView, UserViewSet

router = DefaultRouter()
router.register(r'', UserViewSet)


urlpatterns = [
    path('users/', UserList.as_view(), name='user-list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    # path('search/', UserProfileViewSet, name='user-search'),
    path('search', include(router.urls)),
]
