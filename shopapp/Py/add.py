from django.http import HttpResponse, JsonResponse

def add(request):
    user_dict = {}
    user_dict['user_id'] = ["1", "2", "3", "4"]
    user_dict['user_name'] = ["user1", "user2", "user3", "user4"]
    user_dict['user_password'] = ["password1", "password2", "password3", "password4"]
    user_dict['user_email'] = ["email1", "email2", "email3", "email4"]
    user_dict['user_is_admin'] = ["0", "0", "0", "1"]
    table_name = request.POST.get("table")
    print(table_name)
    user_info = request.POST.get("data")
    print(user_info)
    if table_name=="user":
        return JsonResponse("1",safe=False)