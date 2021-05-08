<template>
  <b-container id="error">
    <b-row class="justify-content-center align-items-center">
      <b-col cols-xs="2" cols-sm="2" cols-md="2" cols-lg="4" cols-xl="4">
        <b-card
          v-if="(status = 404)"
          header="Aucun contenu à cette adresse"
          class="text-center p-4"
        >
          <p class="card-text">
            <nuxt-link :to="{ name: 'home' }">
              <i class="icon icon-arrow-right"></i> Retourner à la page
              d'accueil
            </nuxt-link>
          </p>
        </b-card>
        <b-card v-else :header="'Erreur ' + status" class="text-center">
          <p class="card-text">
            <nuxt-link class="text-primary" :to="{ name: 'index' }">
              <i class="icon icon-arrow-right"></i> Retourner à la page
              d'accueil
            </nuxt-link>
          </p>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/**
 * Show Errors (404, 500, etc.)
 */
export default {
  props: ['error'],
  data() {
    return {
      /**
       * number of error
       */
      status: null,
    }
  },
  watch: {
    $route() {
      this.status = this.$route.params.status
    },
  },
}
</script>
<style>

#error {
  min-height: 100%;
  min-height: 100vh;
  width: 350px;
  margin-top: 50px;
  > .row {
    min-height: 100vh;
  }
}

</style>
