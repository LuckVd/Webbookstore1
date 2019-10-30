from django.http import HttpResponse, JsonResponse


def bestsell(request):
    #传给bestsell的数据是4本最火的书信息，包括书名，价格，简介，图片地址
    bestsell_dict = {}
    bestsell_dict['name'] = ["book1","book2","book3","book4"]
    bestsell_dict['price'] = ["100.00","200.00","300.00","400.00"]
    bestsell_dict['description'] = ["This is book1","This is book2","This is book3","This is book4"]
    bestsell_dict['pic_src'] = ["images/best-seller/img-01.jpg","images/best-seller/img-02.jpg",
                                "images/best-seller/img-03.jpg","images/best-seller/img-04.jpg"]
    print("right2")
    return JsonResponse(bestsell_dict)
   # return  HttpResponse("hello")