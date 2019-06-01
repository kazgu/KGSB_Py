from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import Util
import json
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@csrf_exempt

def index(request):
    context= {}
    context['hello'] = 'Build By Kazgu!'
    return render(request, 'index.html')
@csrf_exempt
def getData(request):
    Entityname=''
    if request.method == "GET":
        Entityname = request.GET.get('entity')
    nodes,edges=Util.getRelation(Entityname) 
    jsondata={"nodes":nodes,"edges":edges}
    return HttpResponse(json.dumps(jsondata),content_type="application/json")
from django.http import FileResponse  
def download(request):
    file=open('static/data/data.csv','rb')
    response =FileResponse(file)
    response['Content-Type']='application/octet-stream'
    response['Content-Disposition']='attachment;filename="data.csv"'
    return response
def file_extension(path): 
    return os.path.splitext(path)[1] 
import time
def submit(request):
    context= {}
    if request.method == 'POST':# 获取对象
        obj = request.FILES.get('fileUpload')
        extention=file_extension(obj.name)
        filename='data'+extention
        try:
            if obj :
                print('--------------------------------')
                import os
                filepath=os.path.join(BASE_DIR, 'static', 'file', filename)   
                f = open(filepath, 'wb')
                for chunk in obj.chunks():
                    f.write(chunk)
                f.close()
            else:
                context['msg']='上传错误，请检查文件'
        except:
            context['msg']='上传错误，请检查文件'
    return render(request, 'index.html', context)