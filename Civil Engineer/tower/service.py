from .models import Operation,Level
from django.db.models import Count,Sum,When,Case,F

def seperate_users(users):
    # context['plumbers']  =len(User.objects.filter(type="plumber"))
    # context['painters'] = len(User.objects.filter(type="painter"))
    # context['cleaners'] = len(User.objects.filter(type="cleaner"))
    # context['foremen'] = len(User.objects.filter(is_foreman=True))

    context = {"plumbers":0,"painters":0,"cleaners":0,"foremen":0}
    adding = {'plumber':"plumbers","painter":"painters","cleaner":"cleaners"}

    for j in users:
        if(j.is_foreman):
            context["foremen"]+=1
        elif(j.is_worker):
            context[adding[j.type]]+=1

    return context

def levels_data():

    levels= Operation.objects.values('level__name',foreman_name=F('level__foreman__username'),foreman_id=F('level__foreman__id')).annotate(
    cleaners = Count(Case(When(worker__type='cleaner',then=1))),
    plumbers = Count(Case(When(worker__type='plumber',then=1))),
    painters = Count(Case(When(worker__type='painter',then=1))),
    prog = Sum('progress'),
    fin = Sum('must_finish')
    )

    return levels






# for i in Operation.objects.values('level__name').annotate(Sum('progress')):
#     print(i)
#
# {'level__name': 1, 'progress__sum': 16}
# {'level__name': 2, 'progress__sum': 0}
# {'level__name': 3, 'progress__sum': 0}
# {'level__name': 4, 'progress__sum': 0}
# {'level__name': 5, 'progress__sum': 0}
# {'level__name': 6, 'progress__sum': 0}
# {'level__name': 7, 'progress__sum': 9}
# {'level__name': 8, 'progress__sum': 0}
# {'level__name': 9, 'progress__sum': 0}
# {'level__name': 10, 'progress__sum': 0}


#
# for i in Operation.objects.values('type__name','level__name').annotate(prog = Sum('progress'),mu = Sum('must_finish')):
#   print(i)
#
# {'type__name': 'cleaning bathrooms', 'level__name': 1, 'prog': 0, 'mu': 102}
# {'type__name': 'cleaning bathrooms', 'level__name': 2, 'prog': 0, 'mu': 162}
# {'type__name': 'cleaning bathrooms', 'level__name': 3, 'prog': 0, 'mu': 128}
# {'type__name': 'cleaning bathrooms', 'level__name': 4, 'prog': 0, 'mu': 134}
# {'type__name': 'cleaning bathrooms', 'level__name': 5, 'prog': 0, 'mu': 114}
# {'type__name': 'cleaning bathrooms', 'level__name': 6, 'prog': 0, 'mu': 187}
# {'type__name': 'cleaning bathrooms', 'level__name': 7, 'prog': 4, 'mu': 60}
# {'type__name': 'cleaning bathrooms', 'level__name': 8, 'prog': 0, 'mu': 84}
# {'type__name': 'cleaning bathrooms', 'level__name': 10, 'prog': 0, 'mu': 175}
# {'type__name': 'cleaning rooms', 'level__name': 1, 'prog': 0, 'mu': 25}
# {'type__name': 'cleaning rooms', 'level__name': 2, 'prog': 0, 'mu': 19}
# {'type__name': 'cleaning rooms', 'level__name': 3, 'prog': 0, 'mu': 55}
