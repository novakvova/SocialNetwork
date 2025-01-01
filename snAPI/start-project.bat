@echo off

:: Create the virtual environment
echo Creating virtual environment...
py -m venv .venv

:: Activate the virtual environment
echo Activating virtual environment...
call .venv\Scripts\activate.bat

:: Install dependencies
echo Installing dependencies...
pip install Django
py -m pip install -U pip
pip install -r requirements.txt

:: Apply database migrations
echo Applying migrations...
python manage.py migrate

:: Run the Django server in a new window
echo Running Django server on port 9178...
py manage.py runserver 9178

:: Deactivate virtual environment after server stops
echo Press Ctrl+C to stop the server.
pause
deactivate
