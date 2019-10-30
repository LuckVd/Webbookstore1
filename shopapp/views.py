import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt, csrf_protect


# Create your views here.


def index(request):
    print("right1")
    dict={}
    dict['register_message1'] = '注册前请阅读'
    dict['register_message2'] = '用户须知'
    return render(request, 'index.html',dict)

def shop(request):
    return render(request,'shop.html')

