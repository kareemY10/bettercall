from flask import Flask, request, redirect, url_for, render_template,send_file
from database import *
app = Flask(__name__)


@app.route('/',methods=['POST','GET'])
def Intro():
    if request.method=='GET':
        return render_template('Intro.html')
    if request.method=='POST':
        email=request.form['email']
        password=request.form['password']
        user=check_username(email)
        if user.verify_password(password):
            return redirect("http://localhost:3000/", code=302)

            return render_template('Home.html',UserName=user.Name)


@app.route('/Room',methods=['POST','GET'])
def Room():
    print('hello')
    if request.method=='GET':
        return render_template('VedioR.html')
    if request.method=='POST':
        
        return render_template('VedioR.html')



@app.route('/signUP',methods=['GET','POST'])
def sign():
    if request.method=='GET':
        return render_template('signup.html')
    if request.method=='POST':
        firstname=request.form['firstname']
        lastname=request.form['lastname']
        email=request.form['email']
        password=request.form['password']

        if check_username(email)==None:
            add_user(email,password,firstname+" "+lastname)
        else:
            return "user is already created"
            #return Intro()

        return render_template("Intro.html")
   
@app.route('/Home')
def hello():
    return render_template('Home.html')
   

if __name__ == '__main__':
    app.run(debug=True)