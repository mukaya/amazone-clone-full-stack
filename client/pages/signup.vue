<template>
  <div class="registerPage">
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <div class="text-center">
            <a href="#">
              <img src="/img/logo-black.png" class="img-fluid" alt="" />
            </a>
          </div>
          <form class="mt-4">
            <div class="a-box a-spacing-extra-large">
              <div class="a-box-inner">
                <h1 class="a-spacing-small">Create account</h1>
                <!-- Your name -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label"
                    >Your name</label
                  >
                  <input
                    type="text"
                    name="ap_customer_name"
                    id="focusap_customer_name"
                    class="a-input-text form-control auth-auto auto-required-field auth-contact-verification-request-info"
                    v-model="name"
                  />
                </div>
                  <!-- Your email -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_email" class="a-form-label"
                    >Email</label
                  >
                  <input
                    type="email"
                    name="ap_customer_email"
                    id="focusap_customer_email"
                    class="a-input-text form-control auth-auto auto-required-field auth-contact-verification-request-info"
                    v-model="email"
                  />
                </div>
                  <!-- Password -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_password" class="a-form-label"
                    >Password</label
                  >
                  <input
                    type="password"
                    name="ap_customer_password"
                    id="focusap_customer_password"
                    class="a-input-text form-control auth-auto auto-required-field auth-contact-verification-request-info"
                    v-model="password"
                  />
                  <div class="a-alert-container">
                      <div class="a-alert-content">Password must be at last 6 characteres</div>
                  </div>
                </div>
                <!-- Button -->
                <div class="a-row a-spacing-extra-large mb-4">
                    <span class="a-button-primary">
                        <span class="a-button-inner">
                            <span class="a-button-text" @click="onSignup"> Create your amazon account</span>
                        </span>
                    </span>

                    <div class="a-row a-spacing-top-midium a-size-small">
                        <b>
                            By Createing an account, you agree to Amazon's
                            <a href="#">Condition of use</a> and
                            <a href="#">Private Notice</a>
a                        </b>
                    </div>
                </div>
                <hr/>

                <div class="a-row">
                    <b>
                        Already have an account ?
                        <nuxt-link to="/login" class="a-link-emphasis">Sign in</nuxt-link>
                    </b>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "none",

  data(){
    return {
      name:"",
      email:"",
      password:""
    }
  },
  methods:{
    async onSignup(){
      try {
        let data = {name:this.name,email:this.email,password:this.password}
        let response = await this.$axios.$post( `http://localhost:8000/api/auth/signup`, data)
        console.log(response)
        if(response.success){
          this.$auth.loginWith("local",{
            data:{
              email: this.email,
              password: this.password
            }
          })
          this.$route.push("/")
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>
