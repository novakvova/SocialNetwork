from django.urls import include, path
from .views import  AddMemberView, RemoveMemberView, GroupMembersView, GroupViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', GroupViewSet, basename='group')

urlpatterns = router.urls + [
    path('<int:pk>/add-member/', AddMemberView.as_view(), name='add-member'),
    path('<int:pk>/remove-member/', RemoveMemberView.as_view(), name='remove-member'),
    path('<int:pk>/group-member/', GroupMembersView.as_view(), name='group-member'),
    path('search', include(router.urls)),
]
