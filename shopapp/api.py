from django.shortcuts import render
from shopapp import models
from django.http import HttpResponse
import json
from django.core import serializers

def add(request):
    if request.method=="POST":
        tablename=request.POST.get("table")
        data = request.POST.get("data")
        data = json.loads(data)
        if tablename == "user":
            models.user.objects.create(**data)
        if tablename == "book":
            models.book.objects.create(**data)
        if tablename == "author":
            models.author.objects.create(**data)
        if tablename == "orders":
            models.orders.objects.create(**data)
        if tablename == "addressee":
            models.addressee.objects.create(**data)
        if tablename == "orderbook":
            models.orderbook.objects.create(**data)
        return HttpResponse("1")

    else:
        return HttpResponse("0")

def delete(request):
    if request.method == "POST":
        tablename=request.POST.get("table")
        id = request.POST.get("id")

        if tablename=="user":
            print(tablename, id)
            models.user.objects.filter(id=id).delete()
        if tablename=="book":
            models.book.objects.filter(id=id).delete()
        if tablename=="author":
            models.author.objects.filter(id=id).delete()
        if tablename=="orders":
            models.orders.objects.filter(id=id).delete()
        if tablename=="addressee":
            models.addressee.objects.filter(id=id).delete()
        if tablename=="orderbook":
            models.orderbook.objects.filter(id=id).delete()
        return HttpResponse("1")

    else: return HttpResponse("0")

def update(request):
    if request.method == "POST":
        tablename = request.POST.get("table")
        id = request.POST.get("id")
        data = request.POST.get("data")
        data = json.loads(data)
        if tablename == "user":
            models.user.objects.filter(id=id).update(**data)
        if tablename == "book":
            models.book.objects.filter(id=id).update(**data)
        if tablename == "author":
            models.author.objects.filter(id=id).update(**data)
        if tablename == "orders":
            models.orders.objects.filter(id=id).update(**data)
        if tablename == "addressee":
            models.addressee.objects.filter(id=id).update(**data)
        if tablename == "orderbook":
            models.orderbook.objects.filter(id=id).update(**data)

        return HttpResponse("1")

    else:
        return HttpResponse("0")


def search(request):
    if request.method == "POST":
        tablename=request.POST.get("table")
        res = ''

        if tablename == "user":
            if(request.POST.get("type") == "id"):
                data = request.POST.get("data")
                res = serializers.serialize("json", models.user.objects.filter(id=data))
            else:
                res = serializers.serialize("json", models.user.objects.all())
            print(res)
        if tablename == "book":
            if(request.POST.get("type") == "id"):
                data = request.POST.get("data")
                res = serializers.serialize("json", models.book.objects.filter(id=data))
            else:
                res = serializers.serialize("json", models.book.objects.all())
        if tablename == "author":
            if(request.POST.get("type") == "name"):
                data = request.POST.get("data")
                res = serializers.serialize("json", models.author.objects.filter(author_name=data))
            elif(request.POST.get("type") == "id"):
                id = request.POST.get("data")
                res = serializers.serialize("json", models.author.objects.filter(id=data))
            else:
                res = serializers.serialize("json", models.author.objects.all())
        if tablename == "orders":
            res = serializers.serialize("json", models.orders.objects.all())
        if tablename == "addressee":
            res = serializers.serialize("json", models.addressee.objects.all())
        if tablename == "orderbook":
            res = serializers.serialize("json", models.orderbook.objects.all())
        return HttpResponse(res)
    else:
        return HttpResponse("0")