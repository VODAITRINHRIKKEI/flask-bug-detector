from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
# from api.HelloApiHandler import HelloApiHandler
from api.SourceCodeHandler import SourceCodeHandler
from api.CreatePatterns import CreatePatterns
app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(SourceCodeHandler, '/flask/source')
api.add_resource(CreatePatterns, '/flask/create')