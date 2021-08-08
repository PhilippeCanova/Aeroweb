from django.urls import path
from django.contrib.auth import views as auth_views

from myproject.apps.core.views import update_profile
from . import views

urlpatterns = [
    path('accounts/login/', auth_views.LoginView.as_view(template_name='webvfr/registration/login.html'), name='loginvfr'),
    path('accounts/logout/', auth_views.LogoutView.as_view(template_name='webvfr/registration/logged_out.html'), name='logoutvfr'),
    
    path('user/update/', update_profile, name='updatevfr'),
    
    path('', views.WebVFRView, name='indexvfr'),
]