from django.http import HttpResponse, JsonResponse

def temp_save(request):
    global book_id , user_id
    data_method=request.POST.get("data_method")
    if data_method=="book_id":
        book_id = request.POST.get("curr_id")
    elif data_method=="user_id":
        user_id = request.POST.get("user_id")
        print(user_id)
    return JsonResponse("1",safe=False)

def temp_get(request):
    data_method = request.POST.get("data_method")
    if data_method=="book_id":
        return JsonResponse(book_id,safe=False)
    elif data_method=="user_id":
        return JsonResponse(user_id,safe=False)