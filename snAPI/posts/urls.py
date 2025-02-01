from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet

router = DefaultRouter()
router.register(r'', PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),
     path('posts/<int:pk>/like/', PostViewSet.as_view({'post': 'like_post'}), name='like-post'),
     path('posts/<int:pk>/comment/', PostViewSet.as_view({'post': 'comment'}), name='comment-post'),
    path('search', include(router.urls)),
]
