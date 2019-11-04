from django.http import HttpResponse, JsonResponse


def author_list(request):
    author_dict = {}
    author_dict['name'] = ["author1","author2","author3","author4","author5",
                      "author6","author7","author8","author9",]
    return JsonResponse(author_dict)


def book_list(request):
    book_list_dict = {}
    book_list_dict['name'] = ["book1","book2","book3","book4","book1","book2","book3","book4","book1","book2","book3","book4"]
    book_list_dict['price'] = ["100.00","200.00","300.00","400.00","500.00","600.00","700.00","800.00","900.00","1000.00","1100.00","1200.00"]
    book_list_dict['description'] = ["This is book1","This is book2","This is book3","This is book4",
                                     "This is book1","This is book2","This is book3","This is book4",
                                     "This is book1","This is book2","This is book3","This is book4"]
    book_list_dict['pic_src'] = ["images/best-seller/img-01.jpg","images/best-seller/img-02.jpg",
                                "images/best-seller/img-03.jpg","images/best-seller/img-04.jpg",
                                 "images/best-seller/img-01.jpg", "images/best-seller/img-02.jpg",
                                 "images/best-seller/img-03.jpg", "images/best-seller/img-04.jpg",
                                 "images/best-seller/img-01.jpg", "images/best-seller/img-02.jpg",
                                 "images/best-seller/img-03.jpg", "images/best-seller/img-04.jpg",
                                 ]
    return JsonResponse(book_list_dict)