from flask_restful import Api, Resource, reqparse

class CreatePatterns(Resource):
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "create pattern"
      }

  def post(self):
    print("post")