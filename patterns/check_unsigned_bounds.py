import ast

def check_unsigned_bounds(tree, results):
    contains_tt_floor = False
    for node in ast.walk(tree):
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute) and node.func.attr == 'floor' and isinstance(node.func.value, ast.Name) and node.func.value.id == 'tt':
            contains_tt_floor = True
        elif contains_tt_floor and isinstance(node, ast.BinOp) and isinstance(node.op, ast.Sub):
            right_var = node.right.id
            results.append({"bug_desc": f'Unsigned Bounds Error!! When {right_var} is negative, the random function will return unexpected results.', "bug_line": node.lineno})
            print(results)
            break