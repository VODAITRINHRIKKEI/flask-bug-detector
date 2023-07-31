import ast

def check_random_error(node, results):
    if isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute):
        if node.func.attr == "rvs" and isinstance(node.func.value, ast.Attribute) and node.func.value.attr == "uniform" and node.func.value.value.id == "stats" and len(node.args) >= 2:
            arg = node.args[1]
            if isinstance(arg,ast.BinOp) and isinstance(arg.op, ast.Sub) and isinstance(arg.op, ast.Sub):
                left = arg.left
                right = arg.right
            if isinstance(left,ast.Name):
                results.append({"bug_desc": f"Warning!! Maybe have bug in handling {left.id} and {right.id} bounds for uniform distribution.", "bug_line": node.lineno})
                results.append({"bug_desc": f"If want handling {left.id} and {right.id} bounds for uniform distribution should be change {left.id} -> {left.id} + 1 ", "bug_line": node.lineno})
            if isinstance(left, ast.BinOp) and isinstance(left.op, ast.Add):
                if(left.right.n == 1):
                    print("ok")