<template>
  <div>

  <form>
    <hgroup>
      <!--<h3>Mapa Interativo de <br> Salinópolis</h3>-->
      <img src="statics/logo/big.png">
    </hgroup>
    <div class="group">
      <input type="email" v-model="auth.email" :class="used(auth.email) ? 'used' : ''"><span class="highlight"></span><span class="bar"></span>
      <label>Email</label>
    </div>
    <div class="group">
      <input type="password" v-model="auth.password" :class="used(auth.password) ? 'used' : ''"><span class="highlight"></span><span class="bar"></span>
      <label>Senha</label>
    </div>
    <button type="button" class="button buttonBlue" @click="attempt">Entrar</button>
  </form>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'auth-login',
    data: function () {
      return {
        auth: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      attempt () {
        this.$router.push({name: 'dashboard.home'})
      },
      used (input) {
        if (input.length !== 0) {
          return true
        }
        return false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  * { box-sizing:border-box; }

  body {
    font-family: Helvetica;
    background: #622c25 !important;
    -webkit-font-smoothing: antialiased;
  }

  hgroup {
    text-align:center;
    margin-top: 1em;
    margin-bottom: 2em;
  }

  h1, h3 { font-weight: 300; }

  h1 { color: #636363; }

  h3 { color: #A33029; }

  form {
    width: 480px;
    margin: 4em auto;
    padding: 2em 2em 2em 2em;
    background: #fafafa;
    border: 1px solid #ebebeb;
    box-shadow: rgba(0,0,0,0.14902) 0px 1px 1px 0px,rgba(0,0,0,0.09804) 0px 1px 2px 0px;
  }

  .group {
    position: relative;
    margin-bottom: 45px;
  }

  input {
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    -webkit-appearance: none;
    display: block;
    background: #fafafa;
    color: #636363;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #757575;
  }

  input:focus { outline: none; }


  /* Label */

  label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: all 0.2s ease;
  }


  /* active */

  input:focus ~ label, input.used ~ label {
    top: -20px;
    transform: scale(.75); left: -2px;
    /* font-size: 14px; */
    color: #A33029;
  }


  /* Underline */

  .bar {
    position: relative;
    display: block;
    width: 100%;
  }

  .bar:before, .bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #A33029;
    transition: all 0.2s ease;
  }

  .bar:before { left: 50%; }

  .bar:after { right: 50%; }


  /* active */

  input:focus ~ .bar:before, input:focus ~ .bar:after { width: 50%; }


  /* Highlight */

  .highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }


  /* active */

  input:focus ~ .highlight {
    animation: inputHighlighter 0.3s ease;
  }


  /* Animations */

  @keyframes inputHighlighter {
    from { background: #A33029; }
    to 	{ width: 0; background: transparent; }
  }


  /* Button */

  .button {
    position: relative;
    display: inline-block;
    padding: 12px 24px;
    margin: .3em 0 1em 0;
    width: 100%;
    vertical-align: middle;
    color: #fff;
    font-size: 16px;
    line-height: 20px;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    letter-spacing: 1px;
    background: transparent;
    border: 0;
    border-bottom: 2px solid #65221b;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .button:focus { outline: 0; }


  /* Button modifiers */

  .buttonBlue {
    background: #A33029;
    text-shadow: 1px 1px 0 rgba(39, 110, 204, .5);
  }

  .buttonBlue:hover { background: #65221b; }


</style>
