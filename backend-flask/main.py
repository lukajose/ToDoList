import flask as f
from json import dumps
from database import DBElephant
import datetime as dt
from werkzeug.exceptions import HTTPException


app = f.Flask(__name__)


class ValueErrorHttp(HTTPException):
    """ Error class for invalid values """
    code = 400
    message = "Invalid input value"
app.config['TRAP_HTTP_EXCEPTIONS'] = True

def defaultHandler(err):
    response = err.get_response()
    response.data = dumps({
        "code": err.code,
        "name": "System error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response
app.register_error_handler(ValueErrorHttp,defaultHandler)


@app.route('/auth/login', methods=['POST'])
def post_login():
    email = f.request.form.get('email')
    password = f.request.form.get('password')
    db = DBElephant()
    print(email)
    db.query("""select u_id,hash_password from users where email like '{}';""".format(email))
    u_id,password_db = db.fetch_one()
    db.close()
    #check if passwords match if they do give token
    if(password == password_db):
        print('passwords match cool! pw:', password,' pdb:',password_db)
        return dumps({'u_id':u_id,'token': 'allgoodvalidtoken'})
    else:
        raise ValueErrorHttp
    
    
@app.route('/auth/register', methods=['POST'])
def post_register():
    # Get all the data sent by client
    email = f.request.form.get('email')
    password = f.request.form.get('password')
    name_first = f.request.form.get('name_first')
    name_last = f.request.form.get('name_last')
    day_registered  = dt.datetime.now()
    #Get day today
    str_day = day_registered.strftime("%Y-%m-%d")
    #open database connection
    db = DBElephant()
    #look for existing user
    db.query("""select u_id from users where email like 'lukajosegamulin@outlook.com';""")
    u_id, = db.fetch_one()
    if(u_id):
        return dumps({'u_id':u_id,'token':'already registered!'})
    else:
        print('enters !')
        db.query("""insert into Users values (1,'{}','{}','{}','{}',ARRAY['token1'],1,'{}')""".format(name_first,name_last,email,password,str_day))
        print(f"email:{email},password:{password},name_first:{name_first},name_last:{name_last}")
        db.close_commit()
        return dumps({'u_id':'done!','token': 'check db'})
"""


    return dumps(login.auth_login(username, password))

@app.route('/auth/logout', methods=['POST'])
def post_logout():
    token = f.request.form.get('token')
    return dumps(login.auth_logout(token))

@app.route('/auth/register', methods=['POST'])
def post_register():
    email = f.request.form.get('email')
    password = f.request.form.get('password')
    name_first = f.request.form.get('name_first')
    name_last = f.request.form.get('name_last')
    return dumps(login.auth_register(email, password, name_first, name_last))

@app.route('/auth/passwordreset/f.request', methods=['POST'])
def post_auth_passwordreset_f.request():
    mail = Mail(app)
    email = f.request.form.get('email')
    #returns a valid message object if user has not send one already
    #and if its a valid email in the slackr app
    msg = login.auth_passwordreset_f.request(email)
    if msg:
        try:
            mail.send(msg)
            return dumps({})
        except Exception as e:
            return sendError(e)

@app.route('/auth/passwordreset/reset', methods=['POST'])
def post_auth_passwordreset_reset():
    reset_code = f.request.form.get('reset_code') 
    new_password = f.request.form.get('new_password')
    return dumps(login.auth_passwordreset_reset(reset_code, new_password))
"""
if __name__ == "__main__":
    app.run(debug=True)    
