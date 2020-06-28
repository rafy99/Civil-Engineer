from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth import authenticate,login,logout
from accounts.models import User
from django.contrib import messages

# Create your views here.



def login_view(request):
    if request.user.is_authenticated:
        return redirect("/")


    if(request.method=='GET'):
        return render(request,"accounts/login.html")

    email = request.POST['email'];
    password = request.POST['password'];

    try:
        user = User.objects.get(email = email)
        if user.check_password(password):
            login(request,user);
            return redirect("/")
        else:
            messages.add_message(request, messages.INFO, 'wrong password')
            return redirect("/")
    except :
        messages.add_message(request, messages.INFO, "user Dosen't exists ")
        return redirect("/")



def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
        return redirect("/accounts/login")
