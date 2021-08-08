from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required


@login_required(login_url='/web/public/accounts/login/')
def WebVFRView(request):
    return render(request, 'webvfr/index.html')