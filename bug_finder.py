import ast
import os
import importlib
                
class BugFinderVisitor(ast.NodeVisitor):
    def __init__(self):
        self.results = []
        self.patterns = []

        # Lấy đường dẫn đến thư mục chứa các file và function
        patterns_path = os.path.join(os.path.dirname(__file__), 'patterns')

        # Import toàn bộ các file trong thư mục patterns
        for file_name in os.listdir(patterns_path):
            # Lấy tên của module và kiểm tra xem nó có phải là file Python không
            module_name, ext = os.path.splitext(file_name)
            if ext == '.py':
                module = importlib.import_module(f'patterns.{module_name}')
                function_list = [getattr(module, func) for func in dir(module) if callable(getattr(module, func))]
                # Lưu danh sách các hàm vào biến self.patterns
                self.patterns.extend(function_list)

        # In ra tên của các hàm trong thư mục patterns
        print('Các hàm trong thư mục patterns:')
        for func in self.patterns:
            print(func.__name__)

    def visit_Call(self, node):
        # Thực thi các hàm trong self.patterns theo thứ tự mong muốn
        for func in self.patterns:
            func(node, self.results)

    def get_results(self): 
        return self.results
