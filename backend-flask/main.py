import flask as f
import psycopg2 as pg
from json import dumps
from login import Register,Login

app = f.Flask('__main__')

@app.route('/')
def myIndex():
    
    return f.render_template("index.html",token="Hello Flask + React!")

@app.route('/auth/login', methods=['POST'])
def post_login():
    username = f.request.form.get('email')
    password = f.request.form.get('password')
    user_logged_in = Login(username,password)




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

if __name__ == "__main__":
    app.run(debug=True)    
