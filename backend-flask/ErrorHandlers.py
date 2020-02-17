from werkzeug.exceptions import HTTPException


class LoginErrorHttp(HTTPException):
    """ Error class for invalid values """
    code = 401
    description = "Invalid user or password"

class RegisterErrorHttp(HTTPException):
    code = 401
    description = "Email registered, forgot password?"
app.config['TRAP_HTTP_EXCEPTIONS'] = True

class ValueErrorHttp(HTTPException):
    code = 400
    description = "invalid input data try again"