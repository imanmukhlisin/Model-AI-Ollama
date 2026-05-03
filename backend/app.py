import os
import json
import requests
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import easyocr
from PIL import Image
import numpy as np
from io import BytesIO

app = Flask(__name__)
CORS(app)

API_URL = "http://localhost:11434/api/chat"

reader = easyocr.Reader(['en', 'id'])  # Inisialisasi sekali saja

def extract_text_from_file(file_storage):
    filename = file_storage.filename.lower()
    if filename.endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif', '.webp')):
        # Gambar: OCR dengan EasyOCR
        try:
            img = Image.open(file_storage.stream)
            result = reader.readtext(np.array(img), detail=0)
            text = "\n".join(result)
            return f"[Isi gambar {file_storage.filename}]:\n{text.strip()}"
        except Exception as e:
            return f"[Gagal OCR gambar {file_storage.filename} dengan EasyOCR: {e}]"
    elif filename.endswith('.docx'):
        try:
            from docx import Document
            doc = Document(file_storage.stream)
            text = "\n".join([p.text for p in doc.paragraphs])
            return f"[Isi dokumen {file_storage.filename}]:\n{text.strip()}"
        except Exception as e:
            return f"[Gagal baca DOCX {file_storage.filename}: {e}]"
    elif filename.endswith('.csv'):
        try:
            import pandas as pd
            df = pd.read_csv(file_storage.stream, nrows=20)
            text = df.to_csv(index=False)
            return f"[Isi CSV {file_storage.filename}]:\n{text.strip()}"
        except Exception as e:
            return f"[Gagal baca CSV {file_storage.filename}: {e}]"
    else:
        return f"[File {file_storage.filename} tidak didukung untuk ekstraksi teks]"

@app.route("/api/chat", methods=["POST"])
def chat():
    prompt = ""
    extracted_texts = []

    # Terima file dan prompt dari FormData
    if request.content_type and request.content_type.startswith("multipart/form-data"):
        prompt = request.form.get("prompt", "").strip()
        files = request.files.getlist("files")
        for file_storage in files:
            extracted = extract_text_from_file(file_storage)
            extracted_texts.append(extracted)
    else:
        data = request.get_json(silent=True) or {}
        prompt = data.get("prompt", "").strip()

    if not prompt and not extracted_texts:
        return jsonify({"error": "Prompt tidak disediakan atau kosong."}), 400

    # Gabungkan prompt dengan hasil ekstraksi file
    full_prompt = prompt
    if extracted_texts:
        full_prompt += "\n\n" + "\n\n".join(extracted_texts)

    payload = {
        "model": "gemma-fast",
        "messages": [
            {"role": "user", "content": full_prompt}
        ]
    }

    try:
        print(f"[backend] Prompt ke model:\n{full_prompt[:500]}...")
        headers = {"Content-Type": "application/json"}
        response = requests.post(API_URL, json=payload, headers=headers, timeout=120, stream=True)
        response.raise_for_status()

        ai_content = ""
        for line in response.iter_lines():
            if line:
                line = line.decode('utf-8').strip()
                if line.startswith("data: "):
                    line = line[6:].strip()
                if line:
                    try:
                        chunk = json.loads(line)
                        if chunk.get("done", False):
                            break
                        if "message" in chunk and "content" in chunk["message"]:
                            ai_content += chunk["message"]["content"]
                    except json.JSONDecodeError:
                        continue

        ai_content = ai_content.strip()
        if not ai_content:
            return jsonify({"error": "Tidak ada respon dari model."}), 500

        return jsonify({"content": ai_content})

    except requests.exceptions.Timeout:
        return jsonify({"error": "Timeout: Model terlalu lama merespons."}), 500
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Gagal terhubung ke Ollama: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Error server: {str(e)}"}), 500

@app.route("/api/chat-stream", methods=["POST"])
def chat_stream():
    prompt = ""
    extracted_texts = []

    if request.content_type and request.content_type.startswith("multipart/form-data"):
        prompt = request.form.get("prompt", "").strip()
        files = request.files.getlist("files")
        for file_storage in files:
            extracted = extract_text_from_file(file_storage)
            extracted_texts.append(extracted)
    else:
        data = request.get_json(silent=True) or {}
        prompt = data.get("prompt", "").strip()

    if not prompt and not extracted_texts:
        return jsonify({"error": "Prompt tidak disediakan atau kosong."}), 400

    full_prompt = prompt
    if extracted_texts:
        full_prompt += "\n\n" + "\n\n".join(extracted_texts)

    payload = {
        "model": "gemma-fast",
        "messages": [
            {"role": "user", "content": full_prompt}
        ]
    }

    def generate():
        headers = {"Content-Type": "application/json"}
        response = requests.post(API_URL, json=payload, headers=headers, timeout=120, stream=True)
        for line in response.iter_lines():
            if line:
                line = line.decode('utf-8').strip()
                if line.startswith("data: "):
                    line = line[6:].strip()
                if line:
                    try:
                        chunk = json.loads(line)
                        if "message" in chunk and "content" in chunk["message"]:
                            yield chunk["message"]["content"]
                        if chunk.get("done", False):
                            break
                    except Exception:
                        continue

    return Response(generate(), mimetype='text/plain')

if __name__ == "__main__":
    app.run(debug=True, port=5000)
