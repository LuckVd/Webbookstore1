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
    if data_method == "book_cart_delete":
        delete_id = int(request.POST.get("delete_id"))
        del cart_list[delete_id:delete_id+2]


    return JsonResponse("1",safe=False)

def temp_get(request):
    data_method = request.POST.get("data_method")
    if data_method =="book_id":
        return JsonResponse(book_id,safe=False)
    if data_method == "book_cart":
        return JsonResponse(cart_list,safe=False)
