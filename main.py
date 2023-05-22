# Importing necessary libraries

import uvicorn

import pandas as pd

import pickle

from pydantic import BaseModel

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

# Initializing the fast API server

app = FastAPI()

origins = [""]

app.add_middleware(

CORSMiddleware,

allow_origins=origins,

allow_credentials=True,

allow_methods=["*"],

allow_headers=["*"],

)

# Loading up the trained model

model = pickle.load(open('model.pkl', 'rb'))

# Defining the model input types

class Selections(BaseModel):

    cluster_A: int

    cluster_B: int

    cluster_C: int

    net_alan: int

    brut_alan: int

    bina_yasi: int 

    kat_sayisi: int

    bulundugu_kat: int 

    toplam_oda_sayisi: int 

    isitma: int

    esya: int 

    kullanim_durumu: int 

    kredi_durumu: int

    lat: float

    lng: float


# Setting up the home route

@app.get("/")

def read_root():

    return {"data": "Makine Öğrenmesi İle Ev Fiyat Tahmini Projesi"}

# Setting up the prediction route

@app.post("/prediction/")

async def get_predict(data: Selections):

    sample = [[

        data.cluster_A,

        data.cluster_B,

        data.cluster_C,

        data.net_alan,

        data.brut_alan,

        data.bina_yasi,

        data.kat_sayisi,

        data.bulundugu_kat,

        data.toplam_oda_sayisi,

        data.isitma,

        data.esya,

        data.kullanim_durumu,

        data.kredi_durumu,

        data.lat,

        data.lng,

   ]]

    price = model.predict(pd.DataFrame(sample)).tolist()[0]

    return {

    "data": {

        'Tahmin_Edilen_Fiyat': price,

    }

}

# Configuring the server host and port

if __name__ == '__main__':

    uvicorn.run(app, port=10000, host='0.0.0.0')
