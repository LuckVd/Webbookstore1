from shopapp import models
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.core.exceptions import ValidationError
from django.shortcuts import render

def register(request):
    dict = {}

    if request.method == "POST":
        register_form = models.user_info(request.POST)
        username =request.POST['username']
        password = request.POST['password']
        repassword = request.POST['repassword']
        models.user_info.objects.create(username=username,password=password)

