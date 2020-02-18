import psycopg2 as pg
from credentials import secret,db_app,db_password,user_app
import datetime as dt
import hashlib
import time
import jwt
class DBElephant():
    def __init__(self,db = db_app,user = user_app,password= db_password):
        self.conn = pg.connect(database=db, user=user,password=password)
        self.cur = self.conn.cursor()
    def query(self, query):
        try:
            self.cur.execute(query)
        except pg.Error as e:
            print('An error occurrend in db, e:',e)

    def fetch_one(self):
        return self.cur.fetchone()
    
    def fetchall(self):
        return self.cur.fetchall()
    
    """Given an open connection returns the number of users in db"""
    def get_user_count(self):
        self.query("select count(*) from users;")
        return self.fetch_one()[0]

    """ Given an open connection returns true if user in db"""
    def user_in_db(self,email):
        self.query("""select u_id from users where email like '{}';""".format(email))
        u_id = self.fetch_one()
        print('uid:',u_id)
        if(u_id):
            return True
        else:
            return False
    """Given some input inserts new user into db, returns u_id and token """
    def register_user(self,name_first,name_last,email,password):
        #get day today
        day_registered  = dt.datetime.now()
        str_day = day_registered.strftime("%Y-%m-%d")
        """ hashing a given string for storing in db"""
        def hash_password(password):
            return hashlib.sha256(password.encode()).hexdigest()
        """create a token to return"""
        def generateToken(email):
            global secret
            payload = {
                'payload':email,
                'timestamp':time.time()
            }
            encoded_jwt = jwt.encode(payload, secret, algorithm='HS256')
            #Convert from bytes to a string
            return encoded_jwt.decode('utf-8')

        #get new token for user
        jwt_token = generateToken(email)
        #get hash password
        password = hash_password(password)
        
        #get permission
        permission_type = 1 #will change for further implementation in the future
        #get user id
        u_id = self.get_user_count() + 1
        self.query("""insert into Users values ({},'{}','{}','{}','{}',ARRAY['{}'],{},'{}')"""
            .format(u_id,name_first,name_last,email,password,jwt_token,permission_type,str_day))
        print(u_id,name_first,name_last,email,password,jwt_token,permission_type,str_day)
        return (u_id,jwt_token)
    def close(self):
            self.cur.close()
            self.conn.close()
    def close_commit(self):
            self.cur.close()
            self.conn.commit()
            self.conn.close()