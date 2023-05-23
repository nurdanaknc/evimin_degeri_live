import './Glass.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import s1 from './s1.svg';
import s2 from './s2.svg';
import s3 from './s3.svg';
import { useForm } from 'react-hook-form';



function Glass({ onLatChange, onLngChange }) {
  const [cluster_A, setCluster_A] = useState('')
  const [cluster_B, setCluster_B] = useState('')
  const [cluster_C, setCluster_C] = useState('')
  const [net_alan, setNet_alan] = useState('')
  const [brut_alan, setBrut_alan] = useState('')
  const [kredi_durumu, setKredi_durumu] = useState('')
  const [kat_sayisi, setKat_sayisi] = useState('')
  const [isitma, setIsitma] = useState('')
  const [bulundugu_kat, setBulundugu_kat] = useState('')
  const [bina_yasi, setBina_yasi] = useState('')
  const [esya, setEsya] = useState('')
  const [kullanim_durumu, setKullanim_durumu] = useState('')
  const [toplam_oda_sayisi, setToplam_oda_sayisi] = useState('')
  const [lat, setLat] = useState(40.9929379)
  const [lng, setLng] = useState(29.1135187)
  const [result, setResult] = useState('')
  const [step, setStep] = useState(1);
  const [ilceAdi, setİlce_adi] = useState(null);


  const reset = () => {
    setCluster_A('')
    setCluster_B('')
    setCluster_C('')
    setNet_alan('')
    setBrut_alan('')
    setKredi_durumu('')
    setKat_sayisi('')
    setIsitma('')
    setBulundugu_kat('')
    setBina_yasi('')
    setEsya('')
    setKullanim_durumu('')
    setToplam_oda_sayisi('')
    setLat('')
    setLng('')

  }


  useEffect(() => {
    if (lat !== null && lng !== null) {
      onLatChange(lat);
      onLngChange(lng);
    }
  }, [lat, lng, onLatChange, onLngChange]);

  //MULTI SELECT FUNCTION DEFINITONS
  function handleNextClick(event) {
    event.preventDefault();
    setStep(step + 1);
  }

  function handlePrevClick(event) {
    event.preventDefault();
    setStep(step - 1);
  }

  function handleStepThreeSubmit(event) {
    event.preventDefault()
    setStep(step + 1);
    const params = {
      cluster_A, cluster_B, cluster_C, net_alan, brut_alan, bina_yasi, kat_sayisi, bulundugu_kat, toplam_oda_sayisi, isitma, esya, kullanim_durumu,
      kredi_durumu, lat, lng
    }

    axios
      .post('https://api-zprd.onrender.com/prediction/', params)
      .then((res) => {
        const data = res.data.data
        const parameters = JSON.stringify(params)
        const msg = `Tahmin Edilen Fiyat: ${data.Tahmin_Edilen_Fiyat}\nParameters: ${parameters}`
        //alert(msg)
        const priceInTL = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(data.Tahmin_Edilen_Fiyat).replace(' TL', '₺');
        setResult(priceInTL)
        
       
      })
      .catch((error) => alert(`Error: ${error.message}`))
  }

  function resetPage(event){
    reset()
    window.location.reload();
  }





  return (
    <div>


      {step === 1 && (
        <div className="glass-1" >
          <form onSubmit={(event) => handleNextClick(event)} className="glass__form" >

            <Grid className="caption-1">
              <img src={s2} alt="Konum" />
              <h4>Hangi ilçede yaşıyorsun?</h4>Öncelikli olarak yaşadığın ilçeyi seçmen gerekiyor.
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-select-small-label" >İlçe Adı</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      type="string"
                      label="İlçe Adı"
                      variant='outlined'
                      value={ilceAdi}

                      onChange={(e) => {

                        const konumDegerleri = {
                          'Adalar': [40.8741659, 29.1293251],
                          'Arnavutköy': [41.0671774, 29.0432713],
                          'Ataşehir': [40.9929379, 29.1135187],
                          'Avcılar': [40.9799389, 28.7216689],
                          'Bağcılar': [41.034547, 28.8567558],
                          'Bahçelievler': [41.0181451, 28.4843571],
                          'Güngören': [41.0252791, 28.8726908],
                          'Beylikdüzü': [41.0037541, 28.6372583],
                          'Şişli': [41.0637891, 28.9831642],
                          'Sancaktepe': [40.9905196, 29.2288624],
                          'Ümraniye': [41.0256362, 29.0963049],
                          'Beşiktaş': [41.0428465, 29.0075283],
                          'Esenyurt': [41.0342862, 28.6801113],
                          'Sarıyer': [41.1685803, 29.0572623],
                          'Pendik': [40.8768715, 29.2349672],
                          'Fatih': [41.0091982, 28.9662187],
                          'Büyükçekmece': [41.021654, 28.579757],
                          'Eyüpsultan': [41.0478358, 28.9327383],
                          'Başakşehir': [41.1075794, 28.7950711],
                          'Beyoğlu': [41.0284233, 28.9736808],
                          'Kartal': [40.88858, 29.1856536],
                          'Sultangazi': [41.1043344, 28.8614367],
                          'Sultanbeyli': [40.9670242, 29.2671314],
                          'Kadıköy': [40.990992, 29.0254305],
                          'Çekmeköy': [41.0351579, 29.1739149],
                          'Maltepe': [40.9247539, 29.1310782],
                          'Tuzla': [40.8161732, 29.3034194],
                          'Kağıthane': [41.0812087, 28.9730151],
                          'Zeytinburnu': [40.9898653, 28.9037467],
                          'Üsküdar': [41.0265498, 29.0151321],
                          'Küçükçekmece': [40.9918737, 28.7711956],
                          'Bakırköy': [40.9782585, 28.8744461],
                          'Silivri': [41.0742476, 28.2481709],
                          'Bayrampaşa': [41.0345549, 28.9118417],
                          'Beykoz': [41.1176978, 29.09821095],
                          'Çatalca': [41.1436804, 28.4605154],
                          'Esenler': [41.0376175, 28.8824519],
                          'Gaziosmanpaşa': [41.0578322, 28.9122521],
                          'Şile': [41.1744067, 29.6125216]
                        };

                        const ilceAdlari = {
                          'Adalar': [0, 1, 0],
                          'Arnavutköy': [0, 0, 1],
                          'Ataşehir': [1, 0, 0],
                          'Avcılar': [0, 1, 0],
                          'Bağcılar': [0, 0, 1],
                          'Bahçelievler': [0, 1, 0],
                          'Güngören': [1, 0, 0],
                          'Beylikdüzü': [0, 1, 0],
                          'Şişli': [0, 1, 0],
                          'Sancaktepe': [1, 0, 0],
                          'Ümraniye': [0, 1, 0],
                          'Beşiktaş': [0, 1, 0],
                          'Esenyurt': [1, 0, 0],
                          'Sarıyer': [0, 1, 0],
                          'Pendik': [0, 0, 1],
                          'Fatih': [0, 1, 0],
                          'Büyükçekmece': [0, 0, 1],
                          'Eyüpsultan': [0, 0, 1],
                          'Başakşehir': [0, 1, 0],
                          'Beyoğlu': [1, 0, 0],
                          'Kartal': [0, 0, 1],
                          'Sultangazi': [0, 0, 1],
                          'Sultanbeyli': [1, 0, 0],
                          'Kadıköy': [0, 1, 0],
                          'Çekmeköy': [0, 1, 0],
                          'Maltepe': [0, 1, 0],
                          'Tuzla': [0, 1, 0],
                          'Kağıthane': [0, 1, 0],
                          'Zeytinburnu': [0, 1, 0],
                          'Üsküdar': [1, 0, 0],
                          'Küçükçekmece': [0, 0, 1],
                          'Bakırköy': [0, 0, 1],
                          'Silivri': [0, 0, 1],
                          'Bayrampaşa': [0, 0, 1],
                          'Beykoz': [1, 0, 0],
                          'Çatalca': [0, 1, 0],
                          'Esenler': [0, 1, 0],
                          'Gaziosmanpaşa': [1, 0, 0],
                          'Şile': [0, 1, 0]
                        };

                        const [newClusterA, newClusterB, newClusterC] = ilceAdlari[e.target.value] || [0, 0];
                        setCluster_A(newClusterA);
                        setCluster_B(newClusterB);
                        setCluster_C(newClusterC);
                        
                      
                        setİlce_adi(e.target.value);

                        const [newLat, newLng] = konumDegerleri[e.target.value] || [0, 0];
                        setLat(newLat);
                        setLng(newLng);



                      }}


                    >
                      <MenuItem value={'Adalar'}>Adalar</MenuItem>
                      <MenuItem value={'Arnavutköy'}>Arnavutköy</MenuItem>
                      <MenuItem value={'Ataşehir'}>Ataşehir</MenuItem>
                      <MenuItem value={'Avcılar'}>Avcılar</MenuItem>
                      <MenuItem value={'Bağcılar'}>Bağcılar</MenuItem>
                      <MenuItem value={'Bahçelievler'}>Bahçelievler</MenuItem>
                      <MenuItem value={'Güngören'}>Güngören</MenuItem>
                      <MenuItem value={'Beylikdüzü'}>Beylikdüzü</MenuItem>
                      <MenuItem value={'Şişli'}>Şişli</MenuItem>
                      <MenuItem value={'Sancaktepe'}>Sancaktepe</MenuItem>
                      <MenuItem value={'Ümraniye'}>Ümraniye</MenuItem>
                      <MenuItem value={'Beşiktaş'}>Beşiktaş</MenuItem>
                      <MenuItem value={'Esenyurt'}>Esenyurt</MenuItem>
                      <MenuItem value={'Sarıyer'}>Sarıyer</MenuItem>
                      <MenuItem value={'Pendik'}>Pendik</MenuItem>
                      <MenuItem value={'Fatih'}>Fatih</MenuItem>
                      <MenuItem value={'Büyükçekmece'}>Büyükçekmece</MenuItem>
                      <MenuItem value={'Eyüpsultan'}>Eyüpsultan</MenuItem>
                      <MenuItem value={'Başakşehir'}>Başakşehir</MenuItem>
                      <MenuItem value={'Beyoğlu'}>Beyoğlu</MenuItem>
                      <MenuItem value={'Kartal'}>Kartal</MenuItem>
                      <MenuItem value={'Sultangazi'}>Sultangazi</MenuItem>
                      <MenuItem value={'Sultanbeyli'}>Sultanbeyli</MenuItem>
                      <MenuItem value={'Kadıköy'}>Kadıköy</MenuItem>
                      <MenuItem value={'Çekmeköy'}>Çekmeköy</MenuItem>
                      <MenuItem value={'Maltepe'}>Maltepe</MenuItem>
                      <MenuItem value={'Tuzla'}>Tuzla</MenuItem>
                      <MenuItem value={'Kağıthane'}>Kağıthane</MenuItem>
                      <MenuItem value={'Zeytinburnu'}>Zeytinburnu</MenuItem>
                      <MenuItem value={'Üsküdar'}>Üsküdar</MenuItem>
                      <MenuItem value={'Küçükçekmece'}>Küçükçekmece</MenuItem>
                      <MenuItem value={'Bakırköy'}>Bakırköy</MenuItem>
                      <MenuItem value={'Silivri'}>Silivri</MenuItem>
                      <MenuItem value={'Bayrampaşa'}>Bayrampaşa</MenuItem>
                      <MenuItem value={'Beykoz'}>Beykoz</MenuItem>
                      <MenuItem value={'Çatalca'}>Çatalca</MenuItem>
                      <MenuItem value={'Esenler'}>Esenler</MenuItem>
                      <MenuItem value={'Gaziosmanpaşa'}>Gaziosmanpaşa</MenuItem>
                      <MenuItem value={'Şile'}>Şile</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>







              <Grid item xs={12}>
                <button type="submit">İleri</button>
              </Grid>
            </Grid>
          </form>
        </div>
      )}


      {step === 2 && (
        <div className="glass-2">
          <form onSubmit={(event) => handleNextClick(event)} className="glass__form">

            <Grid className="caption-2">
              <img src={s1} alt="Daire Özellikleri" />
              <h4>Daire  özelliklerini seç</h4>Sana daire özellikleri hakkında birkaç tane seçim yaptırmak istiyoruz.
            </Grid>
            <Grid container spacing={4}>

              <Grid item xs={12}>
                <Box component="form" sx={{ minWidth: 120 }} noValidate autoComplete="off"

                >
                  <FormControl fullWidth>

                    <TextField id="outlined-basic" label="Net Alan" variant="outlined"
                      value={net_alan}
                      onChange={(e) => setNet_alan(e.target.value)}
                      size="small"
                    />
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box component="form" sx={{ minWidth: 120 }} noValidate autoComplete="off"

                >
                  <FormControl fullWidth>

                    <TextField id="outlined-basic" label="Brüt Alan" variant="outlined"
                      value={brut_alan}
                      onChange={(e) => setBrut_alan(e.target.value)}
                      size="small"
                    />
                  </FormControl>
                </Box>
              </Grid>




              <Grid item xs={12}>
                <button type="submit">İleri</button>
                <button className="button-1" onClick={handlePrevClick}>Geri</button>
              </Grid>
            </Grid>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="glass-3">
          <form onSubmit={(event) => handleNextClick(event)} className="glass__form">

            <Grid className="caption-3">
              <img src={s1} alt="Daire Özellikleri" />
              <h4>Daire  özelliklerini seç</h4>Sana daire özellikleri hakkında birkaç tane seçim yaptırmak istiyoruz.
            </Grid>

            <Grid container spacing={4}>

              <Grid item xs={12}>
                <Box component="form" sx={{ minWidth: 120 }} noValidate autoComplete="off"

                >
                  <FormControl fullWidth>

                    <TextField id="outlined-basic" label="Bina Yaşı" variant="outlined"
                      value={bina_yasi}
                      onChange={(e) => setBina_yasi(e.target.value)}
                      size="small"
                    />
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box component="form" sx={{ minWidth: 120 }} noValidate autoComplete="off"

                >
                  <FormControl fullWidth>

                    <TextField id="outlined-basic" label="Kat Sayısı" variant="outlined"
                      value={kat_sayisi}
                      onChange={(e) => setKat_sayisi(e.target.value)}
                      size="small"
                    />
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box component="form" sx={{ minWidth: 120 }} noValidate autoComplete="off"

                >
                  <FormControl fullWidth>

                    <TextField id="outlined-basic" label="Bulunduğu Kat" variant="outlined"
                      value={bulundugu_kat}
                      onChange={(e) => setBulundugu_kat(e.target.value)}
                      size="small"
                    />
                  </FormControl>
                </Box>
              </Grid>




              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-select-small-label">Toplam Oda Sayısı</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={toplam_oda_sayisi}
                      label="Toplam Oda Sayısı"
                      onChange={(e) => setToplam_oda_sayisi(e.target.value)}

                    >
                      <MenuItem value={1}>1+0</MenuItem>
                      <MenuItem value={2}>1+1</MenuItem>
                      <MenuItem value={2}>2+0</MenuItem>
                      <MenuItem value={3}>2+1</MenuItem>
                      <MenuItem value={4}>2+2</MenuItem>
                      <MenuItem value={4}>3+1</MenuItem>
                      <MenuItem value={5}>3+2</MenuItem>
                      <MenuItem value={5}>4+1</MenuItem>
                      <MenuItem value={6}>4+2</MenuItem>
                      <MenuItem value={7}>4+3</MenuItem>
                      <MenuItem value={8}>4+4</MenuItem>
                      <MenuItem value={6}>5+1</MenuItem>
                      <MenuItem value={7}>5+2</MenuItem>
                      <MenuItem value={8}>5+3</MenuItem>
                      <MenuItem value={9}>5+4</MenuItem>
                      <MenuItem value={7}>6+1</MenuItem>
                      <MenuItem value={8}>6+2</MenuItem>
                      <MenuItem value={9}>6+3</MenuItem>
                      <MenuItem value={8}>7+1</MenuItem>
                      <MenuItem value={9}>7+2</MenuItem>
                      <MenuItem value={10}>7+3</MenuItem>
                      <MenuItem value={9}>8+1</MenuItem>
                      <MenuItem value={10}>8+2</MenuItem>
                      <MenuItem value={11}>8+3</MenuItem>
                      <MenuItem value={12}>8+4</MenuItem>
                      <MenuItem value={10}>9+1</MenuItem>
                      <MenuItem value={11}>9+2</MenuItem>
                      <MenuItem value={12}>9+3</MenuItem>
                      <MenuItem value={11}>10 ve üzeri</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>



              <Grid item xs={6}>
                <button type="submit">İleri</button>
              </Grid>
              <Grid item xs={6} >
                <button onClick={handlePrevClick} className='button-3'>Geri</button>
              </Grid>
            </Grid>
          </form>
        </div>
      )}

      {step === 4 && (
        <div className="glass-4">
          <form onSubmit={(event) => handleStepThreeSubmit(event)} className="glass__form">

            <Grid className="caption-4">
              <img src={s1} alt="Daire Özellikleri" />
              <h4>Daire  özelliklerini seç</h4>Sana daire özellikleri hakkında birkaç tane seçim yaptırmak istiyoruz.
            </Grid>

            <Grid container spacing={4}>

              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-select-small-label">Isıtma</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      type="number"
                      label="Isıtma"
                      value={isitma}
                      onChange={(e) => setIsitma(e.target.value)}

                    >
                      <MenuItem value={1}>Soba</MenuItem>
                      <MenuItem value={2}>Kalorifer</MenuItem>
                      <MenuItem value={3}>Yerden Isıtma</MenuItem>

                    </Select>
                  </FormControl>
                </Box>

              </Grid>



              <Grid item xs={12}>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-select-small-label">Eşya Durumu</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      type="number"
                      label="Eşya Durumu"
                      value={esya}
                      onChange={(e) => setEsya(e.target.value)}

                    >
                      <MenuItem value={1}>Eşyalı</MenuItem>
                      <MenuItem value={0}>Eşyasız</MenuItem>
                      <MenuItem value={2}>Sadece Beyaz Eşya</MenuItem>
                      <MenuItem value={3}>Sadece Mutfak</MenuItem>

                    </Select>
                  </FormControl>
                </Box>
              </Grid>


              <Grid item xs={12}>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-select-small-label">Kullanım Durumu</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      type="number"
                      label="Kullanım Durumu"
                      value={kullanim_durumu}
                      onChange={(e) => setKullanim_durumu(e.target.value)}

                    >
                      <MenuItem value={0}>Boş</MenuItem>
                      <MenuItem value={1}>Mülk Sahibi</MenuItem>
                      <MenuItem value={2}>Kiracılı</MenuItem>

                    </Select>
                  </FormControl>
                </Box>



              </Grid>

              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-select-small-label">Kredi Durumu</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      type="number"
                      label="Kredi Durumu"
                      value={kredi_durumu}
                      onChange={(e) => setKredi_durumu(e.target.value)}

                    >
                      <MenuItem value={1}>Krediye Uygun</MenuItem>
                      <MenuItem value={0}>Krediye Uygun Değil</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>


              <Grid items xs={6}>
                <button onClick={handleStepThreeSubmit} className='button-2'> Sonucu Öğren </button>
              </Grid>

              <Grid item xs={6}>
                <button onClick={handlePrevClick} className='button-3'>Geri</button>
              </Grid>


            </Grid>
          </form>
          <div>
           
          </div>

        </div>
      )}


      {step === 5 && (
        <div className='sonuc'>
          <Container fixed>

            <Grid container columnSpacing={8} >
              <Grid item xs={6} >
                <Grid container rowSpacing={2}>
                  <Grid item xs={12} >
                    <div className='glass-5-1'>
                      <Grid className="sonuc-b">
                      
                        <h3>Belirlenen Fiyat</h3> Yaptığın seçimlere göre belirlediğimiz fiyatı aşağıda görebilirsin.
                        <div className='glass-5-1-1'>
                          <Grid container columnSpacing={10} >
                              <Grid item xs={2} >
                                  <img src={s3} alt="Fiyat" />
                               </Grid> 
                               <Grid item xs={10} >
                                  <h4>Tahmin Edilen Fiyat</h4>{result}
                               </Grid> 
                          </Grid>
                        </div>
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item xs={12} >
                    <div className='glass-5-3'>
                      <Grid container columnSpacing={3}>
                        <Grid item xs={8} marginTop={"10px;"}>
                        Yeni bir seçim yapmak istiyor musun?
                        </Grid>
                        <Grid item xs ={4}>
                          <button onClick={resetPage} className='button-4'> Seçim Yap </button>
                        </Grid>

                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} >
                <div className='glass-5-2'>
                <Grid item xs={12}> <h4>Yaptığın Seçimler</h4></Grid>
                <Grid container rowSpacing={1.5} marginBottom={"18px;"}> 
                 <Grid item  xs={6}>İlçe Adı:</Grid>  <Grid item  xs={6}> {ilceAdi}  </Grid>
                 <Grid item  xs={6}>Net Alan:</Grid> <Grid item  xs={6}>{net_alan} m2 </Grid>
                 <Grid item  xs={6}>Brüt Alan: </Grid> <Grid item  xs={6}>{brut_alan} m2  </Grid>
                 <Grid item  xs={6}>Bina Yaşı:  </Grid> <Grid item  xs={6}> {bina_yasi} </Grid>
                 <Grid item  xs={6}>Kat Sayısı: </Grid> <Grid item  xs={6}> {kat_sayisi}  </Grid>  
                 <Grid item  xs={6}>Bulunduğu Kat:   </Grid>  <Grid item  xs={6}> {bulundugu_kat} </Grid>   
                 <Grid item  xs={6}>Toplam Oda Sayısı: </Grid>   <Grid item  xs={6}>{toplam_oda_sayisi} </Grid>  
                 <Grid item  xs={6}>Isıtma Türü: </Grid>
                 <Grid item  xs={6}>
                 {
                        isitma === 1 ? "Soba" :
                        isitma === 2 ? "Kalorifer" :
                        isitma === 3 ? "Yerden Isırma" :
                        ""
                      }    </Grid> 
                  <Grid item  xs={6}>Eşya Durumu: </Grid>  
                  <Grid item  xs={6}>
                   {
                        esya === 1 ? "Eşyalı" :
                        esya === 0 ? "Eşyasız" :
                        esya === 2 ? "Sadece Beyaz Eşya" :
                        esya === 3 ? "Sadece Mutfak" :
                        ""
                      } </Grid>  
                  <Grid item  xs={6}>Kullanım Durumu: </Grid>
                  <Grid item  xs={6}>
                  {
                        kullanim_durumu === 0 ? "Boş" :
                        kullanim_durumu === 1 ? "Mülk Sahibi" :
                        kullanim_durumu === 2 ? "Kiracılı" :
                        ""
                      } </Grid>
                 <Grid item  xs={6}> Kredi Durumu: </Grid>
                 <Grid item  xs={6}>
                  {
                        kredi_durumu === 0 ? "Krediye Uygun Değil" :
                        kredi_durumu === 1 ? "Krediye Uygun" :
                        ""
                      }  </Grid>
                </Grid> 
                </div>
              </Grid>
            </Grid>
          </Container>

        </div>










      )}




    </div>


  )
}

export default Glass