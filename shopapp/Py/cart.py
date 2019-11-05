from django.http import HttpResponse, JsonResponse


def cart_show(request):
    #传给bestsell的数据是4本最火的书信息，包括书名，价格，简介，图片地址
    book_dict = {}

    book_dict['name'] = ["book1","book2","book3","book4","book5","book6","book7","book8"]
    book_dict['author'] = ["author1", "author2", "author3", "author4","author1", "author2", "author3", "author4"]
    book_dict['price'] = ["100.00","200.00","300.00","400.00","100.00","200.00","300.00","400.00"]
    book_dict['description'] = ["This is book1","This is book2","This is book3","This is book4","This is book1","This is book2","This is book3","This is book4"]
    book_dict['pic_src'] = ["images/best-seller/img-01.jpg","images/best-seller/img-02.jpg",
                                "images/best-seller/img-03.jpg","images/best-seller/img-04.jpg",
                                "images/best-seller/img-01.jpg", "images/best-seller/img-02.jpg",
                                "images/best-seller/img-03.jpg", "images/best-seller/img-04.jpg"
                            ]
    book_dict['num']=["1","2","3","4","1","2","3","4"]
    return JsonResponse(book_dict)