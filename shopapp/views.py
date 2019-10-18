from django.shortcuts import render

# Create your views here.


def index(request):
    dict={}
    dict['register_message1'] = '注册前请阅读'
    dict['register_message2'] = '用户须知'
    return render(request, 'index.html',dict)
