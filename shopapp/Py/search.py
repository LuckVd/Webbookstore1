from django.http import HttpResponse, JsonResponse


def search(request):

    #用户表
    user_dict = {}
    user_dict['id'] = ["1", "2", "3", "4"]
    user_dict['user_name'] = ["user1", "user2", "user3", "user4"]
    user_dict['user_password'] = ["password1", "password2", "password3", "password4"]
    user_dict['user_email'] = ["email1", "email2", "email3", "email4"]
    user_dict['user_is_admin'] = ["0", "0", "0", "1"]
    #书籍表
    book_list_dict = {}
    book_list_dict['book_name'] = ["book1", "book2", "book3", "book4", "book1", "book2", "book3", "book4", "book1", "book2",
                              "book3", "book4"]
    book_list_dict['book_price'] = ["100.00", "200.00", "300.00", "400.00", "500.00", "600.00", "700.00", "800.00", "900.00",
                               "1000.00", "1100.00", "1200.00"]
    book_list_dict['book_detail'] = ["This is book1", "This is book2", "This is book3", "This is book4",
                                     "This is book1", "This is book2", "This is book3", "This is book4",
                                     "This is book1", "This is book2", "This is book3", "This is book4"]
    book_list_dict['book_image'] = ["images/best-seller/img-01.jpg", "images/best-seller/img-02.jpg",
                                 "images/best-seller/img-03.jpg", "images/best-seller/img-04.jpg",
                                 "images/best-seller/img-01.jpg", "images/best-seller/img-02.jpg",
                                 "images/best-seller/img-03.jpg", "images/best-seller/img-04.jpg",
                                 "images/best-seller/img-01.jpg", "images/best-seller/img-02.jpg",
                                 "images/best-seller/img-03.jpg", "images/best-seller/img-04.jpg",]
    #作者表
    author_dict = {}
    author_dict['author_name'] = ["author1", "author2", "author3", "author4", "author5",
                           "author6", "author7", "author8", "author9", ]

    table_name = request.POST.get("table")
    if (table_name=='book'):
        return JsonResponse(book_list_dict)
    elif (table_name=='user'):
        return JsonResponse(user_dict)
    elif (table_name == 'author'):
        return JsonResponse(author_dict)
