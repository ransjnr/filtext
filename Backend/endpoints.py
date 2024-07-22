import os
import mimetypes
import pandas as pd
from fastapi import APIRouter, File, UploadFile, HTTPException
from model import spacy_ner_extraction, get_email_addresses
from file_handler import read_pdf, read_docx
from cleaner import clean_data

router = APIRouter()

UPLOAD_DIRECTORY = "uploads"
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
        with open(file_path, "wb") as buffer:
            buffer.write(file.file.read())
        return {"message": "File uploaded successfully🎊"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/extract/")
async def extract_info():
    file_path = os.path.join(UPLOAD_DIRECTORY, os.listdir(UPLOAD_DIRECTORY)[0])
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=400, detail="No file uploaded")

    try:
        mime_type, _ = mimetypes.guess_type(file_path)

        if mime_type == 'application/pdf':
            with open(file_path, "rb") as file:
                text = read_pdf(file.read())
        elif mime_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            with open(file_path, "rb") as file:
                text = read_docx(file.read())
        elif mime_type == 'text/plain':
            with open(file_path, "r", encoding='utf-8', errors='replace') as file:
                text = file.read()
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        spacy_ner_extraction(text)
        get_email_addresses(text)

        df_output = pd.concat([
            df_sc_name, df_get_email, df_sc_org, df_sc_date, df_sc_city, df_sc_state, df_sc_country, df_sc_percentage,
            df_sc_time, df_sc_quantity, df_sc_cardinal, df_sc_event, df_sc_language, df_sc_artwork, df_sc_money, df_sc_loc
        ], axis=1)

        clean_data_dict = clean_data(df_output.to_dict(orient='records'))

        return clean_data_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
