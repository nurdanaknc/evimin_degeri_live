import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import xgboost as xgb
from sklearn.ensemble import RandomForestRegressor

# python3 kutuphane indirme : python3 -m pip install SomePackage  # default Python 3

df = pd.read_csv('model/df.csv')
df.drop(['Unnamed: 0'], axis=1, inplace = True)


from sklearn.model_selection import train_test_split

#veri setini düzenleme
#labels = df['fiyat']
df = df.drop(["il","ilce","mahalle","oda_sayisi",'konum'], axis = 1)
#print(df)

#Scale yapınca sonuçlar doğru gelmedi!!!
#from sklearn.preprocessing import StandardScaler
#scaler = StandardScaler()
#train1 = pd.DataFrame(scaler.fit_transform(train1), columns=train1.columns)

# test train veri seti oluşturma
X = df.drop(["fiyat"],axis=1)
y = df["fiyat"].values


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2 , random_state=42)

#print(X_train)
#print(y_train)

# xgboost regresyon modeli
import xgboost as xgb
from sklearn.metrics import mean_squared_error, r2_score

# XGBoost Regressor modelini tanımlama
xg_reg = xgb.XGBRegressor(objective ='reg:squarederror', colsample_bytree = 0.3, learning_rate = 0.1,
                max_depth = 5, alpha = 10, n_estimators = 10)

# Modeli eğitme
xg_reg.fit(X_train.values,y_train)


from sklearn.metrics import mean_squared_error, r2_score
# Eğitim veri setinde doğruluk kontrolü
pred_train = xg_reg.predict(X_train)
rmse_train = np.sqrt(mean_squared_error(y_train, pred_train))
print("Eğitim Seti RMSE: %f" % (rmse_train))

# Test veri setinde doğruluk kontrolü
pred_test = xg_reg.predict(X_test)
rmse_test = np.sqrt(mean_squared_error(y_test, pred_test))
print("Test Seti RMSE: %f" % (rmse_test))

#Tahmin etme

#new_data = [[0.,1.,0.,100.,110.,33.,3.,3.,4.,2.,2.,0.,1.,40.8741659,28.6372583]]
""" samp = pd.DataFrame([[0.,1.,0.,70.,85.,1.,12.,9.,4.,2.,0.,0.,2.,41.0037541,29.1293]],
                    columns=["cluster_A", "cluster_B", "cluster_C", "net_alan", "brut_alan", "bina_yasi", "kat_sayisi", "bulundugu_kat", "toplam_oda_sayisi", "isitma", "esya", "kullanim_durumu", "kredi_durumu", "lat", "lng"])
prediction = xg_reg.predict(samp)
print("Tahmin edilen fiyat: ", prediction) """


# gerçek fiyat = 2750000 2551302
#tahmin edilen fiyat:  2559093


#lineer regresyon 
from sklearn.linear_model import LinearRegression

reg = LinearRegression()
reg.fit(X_train.values,y_train)

y_train_pred = reg.predict(X_train)
mse_train = mean_squared_error(y_train, y_train_pred)
r2_train = r2_score(y_train, y_train_pred)
print("Eğitim Seti MSE: ", mse_train)
print("Eğitim Seti R-kare: ", r2_train)

y_test_pred = reg.predict(X_test)
mse_test = mean_squared_error(y_test, y_test_pred)
r2_test = r2_score(y_test, y_test_pred)
print("Test Seti MSE: ", mse_test)
print("Test Seti R-kare: ", r2_test)

"""
# new_data = [[0.,1.,0.,100.,110.,33.,3.,3.,4.,2.,2.,0.,1.,40.8741659,28.6372583]]
samp = pd.DataFrame([[0,1,0,100,110,33,3,3,4,2,2,0,1,40.8741659,29.1293251]],
                    columns=["cluster_A", "cluster_B", "cluster_C", "net_alan", "brut_alan", "bina_yasi", "kat_sayisi", "bulundugu_kat", "toplam_oda_sayisi", "isitma", "esya", "kullanim_durumu", "kredi_durumu", "lat", "lng"])
prediction = reg.predict(samp)
print("Tahmin edilen fiyat: ", prediction) """

#random forest algoritması
from sklearn.ensemble import RandomForestRegressor

rfr_reg =  RandomForestRegressor()
rfr_reg.fit(X_train.values,y_train)

y_train_pred = rfr_reg.predict(X_train)
mse_train = mean_squared_error(y_train, y_train_pred)
r2_train = r2_score(y_train, y_train_pred)
print("Eğitim Seti MSE: ", mse_train)
print("Eğitim Seti R-kare: ", r2_train)

y_test_pred = rfr_reg.predict(X_test)
mse_test = mean_squared_error(y_test, y_test_pred)
r2_test = r2_score(y_test, y_test_pred)
print("Test Seti MSE: ", mse_test)
print("Test Seti R-kare: ", r2_test)

pred_train = rfr_reg.predict(X_train)
rmse_train = np.sqrt(mean_squared_error(y_train, pred_train))
print("Eğitim Seti RMSE: %f" % (rmse_train))
"""
prediction = rfr_reg.predict(samp)
print("Tahmin edilen fiyat: ", prediction)  """


#modeli pickle ile kaydetme
import pickle

with open('model.pkl', 'wb') as f:
    pickle.dump(xg_reg, f)

loaded_model = pickle.load(open('model.pkl', 'rb'))


# pickle.dump(xg_reg, open('ilan.pkl', 'wb'))


