from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(400), unique=True, nullable=False)
    name = db.Column(db.String(400), unique=False, nullable=False)
    last_name = db.Column(db.String(400), unique=False, nullable=False)
    city = db.Column(db.String(400), unique=False, nullable=False)
    hashed_password = db.Column(db.String(400), unique=True, nullable=False)
    salt = db.Column(db.String(400), unique=True, nullable=False)
    phone = db.Column(db.String(400), unique=False)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "hashed_password": self.hashed_password,
            "salt": self.salt
            # do not serialize the password, its a security breach
        }