import ast

def check_logpow(node, results):
    def is_logwww(node):
        if isinstance(node, ast.FunctionDef):
            if len(node.args.args) == 2:
                low_func_name = node.name
                arg1 = node.args.args[0].arg
                arg2 = node.args.args[1].arg
                if isinstance(node.body[0], ast.Return):
                    if isinstance(node.body[0].value, ast.BinOp):
                        left = node.body[0].value.left
                        right = node.body[0].value.right
                        op = node.body[0].value.op
                        if isinstance(op, ast.Mult) and isinstance(left, ast.Name) and left.id == arg2 and isinstance(right, ast.Call) and isinstance(right.func, ast.Attribute) and right.func.attr == 'log' and isinstance(right.func.value, ast.Name) and right.func.value.id == 'math' and len(right.args) == 1 and isinstance(right.args[0], ast.Name) and right.args[0].id == arg1:
                            check_nan_error(node,low_func_name, results)
        return False
    
    def check_nan_error(node, func_name, results):
        for node in ast.walk(node):
            if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == func_name:
                if isinstance(node.args[0], ast.Name):
                    arg_name = node.args[0].id
                    check_arg_name(node, arg_name, func_name, results)
                elif isinstance(node.args[0], ast.Num):
                    arg_value = arg_name = node.args[0].n
                    if(arg_value == 0):
                        results.append({"bug_desc": f"Function {func_name} called with parameter {arg_name} = {arg_value}!! Ensure {arg_name} is non-zero to get accurate results.", "bug_line": node.lineno})
                break
    
    def check_arg_name(node, arg_name, func_name, results):
        for node in ast.walk(node):
            if isinstance(node, ast.Assign):
                for target in node.targets:
                    if target.id == arg_name:
                        arg_value = ast.literal_eval(node.value)
                        if (arg_value == 0):
                            results.append({"bug_desc": f"Function {func_name} called with parameter {arg_name} = {arg_value}!! Ensure {arg_name} is non-zero to get accurate results.", "bug_line": node.lineno})
                        break
    
    is_logwww(node)
