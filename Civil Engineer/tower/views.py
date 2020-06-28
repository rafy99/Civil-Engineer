from django.shortcuts import render,HttpResponse,redirect,reverse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from accounts.models import User
from .models import *
from .service import seperate_users,levels_data
from django.core import serializers
import random
from  datetime import datetime,timedelta
import time
from django.db.models import F
from django.contrib import messages
# Create your views here.


@login_required
def home(request):
    if(request.user.is_engineer):
        return engineer_home(request)
    elif(request.user.is_foreman):
        return foreman_home(request)
    elif(request.user.is_worker):
        return worker_home(request)


# some api calls
def get_operations(request,level=None):
    pass

def get_progress(request,level=None):
    pass

def get_workers_progress(request,level=None):
    pass



# -------------------------   Engineer Actions  -------------------------
@login_required
def engineer_home(request):
    if(not request.user.is_engineer):
        return HttpResponse("403 forbidden")
    users = User.objects.all()
    context = seperate_users(users)

    return render(request,'engineer/home.html',context)


@login_required
def engineer_levels(request):
    if(not request.user.is_engineer):
        return HttpResponse("403 forbidden")
    context={}
    context['levels'] = levels_data();
    context['foremen'] = User.objects.filter(is_foreman=True);
    return render(request,'engineer/levels.html',context)

@login_required
def engineer_level(request,num):
    if(not request.user.is_engineer):
        return HttpResponse("403 forbidden")
    level = Level.objects.get(name=num)
    operation_types = Operation_type.objects.filter(level=level)
    return render(request,'engineer/level.html',{'operation_types':operation_types,'level':level})

@login_required
def engineer_workers(request):
    if(not request.user.is_engineer):
        return HttpResponse("403 forbidden")
    workers = User.objects.filter(is_worker = True);
    for i in workers:
        print(i.__dict__)
    return render(request,'engineer/workers.html',{'workers':workers})

@login_required
def engineer_foremen(request):
    if(not request.user.is_engineer):
        return HttpResponse("403 forbidden")
    foremen = User.objects.filter(is_foreman = True);
    print("*"*100,len(foremen))
    return render(request,'engineer/foremen.html',{'foremen':foremen})


@login_required
def remove_foreman(request,level_num):
    if(not request.user.is_engineer):
        return HttpResponse("403 forbidden")
    level = Level.objects.get(name = level_num)
    level.foreman = None
    level.save()
    return redirect(reverse('tower:engineer_levels'))

@login_required
def assign_foreman(request):
    if(not request.user.is_engineer):
        return HttpResponse("403 forbidden")
    if(request.method!='POST'):
        return HttpResponse("forbidden")

    level_num = request.POST['level_num']
    level = Level.objects.get(name=level_num)
    level.foreman_id = request.POST['foreman']
    level.save()


    return redirect(reverse('tower:engineer_levels'))

@login_required
def add_worker(request):
    if(not request.user.is_engineer):
        return HttpResponse("403 forbidden")
    if(request.method=='POST'):
        worker = User()
        if(User.objects.filter(email=request.POST['email'])):
            messages.add_message(request, messages.INFO, 'Email already Exists')
            return redirect(reverse("tower:engineer_workers"))
        worker.username = request.POST['email'];
        worker.email = request.POST['email'];
        worker.is_worker = True
        worker.set_password(request.POST['password'])
        worker.first_name = request.POST['first_name'];
        worker.last_name = request.POST['last_name'];
        worker.type = request.POST['type'];
        worker.save()
        messages.add_message(request, messages.SUCCESS, 'created successfuly')
        return redirect(reverse("tower:engineer_workers"))

    return HttpResponse('forbidden')

@login_required
def edit_worker(request):
    if(not request.user.is_engineer):
        return HttpResponse("403 forbidden")
    if(request.method=='POST'):
        worker = User.objects.get(id=request.POST['id'])
        worker.email = request.POST['email'];
        if request.POST['password']:
            worker.set_password(request.POST['password'])
        worker.first_name = request.POST['first_name'];
        worker.last_name = request.POST['last_name'];
        worker.type = request.POST['type'];
        worker.save()
        return redirect(reverse("tower:engineer_workers"))

    return HttpResponse('forbidden')

@login_required
def delete_worker(request):
    if(not request.user.is_engineer):
        return HttpResponse("403 forbidden")
    if request.method == "POST":
        lis = request.POST.getlist('id[]')
        User.objects.filter(id__in=lis).delete()
        return redirect(reverse("tower:engineer_workers"))

    return HttpResponse('forbidden')


@login_required
def add_foreman(request):
    if(not request.user.is_engineer):
        return HttpResponse("403 forbidden")
    if(request.method=='POST'):
        worker = User()
        if(User.objects.filter(email=request.POST['email'])):
            messages.add_message(request, messages.INFO, 'Email already Exists')
            return redirect(reverse("tower:engineer_foremen"))
        worker.email = request.POST['email'];
        worker.username = request.POST['email'];
        worker.is_foreman = True
        worker.set_password(request.POST['password'])
        worker.first_name = request.POST['first_name'];
        worker.last_name = request.POST['last_name'];
        worker.save()
        messages.add_message(request, messages.SUCCESS, 'created successfuly')
        return redirect(reverse("tower:engineer_foremen"))

    return HttpResponse('forbidden')

@login_required
def edit_foreman(request):
    if(not request.user.is_engineer):
        return HttpResponse("403 forbidden")
    if(request.method=='POST'):
        worker = User.objects.get(id=request.POST['id'])
        worker.email = request.POST['email'];
        if request.POST['password']:
            worker.set_password(password)
        worker.first_name = request.POST['first_name'];
        worker.last_name = request.POST['last_name'];
        worker.save()
        return redirect(reverse("tower:engineer_workers"))

    return HttpResponse('forbidden')

@login_required
def delete_foreman(request):
    if(not request.user.is_engineer):
        return HttpResponse("403 forbidden")
    if request.method == "POST":
        lis = request.POST.getlist('id[]')
        User.objects.filter(id__in=lis).delete()
        return redirect(reverse("tower:engineer_foremen"))

    return HttpResponse('forbidden')


# -------------------------   End Engineer Actions  -------------------------






# -------------------------   Foreman Actions  -------------------------
@login_required
def foreman_home(request):
    if(not request.user.is_foreman):
        return HttpResponse("403 forbidden")

    levels = Level.objects.filter(foreman = request.user);
    context = {"levels":levels}
    return render(request,"foreman/home.html",context);

@login_required
def foreman_levels(request,num):
    if(not request.user.is_foreman):
        return HttpResponse("403 forbidden")
    levels = Level.objects.filter(foreman = request.user);
    level_num = Level.objects.get(name=num)
    operation_types = Operation_type.objects.filter(level=level_num)
    context = {"level_num":level_num.name,'levels':levels,"operation_types":operation_types,"current_level":level_num}
    return render(request,"foreman/level.html",context);

@login_required
def delete_pdf(request,id):
    if(not request.user.is_foreman):
        return HttpResponse("403 forbidden")
    try:
        report = Report.objects.get(id=id).delete()
        return JsonResponse({"message":"deleted successfuly"})
    except  Exception as e:
        return JsonResponse({"message":"fff"})

@login_required
def create_pdf(request):
    if(not request.user.is_foreman):
        return HttpResponse("403 forbidden")
    report = Report()

    report.title = request.POST['title']
    report.file = request.FILES['file']
    report.level_id = request.POST['level']
    report.writer = request.user;
    report.save()
    return redirect("tower:foreman_level",num=request.POST['level']) # soon to be changed

@login_required
def delete_operation(request,id):
    if(not request.user.is_foreman):
        return HttpResponse("403 forbidden")
    try:
        operation = Operation.objects.get(id=id).delete()
        return JsonResponse({"message":"deleted successfuly"})
    except  Exception as e:
        return JsonResponse({"message":"Failed"})

@login_required
def create_operation(request):
    if(not request.user.is_foreman):
        return HttpResponse("403 forbidden")

    operation = Operation()
    operation.description = request.POST['description']
    operation.must_finish = request.POST['must_finish'];
    operation.deadline = request.POST['deadline'];
    operation.worker_id = request.POST['worker'];
    operation.level_id = request.POST['level'];
    operation.type_id = name=request.POST['type'];
    operation.save();
    return redirect("tower:foreman_level",num=request.POST['level']) # soon to be changed
    #operation.

@login_required
def operation_progress(request):

    try:
        operation = operation_progress(request,'foreman')
        return redirect("tower:foreman_level",num=operation.type.level.name) # soon to be changed
        #return JsonResponse({"message":"progress changed"})
    except  Exception as e:
        return JsonResponse({"message":"Failed"})

@login_required
def operation_progress_worker(request):
    try:
        operation = operation_progress(request,'foreman')
        return redirect("tower:worker_home") # soon to be changed
        #return JsonResponse({"message":"progress changed"})
    except  Exception as e:
        return JsonResponse({"message":"Failed"})

    #return JsonResponse({"message":"progress changed"})

@login_required
def operation_progress(request,caller):
    operation = Operation.objects.get(id=request.POST['operation_id'])
    operation.progress = int(request.POST['progress'])
    if(operation.progress == operation.must_finish):
        operation.finished = datetime.now()
    elif(operation.progress < operation.must_finish):
        operation.finished = None
    else:
        raise Exception("")

    operation.save()
    return operation

@login_required
def worker_with_some_type(request,type_id):
    Op = Operation_type.objects.get(id = type_id)
    workers = User.objects.filter(type = Op.allowed).values('id','first_name','last_name')
    return JsonResponse(list(workers),safe=False);






# -------------------------   End Foreman Actions  -------------------------







# -------------------------   Workers Actions  -------------------------
@login_required
def worker_home(request):
    if(not request.user.is_worker):
        return HttpResponse("403 forbidden")
    operations = Operation.objects.filter(worker=request.user,finished=None)
    finished_operations = Operation.objects.filter(worker=request.user).exclude(finished=None)

    context={}
    context['operations'] = operations
    context['finished_operations'] = finished_operations
    return render(request,"worker/home.html",context);


# -------------------------   End Workers Actions  -------------------------



# testing
def download_operations(request,num=None):
    if(num==None):
        operations = Operation.objects.all().values('deadline','finished','level','type',worker_type=F('worker__type'));
        return JsonResponse(list(operations),safe=False);
    else:
        levels = Level.objects.filter(foreman__id=num).values_list('id', flat=True)
        operations = Operation.objects.filter(level__id__in=levels).values('deadline','finished','level','type',worker_type=F('worker__type'));
        return JsonResponse(list(operations),safe=False);



def show_char(request):
    return render(request,"charts/test_3.html");


def add_workers(request):
    for i in range(8):
        user = User()
        user.username = f'new_foreman{i+1}'
        user.email = f'new_foreman@new_foreman.com{i+1}'
        user.first_name = "Foreman"
        user.last_name = str(i+1)
        user.is_foreman = True
        user.set_password('123')
        user.save()
    return HttpResponse("done");


    # for i in range(30):
    #     user = User()
    #     user.username = f'worker_{i+1}'
    #     user.set_password('123')
    #     user.is_worker=True
    #     if(i%3==0):
    #         user.type = 'painter'
    #     elif(i%3==1):
    #         user.type = 'cleaner'
    #     else:
    #         user.type = 'plumber'
    #     user.save()
    # return HttpResponse("done");


def change_workers_names(request):
    names='Ahmed Hossam Khaled Tareq Saeed Fady Osman Mohammed Mostafa Aziz Adel Sherif Islam Sameh Sobhy Hamdy '
    all = User.objects.all()
    names = names.split(" ")
    for user in all:
        user.first_name = random.choice(names)
        user.last_name = random.choice(names)
        user.save()


def test(request):
    return assign_worker(request)



def assign_worker(request):
    counter=1
    operations = Operation.objects.all()
    for op in operations:
        if(op.worker==None):
            workers = User.objects.filter(type = op.type.allowed);
            op.worker = random.choice(workers)
            op.save()
        if(counter%10==0):
            print(counter)

        counter+=1


def mark_finished(request):
    type = Operation_type()
    operations = Operation.objects.all()
    for op in operations:
        if op.finished!=None:
            op.progress = op.must_finish
            op.save()




def add_operation_types(request):
    options=[
        ['painting', "painter"],
        ['testing pipes', "plumber"],
        ['fiting pipes', "plumber"],
        ['clean rooms', "cleaner"],
        ['clean stairs', "cleaner"],
        ['clean bathrooms', "cleaner"],
    ]
    for i in range(6):
        for j in range(10):
            op_type = Operation_type()
            op_type.name = options[i][0]
            op_type.allowed = options[i][1]
            op_type.level_id = (j+1)
            op_type.save()

    return HttpResponse(request,"done");


def add_operations(request):
    operations_types = Operation_type.objects.all()
    counter=1;
    for op_type in operations_types:
        for i in range(3):
            operation = Operation()
            operation.type = op_type
            operation.level = op_type.level
            operation.must_finish = random.randint(1,60)
            random_num = random.randint(20,80)
            operation.deadline = datetime.now() + timedelta(days = random_num)
            if(random.randint(1,7)>4):
                sec = max(0,random_num + random.randint(-20,20))
                operation.finished = datetime.now() + timedelta(days = sec)
            operation.save()
        print(f"Patch {counter}")
        counter+=1


    return HttpResponse("done");
