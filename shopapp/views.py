import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt, csrf_protect


# Create your views here.


def index(request):
    return render(request, 'index.html')

def shop(request):
    return render(request,'shop.html')

def gallery(request):
    return render(request,'gallery.html')

def author(request):
    return render(request,'author.html')

def about(request):
    return render(request,'about.html')

def cart(request):
    return render(request,'cart.html')

def book_detail(request):
    return render(request,'book-detail.html')