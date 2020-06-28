from django.urls import path
from .views import *

app_name="tower"
# or  namespace='blog') inside the url to that file


urlpatterns = [
    path('',home,name='home'),

    path('test/add_workers',add_workers,name="test_add_workers"),
    path('test/add_operations',add_operations,name="test_add_operations"),
    path('test/download_operations',download_operations,name="test_download_operations"),
    path('test/download_operations/<int:num>',download_operations,name="test_download_operations"),
    path('test/download_operations/<slug:num>',download_operations,name="test_download_operations"),
    path('test/show_char',show_char,name="test_show_char"),
    path('test',test,name="test"),

    path("engineer/home",engineer_home,name="engineer_home"),
    path('engineer/workers',engineer_workers,name="engineer_workers"),
    path("engineer/foremen",engineer_foremen,name="engineer_foremen"),
    path("engineer/levels",engineer_levels,name="engineer_levels"),
    path("engineer/level/<int:num>",engineer_level,name="engineer_level"),
    path("engineer/level/assign-froeman",assign_foreman,name="assign_foreman"),
    path("engineer/level/remove-foreman/<int:level_num>",remove_foreman,name="remove_foreman"),
    path("engineer/worker/add",add_worker,name="add_worker"),
    path("engineer/worker/edit",edit_worker,name="edit_worker"),
    path("engineer/worker/delete",delete_worker,name="delete_worker"),
    path("engineer/foreman/add",add_foreman,name="add_foreman"),
    path("engineer/foreman/edit",edit_foreman,name="edit_foreman"),
    path("engineer/foreman/delete",delete_foreman,name="delete_foreman"),


    path("operation/delete/<int:id>",delete_operation,name="delete_operation"),
    path("operation/create",create_operation,name="create_operation"),
    path("operation/changeprogress",operation_progress,name="operation_progress"),
    path("operation/changeprogress/worker",operation_progress_worker,name="operation_progress_worker"),



    path("foreman/home",foreman_home,name="foreman_home"),
    path('forman/levels',foreman_levels,name="foreman_levels"),
    path('forman/level/<int:num>',foreman_levels,name="foreman_level"),
    path('forman/workers/<int:type_id>',worker_with_some_type,name="foreman_workers"),
    path('pdf/delete/<int:id>',delete_pdf,name="delete_pdf"),
    path('pdf/create',create_pdf,name="create_pdf"),

    path("worker/home",worker_home,name="worker_home"),

]
