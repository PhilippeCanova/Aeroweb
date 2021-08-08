from django.urls import path
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('accounts/login/', auth_views.LoginView.as_view(template_name='webpro/registration/login.html'), name='loginpro'),
    path('accounts/logout/', auth_views.LogoutView.as_view(template_name='webpro/registration/logged_out.html'), name='logoutpro'),
    path('', views.WebProView, name='indexpro'),
]