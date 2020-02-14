import sys
import time
import hashlib
import jwt
from flask_mail import Message
from database import DBElephant
from credentials import secret
import server_helper as httperror
'''========== Login Exclusive Helper Functions =============='''


class Register():
    def __init__(self,email,password,permission=1):
        #check if not already in database
        db = DBElephant()
        db.query('select * from users where email ilike {}'.format(email))
        is_registered, = db.fetch_one() #returns a tuple
        if(is_registered):
            #do not let another registration
            db.close()
            raise ValueError
        else:
            self._email = email
            self._password = password
            #a user has different types of permissions
            self._permission = permission
            db.close()


    def hash_password(self,password):
        ''' hashing a given string '''
        return hashlib.sha256(password.encode()).hexdigest()

    def set_user_password(self):
        ''' set user's password using '''
        db = DBElephant()
        db.query("select count(*) from users")
        user_count, = db.fetch_one()
        db.query("INSERT INTO TABLE {} {} {}".format(user_count,self._email,self.hash_password(self._password)))
        db.close_commit()





# =============== This will be Login =====



class Login():

    def __init__(self,user,password):
        #check if not already in database
        db = DBElephant()
        db.query('select * from users where email ilike "{}"'.format(user))
        is_registered, = db.fetch_one()
        if(is_registered):
            #all good
            db.close()
        else:
            db.close()
            print('nothing yet!')
            

        
    def generateToken(self,email):
        ''' generate token for a user'''
        global secret
        payload = {
            'payload':email,
            'timestamp':time.time()
        }
        encoded_jwt = jwt.encode(payload, secret, algorithm='HS256')
        #Convert from bytes to a string
        return encoded_jwt.decode('utf-8')

    def decodetoken(self,token):
        ''' decode token to retrive user_id '''
        global secret
        return jwt.decode(token, secret)


    def auth_login(email, password):
        ''' given an email and a password, return a valid token for user '''
        db = DBElephant()
        db.query('select * from users where email ilike "{}"'.format(email))
        u_id, email,password, permission_type = db.fetch_one()

        # for every user list of user dics
        return {'u_id':u_id, 'token': token}

    raise db.ValueError(description='invalid email or password')

def auth_logout(token):
    ''' logout an authrorised user '''
    try:
        validuser = get_user_token(token)
        #get the validuserid
        db.data['users'][validuser['u_id']]['tokens'].remove(token)
        return {'is_success':True}
    except AccessError:
        return {'is_success':False}
        


    def auth_passwordreset_request(self,email):
        ''' Sends a password reset to the email entered by the user if valid '''

        #check email is a valid email in slackr otherwise raise value error
        validuser = get_user_email(email)

        msg = Message('Password Reset Slackr',
            sender="teamdiscordcomp1531@gmail.com",
            recipients=[email])
        
        #authentification appended for user 
        token = generateToken(validuser['u_id'])
        msg.body = 'Hi ' + validuser['name_first']+ ',' +'\nYour secret code: ' + token

        db.data['reset_request'].append(token)

        return msg

def auth_passwordreset_reset(reset_code, new_password):
    ''' Resets the password if valid token else raises value error '''
    
    #check password is in right format
    check_password(new_password)
    
    #check if request exists
    if reset_code in db.data['reset_request']:
        #decode token and set new password
        decode_reset = decodetoken(reset_code)
        set_user_password(decode_reset['payload'], new_password)
    else:
        raise db.ValueError(description='Invalid Token try again')
    return {}