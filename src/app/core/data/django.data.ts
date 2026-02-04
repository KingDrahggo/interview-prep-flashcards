import { Flashcard } from '../models/flashcard.model';

export const DJANGO_CARDS: Flashcard[] = [
  // ═══════════════════════════════════════════════════════
  // CORE CONCEPTS
  // ═══════════════════════════════════════════════════════
  {
    id: 'django-1',
    question: 'What is Django and what are its key features?',
    answer: 'Django is a high-level Python web framework. Features: ORM, admin panel, URL routing, templating, auth system, security built-in. Follows MTV pattern (Model-Template-View).',
    codeExample: `# Django Project Structure
myproject/
├── manage.py           # CLI utility
├── myproject/
│   ├── settings.py     # Configuration
│   ├── urls.py         # Root URL routing
│   └── wsgi.py         # WSGI entry point
└── myapp/
    ├── models.py       # Database models
    ├── views.py        # Request handlers
    ├── urls.py         # App URL routing
    ├── admin.py        # Admin configuration
    └── templates/      # HTML templates

# Quick start commands
django-admin startproject myproject
python manage.py startapp myapp
python manage.py runserver
python manage.py makemigrations
python manage.py migrate`,
    technology: 'django',
    category: 'Core',
    difficulty: 'easy',
    version: 'Django 5.0',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'django-2',
    question: 'How do Django models and ORM work?',
    answer: 'Models define database schema as Python classes. ORM maps models to tables. Use Field types for columns. QuerySet API for database operations.',
    codeExample: `from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.email

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    tags = models.ManyToManyField('Tag')

# Common field types
CharField, TextField, IntegerField, FloatField,
BooleanField, DateTimeField, EmailField, URLField,
ForeignKey, ManyToManyField, OneToOneField`,
    technology: 'django',
    category: 'Models',
    difficulty: 'medium',
    version: 'Django 4.0+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'django-3',
    question: 'What are Django QuerySet operations?',
    answer: 'QuerySets are lazy collections of model instances. Chain methods for filtering/ordering. Evaluated on iteration, slicing, or calling list(). Common: filter, exclude, get, order_by.',
    codeExample: `# QuerySet operations
users = User.objects.all()
active_users = User.objects.filter(is_active=True)
user = User.objects.get(id=1)  # Single object or raises

# Chaining
users = User.objects.filter(
    is_active=True
).exclude(
    email__endswith='@spam.com'
).order_by('-created_at')[:10]

# Field lookups
User.objects.filter(name__icontains='john')  # Case-insensitive
User.objects.filter(age__gte=18)             # Greater or equal
User.objects.filter(email__endswith='.com')  # String ends with
User.objects.filter(created_at__year=2024)   # Date part

# Aggregation
from django.db.models import Count, Avg, Sum
User.objects.aggregate(avg_age=Avg('age'))

# Annotate
Post.objects.annotate(
    comment_count=Count('comments')
).filter(comment_count__gt=5)

# Select related (avoid N+1)
posts = Post.objects.select_related('author')  # FK
posts = Post.objects.prefetch_related('tags')  # M2M`,
    technology: 'django',
    category: 'ORM',
    difficulty: 'medium',
    version: 'Django 4.0+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'django-4',
    question: 'How do Django views work (FBV vs CBV)?',
    answer: 'Function-Based Views (FBV): simple functions taking request, returning response. Class-Based Views (CBV): reusable, built-in generics like ListView, CreateView. Both are valid.',
    codeExample: `from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.generic import ListView, DetailView, CreateView

# Function-Based View
def user_list(request):
    users = User.objects.all()
    return render(request, 'users/list.html', {'users': users})

def user_detail(request, pk):
    user = get_object_or_404(User, pk=pk)
    return render(request, 'users/detail.html', {'user': user})

# Class-Based View
class UserListView(ListView):
    model = User
    template_name = 'users/list.html'
    context_object_name = 'users'
    paginate_by = 20

class UserDetailView(DetailView):
    model = User
    template_name = 'users/detail.html'

class UserCreateView(CreateView):
    model = User
    fields = ['name', 'email']
    success_url = '/users/'

# API View (JsonResponse)
def api_users(request):
    users = list(User.objects.values('id', 'name', 'email'))
    return JsonResponse({'users': users})`,
    technology: 'django',
    category: 'Views',
    difficulty: 'medium',
    version: 'Django 4.0+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'django-5',
    question: 'How does URL routing work in Django?',
    answer: 'urls.py maps URL patterns to views. Use path() for simple routes, re_path() for regex. Include app URLs with include(). Capture parameters with <type:name>.',
    codeExample: `from django.urls import path, include
from . import views

# App URLs (myapp/urls.py)
urlpatterns = [
    path('', views.home, name='home'),
    path('users/', views.user_list, name='user-list'),
    path('users/<int:pk>/', views.user_detail, name='user-detail'),
    path('users/<slug:username>/', views.user_by_username),
    
    # Class-based views
    path('posts/', PostListView.as_view(), name='post-list'),
]

# Root URLs (project/urls.py)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls')),
    path('api/', include('api.urls')),
]

# Using URL names in templates
{% url 'user-detail' pk=user.id %}

# In views
from django.urls import reverse
reverse('user-detail', kwargs={'pk': 1})  # '/users/1/'`,
    technology: 'django',
    category: 'Routing',
    difficulty: 'easy',
    version: 'Django 4.0+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'django-6',
    question: 'What is Django REST Framework (DRF)?',
    answer: 'DRF extends Django for building REST APIs. Features: serializers, viewsets, routers, authentication, permissions, throttling. Industry standard for Django APIs.',
    codeExample: `from rest_framework import serializers, viewsets, routers
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'created_at']
        read_only_fields = ['created_at']

# ViewSet (CRUD automatically)
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

# Router (auto-generates URLs)
router = routers.DefaultRouter()
router.register('users', UserViewSet)

# urls.py
urlpatterns = [
    path('api/', include(router.urls)),
]

# Function-based API view
@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)`,
    technology: 'django',
    category: 'REST API',
    difficulty: 'medium',
    version: 'DRF 3.14+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'django-7',
    question: 'How does Django authentication work?',
    answer: 'Django has built-in auth: User model, login/logout views, password hashing, sessions. Extend with AbstractUser or AbstractBaseUser. DRF adds token/JWT auth.',
    codeExample: `from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

# Authenticate and login
def login_view(request):
    user = authenticate(
        request,
        username=request.POST['username'],
        password=request.POST['password']
    )
    if user is not None:
        login(request, user)
        return redirect('home')
    return render(request, 'login.html', {'error': 'Invalid'})

# Require login
@login_required
def dashboard(request):
    return render(request, 'dashboard.html')

# Custom User model
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=20, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True)

# settings.py
AUTH_USER_MODEL = 'myapp.CustomUser'

# DRF Token Auth
from rest_framework.authtoken.models import Token
token = Token.objects.create(user=user)`,
    technology: 'django',
    category: 'Authentication',
    difficulty: 'medium',
    version: 'Django 4.0+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'django-8',
    question: 'What is Django middleware?',
    answer: 'Middleware processes requests/responses globally. Runs in order for requests, reverse for responses. Built-in: security, sessions, auth, CSRF. Create custom middleware.',
    codeExample: `# settings.py - Middleware order matters!
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'myapp.middleware.CustomMiddleware',  # Custom
]

# Custom middleware (class-based)
class RequestTimingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        import time
        start = time.time()
        
        response = self.get_response(request)
        
        duration = time.time() - start
        response['X-Request-Duration'] = str(duration)
        return response

# Custom middleware (function-based)
def simple_middleware(get_response):
    def middleware(request):
        # Before view
        response = get_response(request)
        # After view
        return response
    return middleware`,
    technology: 'django',
    category: 'Middleware',
    difficulty: 'medium',
    version: 'Django 4.0+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'django-9',
    question: 'How do you handle forms in Django?',
    answer: 'Django forms handle validation, rendering, and cleaning. Forms from models with ModelForm. Use form.is_valid(), form.cleaned_data. CSRF protection automatic.',
    codeExample: `from django import forms
from django.core.exceptions import ValidationError

# Basic Form
class ContactForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)
    
    def clean_email(self):
        email = self.cleaned_data['email']
        if email.endswith('@spam.com'):
            raise ValidationError('Invalid email domain')
        return email

# ModelForm (from model)
class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name', 'email']
        widgets = {
            'email': forms.EmailInput(attrs={'class': 'form-control'})
        }

# View usage
def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Process form.cleaned_data
            send_email(form.cleaned_data)
            return redirect('success')
    else:
        form = ContactForm()
    return render(request, 'contact.html', {'form': form})

# Template
<form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Send</button>
</form>`,
    technology: 'django',
    category: 'Forms',
    difficulty: 'medium',
    version: 'Django 4.0+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'django-10',
    question: 'How do Django signals work?',
    answer: 'Signals allow decoupled apps to receive notifications. Common: post_save, pre_delete, request_finished. Connect receivers to signals. Good for side effects.',
    codeExample: `from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.contrib.auth.models import User

# Method 1: Decorator
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

# Method 2: Manual connection
def log_user_login(sender, request, user, **kwargs):
    print(f"User {user.email} logged in")

from django.contrib.auth.signals import user_logged_in
user_logged_in.connect(log_user_login)

# Custom signal
from django.dispatch import Signal

order_completed = Signal()  # Define signal

# Send signal
order_completed.send(sender=Order, order=order)

# Receive signal
@receiver(order_completed)
def handle_order_completed(sender, order, **kwargs):
    send_confirmation_email(order)`,
    technology: 'django',
    category: 'Signals',
    difficulty: 'hard',
    version: 'Django 4.0+',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
