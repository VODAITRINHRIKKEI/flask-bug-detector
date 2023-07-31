from flask import request
from flask_restful import Api, Resource, reqparse
import ast
from bug_finder import BugFinderVisitor

class SourceCodeHandler(Resource):
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "Source Code"
      }

  def post(self):
    source_code = request.json['sourceCode']
    tree = ast.parse(source_code)
    checker = BugFinderVisitor()
    checker.visit(tree)
    results = checker.get_results()

    return results