from flask import Flask, request, jsonify
from PIL import Image
import pytesseract
import io
import base64
import requests

app = Flask(__name__)

TRANSLATE_API_KEY = 'YOUR_TRANSLATE_API_KEY'
TRANSLATE_URL = 'https://translation.googleapis.com/language/translate/v2'

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    image_data = data['image']
    language = data['language']
    
    image_data = image_data.split(",")[1]  # Remove header
    image = Image.open(io.BytesIO(base64.b64decode(image_data)))
    text = pytesseract.image_to_string(image)

    translated_text = translate_text(text, language)
    return jsonify({'translatedText': translated_text})

def translate_text(text, target_language):
    params = {
        'q': text,
        'target': target_language,
        'key': TRANSLATE_API_KEY
    }
    response = requests.post(TRANSLATE_URL, data=params)
    result = response.json()
    return result['data']['translations'][0]['translatedText']

if __name__ == '__main__':
    app.run(debug=True)
