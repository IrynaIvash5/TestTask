<template>
  <div class="block-header">
    <div  @click="upDate()" class="header">ToTheBeginning</div>
  </div>
  <div class="container">
    <div class="input-group">
      <input v-model="zipCode" type="search" class="form-control rounded" placeholder="Enter a US zip code..." aria-label="Search"
             aria-describedby="search-addon" :class="{'empty': this.incorrectEnterZipCode || this.error}" @keyup.enter="searchData"/>
      <button @click="searchData()" type="button" class="btn btn-outline-primary">Render</button>
    </div>
    <div v-if="this.error" >This zip code is not in our database.</div>
    <div v-if="this.incorrectEnterZipCode">Incorrect request. The request must contain five digits.</div>

    <div v-if="this.postalCodeData" class="information-zip-code">
      <h4 class="title">Data based on zip code</h4>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Zip Code: <span class="info-user">{{this.postalCodeData.zip_code}}</span></li>
          <li class="list-group-item">City: <span class="info-user">{{this.postalCodeData.city}}</span></li>
          <li class="list-group-item">State: <span class="info-user">{{this.postalCodeData.state}}</span></li>
          <li class="list-group-item">Area Codes: <span class="info-user">{{this.postalCodeData.area_codes.toString()}}</span></li>
        </ul>
      <div class="btn-show-ip">
        <button  @click="showIPAgentUser" type="button" class="btn btn-outline-primary">Show IP&User Agent</button>
      </div>
    </div>
    <div v-if="this.ipData" class="data-block">
      <h4 class="title">IP&User agent data</h4>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">IP: <span class="info-user">{{this.ipData.ip}}</span></li>
        <li class="list-group-item">Country: <span class="info-user">{{this.ipData.country_name}}</span></li>
        <li class="list-group-item">City: <span class="info-user">{{this.ipData.city}}</span></li>
        <li class="list-group-item">Colling Code: <span class="info-user">{{this.ipData.calling_code}}</span></li>
        <li class="list-group-item">Referer: <span class="info-user">{{ this.referer }}</span></li>
        <li class="list-group-item">User Agent Data: <span class="info-user">{{this.userAgentData.userAgentString}}</span></li>
        <li class="list-group-item">Version: <span class="info-user">{{this.userAgentData.version}}</span></li>
        <li class="list-group-item">Name: <span class="info-user">{{this.userAgentData.name}}</span></li>
        <li class="list-group-item">Type: <span class="info-user">{{this.userAgentData.type}}</span></li>
      </ul>
    </div>
  </div>
</template>
<script>

import 'bootstrap/dist/css/bootstrap.css'

export default {
  name: 'RenderZipCode',
  data() {
    return {
      postalCodeData: '',
      zipCode: '',
      userAgentData: '',
      ipData: '',
      referer: '',
      incorrectEnterZipCode: false,
      error: false,
     }
  },
  methods: {
    async searchData() {
      if(this.zipCode.length <= 4){
        this.incorrectEnterZipCode = true
        return
      }
      this.incorrectEnterZipCode = false
      this.error = false
      this.postalCodeData = null
      try {
        const dataZipCodeResponse = await this.$axios.get(
            `https://www.zipcodeapi.com/rest/js-o1MSFtnAbUUqi0MzaNfizPuzXKwY19cHNXDiKjzjUW8luYEgd7U5jgNZVVNNUrkz/info.json/${this.zipCode}/degrees`, {

            }).catch(console.error)
        this.postalCodeData = dataZipCodeResponse.data
      }catch (err){
          this.error = true
      }
      this.zipCode = ''
    },
    async showIPAgentUser(){
      //show ip
      const dataIPResponse = await  this.$axios.get(
          'https://api.ipgeolocation.io/ipgeo?apiKey=4bd944c5bece4431a770114851b5b56f',{

          }).catch(console.error)
      this.ipData = dataIPResponse.data
      //show user-agent
      const dataUserAgentResponse = await  this.$axios.get(
          'https://api.ipgeolocation.io/user-agent?apiKey=4bd944c5bece4431a770114851b5b56f',{

          }).catch(console.error)
      this.userAgentData = dataUserAgentResponse.data
      this.referer = window.location.href
    },
    upDate(){
      this.userAgentData = null
      this.postalCodeData = null
      this.ipData = null
    }
  }
}
</script>

<style lang="scss" scoped>
.block-header{
  max-width: 100%;
  background-color: #4545d2;
  .header{
    height: 3rem;
    max-width: 80%;
    font-size: 22px;
    font-weight: bold;
    font-family: sans-serif;
    padding-left: 10.5%;
    display: flex;
    align-items: center;
  }
}

.container {
  max-width: 80%;
  margin-top: 2rem;
  .empty{
    background-color: #ee6868;
    transition: 1s;
  }
  .data-block{
    margin-bottom: 4rem;
  }
  .title{
    margin-top: 2rem;
  }

  .information-zip-code{
    margin-top: 20px;
    .btn-show-ip{
      display: flex;
      justify-content: right;
    }
  }
  .info-user{
    color: #4545d2;
  }
}
</style>
