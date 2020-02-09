import flask as f
import psycopg2 as pg

app = f.Flask('__main__')

@app.route('/')
def myIndex():
    print('Hey there you made a call!')
    return f.render_template("index.html",token="Hello Flask + React!")

@app.route('/login')
def get_Hello():
    return "<h1> Hey there this is the loggin web page!</h1>"

if __name__ == "__main__":
    app.run(debug=True)    
