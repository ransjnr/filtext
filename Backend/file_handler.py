import os
import mimetypes
import fitz  # PyMuPDF
from docx import Document
from io import BytesIO


UPLOAD_DIRECTORY = "uploads"
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

def save_file(file):
    file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    return file_path

def read_pdf(file):
    pdf_text = ""
    pdf_document = fitz.open(stream=file, filetype="pdf")
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        pdf_text += page.get_text()
    return pdf_text

def read_docx(file):
    doc = Document(BytesIO(file))
    doc_text = ""
    for para in doc.paragraphs:
        doc_text += para.text + "\n"
    return doc_text

def read_text(file_path):
    with open(file_path, "r", encoding='utf-8', errors='replace') as file:
        return file.read()

def get_file_content(file_path):
    mime_type, _ = mimetypes.guess_type(file_path)
    if mime_type == 'application/pdf':
        with open(file_path, "rb") as file:
            return read_pdf(file.read())
    elif mime_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        with open(file_path, "rb") as file:
            return read_docx(file.read())
    elif mime_type == 'text/plain':
        return read_text(file_path)
    else:
        raise ValueError("Unsupported file type")
