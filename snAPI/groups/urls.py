from django.urls import path
from .views import GroupListCreateView, GroupDetailView, AddMemberView, RemoveMemberView, GroupMembersView

urlpatterns = [
    path('', GroupListCreateView.as_view(), name='group-list-create'),
    path('<int:pk>/', GroupDetailView.as_view(), name='group-detail'),
    path('<int:pk>/add-member/', AddMemberView.as_view(), name='add-member'),
    path('<int:pk>/remove-member/', RemoveMemberView.as_view(), name='remove-member'),
    path('<int:pk>/group-member/', GroupMembersView.as_view(), name='group-member'),
]
