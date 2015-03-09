# -*- coding: utf-8 -*-
from flask import Flask, request
from flask import render_template
import json
import logging
from uuid import uuid1
app = Flask(__name__)
log = app.logger

db = []

@app.route('/')
def start():
    return render_template('index.html') 

@app.route('/messages')
def getmessages():
    return json.dumps(db)

@app.route('/messages', methods=['POST'])
def insertmessage():
    r = request.json
    db.append({'id':str(uuid1()), 'name':r['name'], 'message':r['message']}) 
    app.logger.debug(db)
    return "OK", 200


def makedummy():
    db.append({'id': str(uuid1()), 'name': 'Sanne', 'message': 'Hvor har de billige bleer'})
    db.append({'id': str(uuid1()), 'name': 'Stine', 'message': 'Fakta på kastetvej..'})
    db.append({'id': str(uuid1()), 'name': 'Sanne', 'message': 'NOOO!!!!!'})

if __name__ == "__main__":
    app.debug = True
    makedummy()
    app.run('0.0.0.0', port=4001) 
