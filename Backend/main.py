from fastapi import FastAPI, File, UploadFile, HTTPException
import pandas as pd
import spacy
import re
import os
from geonamescache import GeonamesCache
from cleaner import clean_data
from file_handler import save_file, get_file_content, UPLOAD_DIRECTORY

app = FastAPI()

nlp = spacy.load("en_core_web_sm")

# Helper functions
def gen_dict_extract(var, key):
    if isinstance(var, dict):
        for k, v in var.items():
            if k == key:
                yield v
            if isinstance(v, (dict, list)):
                yield from gen_dict_extract(v, key)
    elif isinstance(var, list):
        for d in var:
            yield from gen_dict_extract(d, key)

def spacy_ner_extraction(text):
    global df_sc_name, df_sc_org, df_sc_date, df_sc_city, df_sc_state, df_sc_country, df_sc_time, df_sc_quantity, df_sc_ordinal, df_sc_cardinal, df_sc_percentage, df_sc_event, df_sc_language, df_sc_artwork, df_sc_money, df_sc_loc

    gc = GeonamesCache()
    countries = gc.get_countries()
    cities = gc.get_cities()
    cities = [*gen_dict_extract(cities, 'name')]
    countries = [*gen_dict_extract(countries, 'name')]

    sc_name = []
    sc_org = []
    sc_date = []
    sc_time = []
    sc_city = []
    sc_state = []
    sc_country = []
    sc_loc = []
    sc_artwork = []
    sc_language = []
    sc_money = []
    sc_quantity = []
    sc_ordinal = []
    sc_cardinal = []
    sc_percentage = []
    sc_event = []

    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == 'PERSON':
            sc_name.append(ent.text)
        elif ent.label_ == 'ORG':
            sc_org.append(ent.text)
        elif ent.label_ == 'DATE':
            sc_date.append(ent.text)
        elif ent.label_ == 'LOC':
            sc_loc.append(ent.text)
        elif ent.label_ == 'WORK_OF_ART':
            sc_artwork.append(ent.text)
        elif ent.label_ == 'LANGUAGE':
            sc_language.append(ent.text)
        elif ent.label_ == 'PERCENT':
            sc_percentage.append(ent.text)
        elif ent.label_ == 'TIME':
            sc_time.append(ent.text)
        elif ent.label_ == 'MONEY':
            sc_money.append(ent.text)
        elif ent.label_ == 'QUANTITY':
            sc_quantity.append(ent.text)
        elif ent.label_ == 'ORDINAL':
            sc_ordinal.append(ent.text)
        elif ent.label_ == 'CARDINAL':
            sc_cardinal.append(ent.text)
        elif ent.label_ == 'GPE':
            if ent.text in countries:
                sc_country.append(ent.text)
            elif ent.text in cities:
                sc_city.append(ent.text)
            else:
                sc_state.append(ent.text)

    df_sc_name = pd.DataFrame({"Name": sc_name})
    df_sc_org = pd.DataFrame({"Organization": sc_org})
    df_sc_date = pd.DataFrame({"Date": sc_date})
    df_sc_city = pd.DataFrame({"City": sc_city})
    df_sc_state = pd.DataFrame({"State": sc_state})
    df_sc_country = pd.DataFrame({"Country": sc_country})
    df_sc_time = pd.DataFrame({"Time": sc_time})
    df_sc_quantity = pd.DataFrame({"Quantity": sc_quantity})
    df_sc_ordinal = pd.DataFrame({"Ordinal": sc_ordinal})
    df_sc_cardinal = pd.DataFrame({"Cardinal": sc_cardinal})
    df_sc_percentage = pd.DataFrame({"Percentage": sc_percentage})
    df_sc_event = pd.DataFrame({"Event": sc_event})
    df_sc_language = pd.DataFrame({"Language": sc_language})
    df_sc_artwork = pd.DataFrame({"Art Work": sc_artwork})
    df_sc_money = pd.DataFrame({"Money": sc_money})
    df_sc_loc = pd.DataFrame({"Location": sc_loc})

def get_email_addresses(text):
    global df_get_email

    get_email = []
    email_set = []
    remove_email = []
    r = re.compile(r'[\w\.-]+@[\w\.-]+')

    string = text
    email_ori = r.findall(string)
    email = [email.lower().strip(".") for email in email_ori]

    df_get_email = pd.DataFrame({"Email": email})


# Endpoints
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_path = save_file(file)
        return {"message": "File uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/extract/")
async def extract_info():
    file_path = os.path.join(UPLOAD_DIRECTORY, os.listdir(UPLOAD_DIRECTORY)[0])
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=400, detail="No file uploaded")

    try:
        text = get_file_content(file_path)

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
