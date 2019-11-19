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

def author_detail(request):
    return render(request,'author-detail.html')

def admin(request):
    return render(request,'admin.html')


def book_fd(request):
    return render(request,'book-fd.html')

def book_revise(request):
    return render(request,'book-revise.html')

def author_add(request):
    return render(request,'author-add.html')

def author_fd(request):
    return render(request,'author-fd.html')

def author_revise(request):
    return render(request,'author-revise.html')

def user_fd(request):
    return render(request,'user-fd.html')

def about(request):
    return render(request,'about.html')
