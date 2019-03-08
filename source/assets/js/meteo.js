//        const api = `https://api.darksky.net/forecast/fb8dd781a66caac5b412b2fbddc9ff1b/${lat},${long}`
window.addEventListener('load', () => {
  /**
   * @class Meteo
   * @constructor
   */
  class Meteo{
    /**
     * init the weather plugin
     * @constructor
     * @param {string} apiKey - apiKey
     * @param {string} source - link to the source
     */
    constructor(apiKey,source) {
      this.apiKey = apiKey
      this.source = source
      this.activeGeoloc()
    }
    activeGeoloc () {
      let long;
      let lat;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          // get longitude
          long = pos.coords.longitude;
          // get latitude
          lat = pos.coords.latitude;
          this.fetch(long,lat)
        })


      }
    }

    /**
     * @memberOf Meteo
     * @method
     * @param {numver} long - Position longitude
     * @param {numver} lat - Position latitude
     * @returns {Object} api - API from api.darksky.net
     * @see {@link https://api.darksky.net|darksky}
     */
    fetch (long,lat) {
      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const api = `${proxy}${this.source}/${this.apiKey}/36.7525,3.041970?units=si&lang=fr`
      fetch(api)
        .then(data => {
          return data.json();
        })
        .then(data => {
          const {temperature, summary, time, icon, humidity} = data.currently
          //const temp = Math.floor(this.convTempToC(temperature))
          this.addTemp(temperature)
          this.addLocation(data.timezone)
          this.addDesc(summary)
          this.setIcons(icon, '.icon')
        })
    }
    addLocation(loc){
      const location = document.querySelector('.weather-location')
      location.innerText= loc
    }
    addTemp(temp){
      const tmp = document.querySelector('.weather-temp')
      tmp.innerText= temp
    }
    /**
     *  add description on the card weather
     *  @method addDesc
     *  @param  {string} desc [description]
     */
    addDesc(desc){
      const description = document.querySelector('.weather-description')
      description.innerText= desc
    }
    /**
     *  convert farnheight to celsius
     *  @method convTempToF
     *  @param  {num}    tmp temperature
     *  @return {num}        convertthe temperature
     */
    convTempToC(tmp) {

      return (tmp - 32) * (5/9)
    }
    /**
     *  convert celsius to farnheight
     *  @method convTempToF
     *  @param  {num}    tmp temperature
     *  @return {num}        convertthe temperature
     */
    convTempToF(tmp) {
      return (tmp * (9/5)) + 32
    }

    /**
     *  set icon related to the weather
     *  @method setIcons
     *  @param  {string} icon     icon class
     *  @param  {string} dataIcon [class|id]
     */
    setIcons(icon, dataIcon) {
      const skycons = new Skycons({color:"gray"})
      const el = document.querySelector(dataIcon)
      let currTcon = icon.replace(/-/g, "_")
      currTcon = currTcon.toUpperCase()
      console.log('currTcon',currTcon)
      skycons.play()
      return skycons.set(el, Skycons[currTcon])

    }

  }
  new Meteo('fb8dd781a66caac5b412b2fbddc9ff1b', 'https://api.darksky.net/forecast')
})
