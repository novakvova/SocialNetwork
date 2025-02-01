from django.shortcuts import render
from django.http import JsonResponse
from users.models import UserProfile
from groups.models import Group
from posts.models import Post
from .serializers import UserSerializer, GroupSerializer, PostSerializer

def search(request):
    query = request.GET.get('q', '')
    print(query)
    if not query:
        return JsonResponse({'error': 'Query parameter is required'}, status=400)
    
    users = UserProfile.objects.filter(username__icontains=query)
    # groups = Group.objects.filter(name__icontains=query)
    # posts = Post.objects.filter(content__icontains=query)
    
    return JsonResponse({
        'users': UserSerializer(users, many=True).data,
        # 'groups': GroupSerializer(groups, many=True).data,
        # 'posts': PostSerializer(posts, many=True).data,
    })
