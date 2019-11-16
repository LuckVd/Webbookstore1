from django.http import HttpResponse, JsonResponse

book_id = user_id = -1;
cart_list = []
def temp_save(request):
    global book_id , user_id ,cart_list
    data_method=request.POST.get("data_method")
    if data_method=="book_id":
        book_id = request.POST.get("curr_id")
    if data_method=="book_cart":
        cart_list.append(request.POST.get("book_cart_id"))
        cart_list.append(request.POST.get("book_cart_num"))
        print(request.POST.get("book_cart_id"))
        print(request.POST.get("book_cart_num"))


    return JsonResponse("1",safe=False)

def temp_get(request):
    data_method = request.POST.get("data_method")
    if data_method=="book_id":
        return JsonResponse(book_id,safe=False)
