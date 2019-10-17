
from shopapp import models
from django.http import HttpResponse
from django.shortcuts import render_to_response

def register(request):
    if request.method == "POST":
        username =request.POST['username']
        password = request.POST['password']
        repassword = request.POST['repassword']
        models.user_info.objects.create(username=username,password=password)


    return HttpResponse(request)