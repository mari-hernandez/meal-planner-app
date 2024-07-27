from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)


"""
flask db init
flask db migrate -m "Initial migration."
flask db upgrade
"""