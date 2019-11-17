from django.shortcuts import render
from shopapp import models
from django.http import HttpResponse , JsonResponse
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
                #res = serializers.serialize("json", models.user.objects.filter(id=data))
                res = user_to_json(models.user.objects.filter(id=data))
            else:
            #   res = serializers.serialize("json", models.user.objects.all())
                res = user_to_json(models.user.objects.all())

        if tablename == "book":
            if(request.POST.get("type") == "id"):
                data = request.POST.get("data")
               # res = serializers.serialize("json", models.book.objects.filter(id=data))
                res = book_to_json(models.book.objects.filter(id=data))
            else:
              #  res = serializers.serialize("json", models.book.objects.all())
                res = book_to_json( models.book.objects.all())

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
        return JsonResponse(res,safe=False)
    else:
        return HttpResponse("0")

def book_to_json(book_table):
    list_book_id = []
    list_book_name = []
    list_book_author = []
    list_book_discribe = []
    list_book_price = []
    list_book_sales = []
    list_book_stock = []
    list_book_detail = []
    list_book_image = []
    for book in book_table:
        list_book_id.append(book.id)
        list_book_name.append(book.book_name)
        list_book_author.append(book.book_author)
        list_book_discribe.append(book.book_discribe)
        list_book_price.append(book.book_price)
        list_book_sales.append(book.book_sales)
        list_book_stock.append(book.book_stock)
        list_book_detail.append(book.book_detail)
        list_book_image.append(book.book_image)
    data = {'id': list_book_id,
            'book_name':list_book_name,
            'book_author':list_book_author,
            'book_describe':list_book_discribe,
            'book_price':list_book_price,
            'book_sales':list_book_sales,
            'book_stock':list_book_stock,
            'book_detail':list_book_detail,
            'book_image':list_book_image}
    return data


def user_to_json(user_table):
    list_user_id = []
    list_user_name = []
    list_user_password = []
    list_user_email = []
    list_user_is_admin =[]
    for user in user_table:
        list_user_id.append(user.id)
        list_user_name.append(user.user_name)
        list_user_password.append(user.user_password)
        list_user_email.append(user.user_email)
        list_user_is_admin.append(user.user_is_admin)
    data ={'id':list_user_id,
           'user_name':list_user_name,
           'user_password':list_user_password,
           'user_email':list_user_email,
           'user_is_admin':list_user_is_admin}
    return data


