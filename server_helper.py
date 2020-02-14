from werkzeug.exceptions import HTTPException

class AccessError(HTTPException):
    ''' error class for access'''
    code = 401
    message = 'This is an access error bad request'

class ValueError(HTTPException):
    ''' error class for value'''
    code = 400
    message = 'This is a value error'