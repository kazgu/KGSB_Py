import os
import pandas as pd

def getRelation(EnName):
    datarelation=pd.read_csv('static/file/data.csv')
    edges='['
    nodedict=dict()
    nodelist=[]
    for _, row in datarelation.iterrows():
        if EnName!='' and  row['source']!=EnName and row['target']!=EnName:
            continue
        if row['source'] not in nodedict:
            item={}
            item['name']=row['source']
            item['Etype']=row['sourcetype']
            nodelist.append(item)
            nodedict[row['source']]=len(nodelist)
        if row['target'] not in nodedict:
            item={}
            item['name']=row['target']
            item['Etype']=row['targettype']
            nodelist.append(item)
            nodedict[row['target']]=len(nodelist)
        edges+="{source: %d, target: %d,relation: \"%s\"},"%(nodedict[row['source']]-1,nodedict[row['target']]-1,row['relation'])
    edges+=']' 
    edges=edges.replace(',]',']')
    print(nodelist)
    return [nodelist,edges]