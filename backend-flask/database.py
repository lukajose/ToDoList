import psycopg2 as pg
from credentials import secret,db_app,db_password,user_app
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

    def close(self):
            self.cur.close()
            self.conn.close()
    def close_commit(self):
            self.cur.close()
            self.conn.commit()
            self.conn.close()