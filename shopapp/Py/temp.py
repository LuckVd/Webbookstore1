from django.http import HttpResponse, JsonResponse

def temp_save(request):
    global curr_id
    curr_id =request.POST.get("curr_id")
    return JsonResponse("1",safe=False)

def temp_get(request):
    print(curr_id)
    return JsonResponse(curr_id,safe=False)