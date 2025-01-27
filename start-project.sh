#!/bin/zsh

# Create the virtual environment
echo "Creating virtual environment..."
python3 -m venv .venv

# Activate the virtual environment
echo "Activating virtual environment..."
source .venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
cd snAPI
pip install Django
python3 -m pip install -U pip
pip install -r requirements.txt

# Apply database migrations
echo "Applying migrations..."
python manage.py migrate

# Run the Django server on port 9178
echo "Running Django server on port 9178..."
python manage.py runserver 9178

# Keep the script running until the server stops
echo "Press Ctrl+C to stop the server."
trap "deactivate; exit" INT
wait
